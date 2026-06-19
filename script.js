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

  /* ---------- Hero wave — fully generated green dot-flow ----------
     No image. The ribbon (left crest -> mid trough -> right crest, sweeping up
     to the right) is a math height-field; a field of green dots drapes from the
     crest line, feathers out below, and streams left -> right while the surface
     ripples — a living "digital flow". */
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

    function clamp01(n) { return n < 0 ? 0 : n > 1 ? 1 : n; }
    function gauss(u, c, s) { var d = (u - c) / s; return Math.exp(-d * d); }
    // Where the ribbon exists across the width (fade in left, out right).
    function edge(u) { return Math.min(1, u / 0.05) * Math.min(1, (1 - u) / 0.045); }

    // Crest line (normalized y, 0 = top) — the recognizable wave shape, plus a
    // travelling ripple so it undulates over time.
    function topAt(u, t) {
      var c = 0.50
            - 0.20 * gauss(u, 0.27, 0.15)                       // left crest (up)
            + 0.07 * gauss(u, 0.50, 0.12)                       // middle trough (down)
            - 0.24 * gauss(u, 0.73, 0.17)                       // right crest (up)
            - 0.13 * Math.pow(clamp01((u - 0.45) / 0.55), 1.7); // overall sweep up-right
      c += 0.020 * Math.sin(u * 9.0 - t * 1.05)
         + 0.012 * Math.sin(u * 16.0 + t * 0.70);               // living ripple
      return c;
    }
    // Drape depth below the crest line (normalized).
    function thickAt(u) {
      var base = 0.15 + 0.13 * gauss(u, 0.30, 0.22) + 0.11 * gauss(u, 0.63, 0.20);
      base *= 0.45 + 0.55 * edge(u);                            // taper the ends
      return base < 0.03 ? 0.03 : base;
    }

    // Precomputed contour, refreshed each frame (cheap, drives all particles).
    var SAMP = 220;
    var topArr = new Float32Array(SAMP);
    var thArr = new Float32Array(SAMP);
    function buildContour(t) {
      for (var i = 0; i < SAMP; i++) {
        var u = i / (SAMP - 1);
        topArr[i] = topAt(u, t);
        thArr[i] = thickAt(u);
      }
    }

    // Dense dot LATTICE — a grid of points warped onto the wave surface so the
    // dots read as one cohesive sheet (not random scatter). NX columns form the
    // vertical "strands"; NY rows drape down from the crest line. The lattice
    // scrolls right (columns wrap) and the surface ripples, so the whole wave of
    // dots flows.
    var NX = 0, NY = 0;
    var jaArr, jbArr, szArr, twArr;        // fixed per-node jitter / size / twinkle
    function seed() {
      NX = Math.round(Math.min(Math.max(w / 5.5, 110), 260));  // strands
      NY = 24;                                                  // drape rows
      var N = NX * NY;
      jaArr = new Float32Array(N);
      jbArr = new Float32Array(N);
      szArr = new Float32Array(N);
      twArr = new Float32Array(N);
      var colStep = 1 / NX;
      for (var n = 0; n < N; n++) {
        jaArr[n] = (Math.random() - 0.5) * colStep * 0.85;     // loosen the grid
        jbArr[n] = (Math.random() - 0.5) * 0.05;
        szArr[n] = 1.0 + Math.random() * 1.3;
        twArr[n] = Math.random() * TWO_PI;
      }
    }

    function frac(n) { return n - Math.floor(n); }

    var scroll = 0;
    function render(t) {
      ctx.clearRect(0, 0, w, h);
      var cur = -1;                                            // 0 = body, 1 = crest
      for (var i = 0; i < NX; i++) {
        var ca = i / NX + scroll;
        for (var j = 0; j < NY; j++) {
          var n = i * NY + j;
          var a = frac(ca + jaArr[n]);
          var pres = edge(a);
          if (pres <= 0.01) continue;
          var b = j / (NY - 1) + jbArr[n];
          if (b < 0) b = 0; else if (b > 1) b = 1;
          var idx = (a * (SAMP - 1)) | 0;
          // gentle 3-D fold + ripple so the sheet looks woven and alive
          var fold = 0.030 * Math.sin(a * TWO_PI * 1.6 - b * 1.3 - t * 1.1);
          var x = a * w;
          var y = (topArr[idx] + b * thArr[idx] + fold) * h;
          var bright = 1 - b;                                  // crest brightest
          var tw = 0.8 + 0.2 * Math.sin(t * 1.8 + twArr[n]);
          var al = (0.16 + bright * 0.7) * pres * tw;
          if (al <= 0.02) continue;
          var sz = szArr[n] * (0.7 + bright * 0.7);
          ctx.globalAlpha = al;
          var wantCrest = bright > 0.72 ? 1 : 0;
          if (wantCrest !== cur) {
            ctx.fillStyle = wantCrest ? "rgb(150,255,90)" : "rgb(56,205,70)";
            cur = wantCrest;
          }
          ctx.fillRect(x - sz * 0.5, y - sz * 0.5, sz, sz * 1.5);
        }
      }
      ctx.globalAlpha = 1;
    }

    var raf = 0, last = 0;
    function loop(time) {
      var dt = last ? Math.min((time - last) / 1000, 0.05) : 0.016;
      last = time;
      var t = time * 0.001;
      scroll += dt * 0.05;                                     // left -> right flow
      if (scroll >= 1) scroll -= 1;
      buildContour(t);
      render(t);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      last = 0;
      if (reduceMotion) { buildContour(0); render(0); }
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
