/* Applied Research Institute — shared site interactions (vanilla JS). */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header background on scroll ---------- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    mainNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
  } else {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      revealObs.observe(el);
    });
  }

  /* ---------- Metric count-up ---------- */
  function formatCount(el, value) {
    var prefix = el.dataset.prefix || "";
    var suffix = el.dataset.suffix || "";
    var decimals = parseInt(el.dataset.decimals, 10) || 0;
    el.textContent = prefix + value.toFixed(decimals) + suffix;
  }
  function animateCount(el) {
    var target = parseFloat(el.dataset.target);
    if (reduceMotion || !target) {
      formatCount(el, target || 0);
      return;
    }
    var duration = 1500;
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      formatCount(el, target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counts = document.querySelectorAll(".count");
  if (counts.length) {
    if (!("IntersectionObserver" in window)) {
      counts.forEach(function (el) {
        formatCount(el, parseFloat(el.dataset.target) || 0);
      });
    } else {
      var countObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              countObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counts.forEach(function (el) {
        countObs.observe(el);
      });
    }
  }

  /* ---------- Contact form (client-side confirmation) ---------- */
  var form = document.getElementById("contactForm");
  var confirmation = document.getElementById("formConfirmation");
  if (form && confirmation) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      // TODO: wire to a real endpoint (Formspree / Wix CRM webhook / serverless).
      form.querySelectorAll("input, select, textarea, button").forEach(function (el) {
        el.disabled = true;
      });
      confirmation.hidden = false;
      confirmation.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Logo rail (auto-scroll + arrow controls) ---------- */
  var track = document.getElementById("logoTrack");
  if (track) {
    var offset = 0;
    var speed = 0.5; // px per frame, leftward
    var paused = false;
    var half = 0;
    var measure = function () {
      half = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    if (!reduceMotion) {
      track.style.animation = "none"; // JS drives it so arrows can nudge
      var rail = track.closest(".logo-rail");
      if (rail) {
        rail.addEventListener("mouseenter", function () { paused = true; });
        rail.addEventListener("mouseleave", function () { paused = false; });
      }
      document.querySelectorAll("[data-rail]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          offset += btn.dataset.rail === "next" ? -260 : 260;
        });
      });
      var railLoop = function () {
        if (!paused) offset -= speed;
        if (half) {
          if (offset <= -half) offset += half;
          if (offset > 0) offset -= half;
        }
        track.style.transform = "translateX(" + offset + "px)";
        requestAnimationFrame(railLoop);
      };
      requestAnimationFrame(railLoop);
    }
  }

  /* ---------- Hero wave — 3-D perspective dot-lattice ----------
     A flat grid of dots (GX across x GZ into depth) projected in perspective and
     warped by a rolling wave height-field. Near rows are wide/bright, far rows
     converge toward a vanishing line — so it reads as a cohesive sheet of dots
     receding into the distance. The grid drifts left -> right and the wave rolls,
     so the whole lattice flows. Tunables are grouped up top for easy tweaking. */
  var canvas = document.getElementById("heroWave");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0;
    var TWO_PI = Math.PI * 2;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ---- tunables ----
    var DEPTH   = 2.4;    // perspective strength (higher = more convergence)
    var SPREAD  = 1.4;    // near-row width as a multiple of canvas width
    var GROUND  = 0.40;   // how far below the horizon the near row sits (frac of H) — thicker
    var HORIZON = 0.04;   // vanishing height from the top (frac of H) — moved up more
    var AMP     = 0.24;   // wave height amplitude (frac of H)
    var TILT    = 0.12;   // right-side up-sweep (frac of H)
    var DRIFT   = 0.02;   // left -> right grid drift (units/sec) — calm
    var ROLL    = 0.6;    // wave roll speed — calm

    var BACKW   = 0.82;  // far-edge width vs near (high = little convergence, no fan)
    var CONNECT = 0.13;  // node link distance as a fraction of width (x near-persp)

    function frac(n) { return n - Math.floor(n); }
    function edge(u) { return Math.min(1, u / 0.06) * Math.min(1, (1 - u) / 0.06); }

    // Two layers: a dim free-flowing dust haze for richness, and a sparser set of
    // brighter NODES linked by faint lines into a living network mesh. Both flow
    // left -> right and ride the same wave surface, with depth + glow.
    var NM = 0, mx, mz, mph, msz, mspd;         // mesh nodes
    var msx, msy, mcr, mpr, mdp, msize;          // per-frame node screen data
    var ND = 0, dx, dz, dph, dsz, dspd;          // dust

    function makeField(n, frontBias) {
      var a = {
        x: new Float32Array(n), z: new Float32Array(n),
        ph: new Float32Array(n), sz: new Float32Array(n), spd: new Float32Array(n)
      };
      var tmp = [];
      for (var i = 0; i < n; i++) {
        tmp.push({
          x: Math.random(),
          z: Math.pow(Math.random(), frontBias),
          ph: Math.random() * TWO_PI,
          sz: 0.7 + Math.random() * 1.3,
          spd: 0.65 + Math.random() * 0.8
        });
      }
      tmp.sort(function (p, q) { return q.z - p.z; });   // far -> near
      for (var j = 0; j < n; j++) {
        a.x[j] = tmp[j].x; a.z[j] = tmp[j].z; a.ph[j] = tmp[j].ph;
        a.sz[j] = tmp[j].sz; a.spd[j] = tmp[j].spd;
      }
      return a;
    }

    function seed() {
      NM = Math.round(Math.min(Math.max(w / 6.5, 130), 240));
      ND = Math.round(Math.min(Math.max(w * 2.2, 1100), 3200));
      var m = makeField(NM, 1.15);
      mx = m.x; mz = m.z; mph = m.ph; msz = m.sz; mspd = m.spd;
      msx = new Float32Array(NM); msy = new Float32Array(NM);
      mcr = new Float32Array(NM); mpr = new Float32Array(NM);
      mdp = new Float32Array(NM); msize = new Float32Array(NM);
      var d = makeField(ND, 1.3);
      dx = d.x; dz = d.z; dph = d.ph; dsz = d.sz; dspd = d.spd;
    }

    // Wave height at (xp, z) with time; ph adds a touch of per-dot life.
    function waveAt(xp, z, t, ph) {
      return (
        Math.sin(xp * TWO_PI * 1.1 + z * 2.2 - t * ROLL) * 0.55 +
        Math.sin(xp * TWO_PI * 0.5 - z * 1.4 + t * 0.55) * 0.55 +
        Math.sin(z * TWO_PI * 0.7 + t * 0.70) * 0.30 +
        Math.sin(xp * TWO_PI * 2.4 + ph + t * 1.0) * 0.14
      );
    }

    function render(t) {
      ctx.clearRect(0, 0, w, h);
      var cx = w * 0.5;
      var horizonY = h * HORIZON;
      var ground = h * GROUND;
      var amp = h * AMP;
      var tilt2 = h * TILT * 2;

      // ---- dust haze (behind) ----
      ctx.fillStyle = "rgb(46,150,62)";
      for (var i = 0; i < ND; i++) {
        var xp = dx[i];
        var ex = edge(xp);
        if (ex <= 0.01) continue;
        var z = dz[i];
        var persp = 1 / (1 + z * DEPTH);
        var wv = waveAt(xp, z, t, dph[i]);
        var xs = SPREAD * (BACKW + (1 - BACKW) * persp);
        var sx = cx + (xp - 0.5) * w * xs;
        var sy = horizonY + ground * persp - wv * amp * persp - (xp - 0.5) * tilt2 * persp;
        var cr = (wv + 1.4) / 2.8; if (cr < 0) cr = 0; else if (cr > 1) cr = 1;
        var al = (0.05 + persp * 0.22 + cr * 0.12) * ex;
        if (al <= 0.015) continue;
        var s = (0.4 + persp * 1.2) * dsz[i];
        ctx.globalAlpha = al;
        ctx.fillRect(sx - s * 0.5, sy - s * 0.5, s, s);
      }

      // ---- mesh node positions ----
      for (var k = 0; k < NM; k++) {
        var xpk = mx[k];
        var exk = edge(xpk);
        mpr[k] = exk;
        if (exk <= 0.01) continue;
        var zk = mz[k];
        var pk = 1 / (1 + zk * DEPTH);
        var wvk = waveAt(xpk, zk, t, mph[k]);
        var xsk = SPREAD * (BACKW + (1 - BACKW) * pk);
        msx[k] = cx + (xpk - 0.5) * w * xsk;
        msy[k] = horizonY + ground * pk - wvk * amp * pk - (xpk - 0.5) * tilt2 * pk;
        var crk = (wvk + 1.4) / 2.8; if (crk < 0) crk = 0; else if (crk > 1) crk = 1;
        mcr[k] = crk;
        mdp[k] = pk;
        msize[k] = (1.1 + pk * 2.3) * msz[k] * (0.85 + crk * 0.5);
      }

      // ---- links ----
      ctx.lineWidth = 1;
      var curS = -1;
      for (var a1 = 0; a1 < NM; a1++) {
        if (mpr[a1] <= 0.02) continue;
        var ax = msx[a1], ay = msy[a1], ap = mdp[a1];
        for (var b1 = a1 + 1; b1 < NM; b1++) {
          if (mpr[b1] <= 0.02) continue;
          var ddx = ax - msx[b1], ddy = ay - msy[b1];
          var d2 = ddx * ddx + ddy * ddy;
          var pp = (ap + mdp[b1]) * 0.5;
          var maxD = CONNECT * w * pp;
          if (d2 > maxD * maxD) continue;
          var dist = Math.sqrt(d2);
          var la = (1 - dist / maxD) * 0.30 * pp * Math.min(mpr[a1], mpr[b1]);
          if (la <= 0.012) continue;
          var wantL = (mcr[a1] + mcr[b1] > 1.5) ? 1 : 0;
          if (wantL !== curS) {
            ctx.strokeStyle = wantL ? "rgb(150,255,90)" : "rgb(70,200,95)";
            curS = wantL;
          }
          ctx.globalAlpha = la;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(msx[b1], msy[b1]);
          ctx.stroke();
        }
      }

      // ---- nodes + glow ----
      var curF = -1;
      for (var n2 = 0; n2 < NM; n2++) {
        if (mpr[n2] <= 0.02) continue;
        var p2 = mdp[n2], c2 = mcr[n2];
        var aB = (0.22 + p2 * 0.5 + c2 * 0.3) * mpr[n2];
        if (aB > 1) aB = 1;
        var s2 = msize[n2];
        var wantF = c2 > 0.7 ? 1 : 0;
        if (wantF !== curF) {
          ctx.fillStyle = wantF ? "rgb(150,255,90)" : "rgb(74,216,96)";
          curF = wantF;
        }
        ctx.globalAlpha = aB * 0.22;                 // soft glow halo
        ctx.beginPath();
        ctx.arc(msx[n2], msy[n2], s2 * 2.8, 0, TWO_PI);
        ctx.fill();
        ctx.globalAlpha = aB;                        // core
        ctx.beginPath();
        ctx.arc(msx[n2], msy[n2], s2, 0, TWO_PI);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    var raf = 0, last = 0;
    function loop(time) {
      var dt = last ? Math.min((time - last) / 1000, 0.05) : 0.016;
      last = time;
      for (var i = 0; i < NM; i++) { var a = mx[i] + dt * DRIFT * mspd[i]; mx[i] = a >= 1 ? a - 1 : a; }
      for (var j = 0; j < ND; j++) { var b = dx[j] + dt * DRIFT * dspd[j]; dx[j] = b >= 1 ? b - 1 : b; }
      render(time * 0.001);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      last = 0;
      if (reduceMotion) render(0);
      else raf = requestAnimationFrame(loop);
    }

    resize();
    seed();
    start();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { resize(); seed(); start(); }, 150);
    });
  }
})();
