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
    var LIFT    = 0;      // vertical flow offset (frac of H); 0 keeps it below the CTA

    var BACKW = 0.82;   // far-edge width vs near (high = little convergence, no fan)
    var LINKR = 14;     // link radius in px — shorter, cleaner connections
    var LINKA = 0.08;   // link line opacity — subtle
    var LINKMIN = 0.52; // only stronger dots connect (keeps it a sparse constellation)

    // Free-flowing particle field: thousands of independent dots scattered
    // through depth (z) that together trace the wavy sheet — cohesive, but with
    // no rows or strands, so nothing is anchored to a back line. Nearby dots are
    // linked with thin green lines (via a spatial grid) into a loose constellation.
    var N = 0, px, pz, pph, psz, pspd;
    var vsx, vsy, val, vsz, vflag, vlink, vnext, gridHead = null, gridLen = 0;
    function seed() {
      N = Math.round(Math.min(Math.max(w * 4.6, 2600), 6800));
      px = new Float32Array(N);    // 0..1 across
      pz = new Float32Array(N);    // 0..1 depth (0 near .. 1 far)
      pph = new Float32Array(N);   // twinkle / jitter phase
      psz = new Float32Array(N);   // size multiplier
      pspd = new Float32Array(N);  // per-dot flow speed
      var tmp = [];
      for (var i = 0; i < N; i++) {
        tmp.push({
          x: Math.random(),
          z: Math.pow(Math.random(), 1.3),    // bias a little toward the front
          ph: Math.random() * TWO_PI,
          sz: 0.7 + Math.random() * 1.4,
          spd: 0.6 + Math.random() * 0.9
        });
      }
      tmp.sort(function (a, b) { return b.z - a.z; }); // far -> near draw order
      for (var j = 0; j < N; j++) {
        px[j] = tmp[j].x; pz[j] = tmp[j].z; pph[j] = tmp[j].ph;
        psz[j] = tmp[j].sz; pspd[j] = tmp[j].spd;
      }
      vsx = new Float32Array(N); vsy = new Float32Array(N);
      val = new Float32Array(N); vsz = new Float32Array(N);
      vflag = new Uint8Array(N); vlink = new Uint8Array(N); vnext = new Int32Array(N);
    }

    function frac(n) { return n - Math.floor(n); }
    function edge(u) { return Math.min(1, u / 0.06) * Math.min(1, (1 - u) / 0.06); }

    function render(t) {
      ctx.clearRect(0, 0, w, h);
      var cx = w * 0.5;
      var horizonY = h * HORIZON;
      var ground = h * GROUND;
      var amp = h * AMP;
      var tilt2 = (h * TILT) * 2;
      var lift = h * LIFT;
      var R = LINKR;
      var cols = ((w / R) | 0) + 2;
      var rows = ((h / R) | 0) + 2;
      var cells = cols * rows;
      if (!gridHead || gridLen < cells) { gridHead = new Int32Array(cells); gridLen = cells; }
      for (var c = 0; c < cells; c++) gridHead[c] = -1;

      // ---- pass 1: positions (and bin into the spatial grid) ----
      var nv = 0;
      for (var i = 0; i < N; i++) {
        var xp = px[i];
        var ex = edge(xp);
        if (ex <= 0.01) continue;
        var z = pz[i];
        var persp = 1 / (1 + z * DEPTH);
        // coherent rolling wave + a little per-dot organic flow for life
        var wave =
          Math.sin(xp * TWO_PI * 1.1 + z * 2.2 - t * ROLL) * 0.55 +
          Math.sin(xp * TWO_PI * 0.5 - z * 1.4 + t * 0.55) * 0.55 +
          Math.sin(z * TWO_PI * 0.7 + t * 0.70) * 0.30 +
          Math.sin(xp * TWO_PI * 2.4 + pph[i] + t * 1.0) * 0.16;
        var xScale = SPREAD * (BACKW + (1 - BACKW) * persp);
        var sx = cx + (xp - 0.5) * w * xScale;
        var sy = horizonY + ground * persp - wave * amp * persp - (xp - 0.5) * tilt2 * persp - lift;
        var crest = (wave + 1.4) / 2.8;
        if (crest < 0) crest = 0; else if (crest > 1) crest = 1;
        var tw = 0.82 + 0.18 * Math.sin(t * 1.7 + pph[i]);
        var al = (0.10 + persp * 0.45 + crest * 0.30) * ex * tw;
        if (al <= 0.02) continue;
        if (al > 1) al = 1;
        vsx[nv] = sx; vsy[nv] = sy; val[nv] = al;
        vsz[nv] = (0.55 + persp * 2.31) * psz[i] * (0.7 + crest * 0.5); // dots +10%
        vflag[nv] = (crest > 0.72 && persp > 0.4) ? 1 : 0;
        // only the brighter dots join the link grid (faint dust stays unlinked)
        if (al >= LINKMIN) {
          vlink[nv] = 1;
          var gxi = (sx / R) | 0; if (gxi < 0) gxi = 0; else if (gxi >= cols) gxi = cols - 1;
          var gyi = (sy / R) | 0; if (gyi < 0) gyi = 0; else if (gyi >= rows) gyi = rows - 1;
          var cell = gyi * cols + gxi;
          vnext[nv] = gridHead[cell]; gridHead[cell] = nv;
        } else {
          vlink[nv] = 0;
        }
        nv++;
      }

      // ---- pass 2: thin links between nearby dots (one faint stroke) ----
      var R2 = R * R;
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(95,215,115," + LINKA + ")";
      ctx.beginPath();
      for (var k = 0; k < nv; k++) {
        if (!vlink[k]) continue;
        var xk = vsx[k], yk = vsy[k];
        var gx = (xk / R) | 0; if (gx < 0) gx = 0; else if (gx >= cols) gx = cols - 1;
        var gy = (yk / R) | 0; if (gy < 0) gy = 0; else if (gy >= rows) gy = rows - 1;
        for (var oy = -1; oy <= 1; oy++) {
          var ry = gy + oy; if (ry < 0 || ry >= rows) continue;
          for (var ox = -1; ox <= 1; ox++) {
            var rx = gx + ox; if (rx < 0 || rx >= cols) continue;
            var jj = gridHead[ry * cols + rx];
            while (jj !== -1) {
              if (jj > k) {
                var ddx = xk - vsx[jj], ddy = yk - vsy[jj];
                if (ddx * ddx + ddy * ddy < R2) { ctx.moveTo(xk, yk); ctx.lineTo(vsx[jj], vsy[jj]); }
              }
              jj = vnext[jj];
            }
          }
        }
      }
      ctx.stroke();

      // ---- pass 3: dots on top ----
      var cur = -1;
      for (var m = 0; m < nv; m++) {
        ctx.globalAlpha = val[m];
        if (vflag[m] !== cur) {
          ctx.fillStyle = vflag[m] ? "rgb(150,255,90)" : "rgb(52,200,66)";
          cur = vflag[m];
        }
        var s = vsz[m];
        ctx.fillRect(vsx[m] - s * 0.5, vsy[m] - s * 0.5, s, s);
      }
      ctx.globalAlpha = 1;
    }

    var raf = 0, last = 0;
    function loop(time) {
      var dt = last ? Math.min((time - last) / 1000, 0.05) : 0.016;
      last = time;
      for (var i = 0; i < N; i++) {
        var nx = px[i] + dt * DRIFT * pspd[i];   // left -> right flow
        px[i] = nx >= 1 ? nx - 1 : nx;
      }
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
