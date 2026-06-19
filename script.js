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

    // Dot field.
    var COUNT = 0, particles = [];
    function seed() {
      COUNT = Math.round(Math.min(Math.max(w * 1.25, 520), 1600));
      particles = new Array(COUNT);
      for (var i = 0; i < COUNT; i++) {
        particles[i] = {
          u: Math.random(),
          d: Math.pow(Math.random(), 1.5),     // depth in drape; biased to crest
          speed: 0.55 + Math.random() * 1.05,
          size: 0.6 + Math.random() * 1.5,
          bobAmp: 1 + Math.random() * 3,
          bobSpd: 0.4 + Math.random() * 1.2,
          phase: Math.random() * TWO_PI,
          alpha: 0.45 + Math.random() * 0.55,
          streak: Math.random() < 0.42,        // some dots are short vertical dashes
          streakLen: 2 + Math.random() * 4
        };
      }
    }

    function render(t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < COUNT; i++) {
        var p = particles[i];
        var fi = p.u * (SAMP - 1);
        var idx = fi | 0;
        var top = topArr[idx], th = thArr[idx];
        var x = p.u * w;
        var y = (top + p.d * th) * h +
                Math.sin(t * p.bobSpd + p.phase) * p.bobAmp;
        var pres = edge(p.u);
        var crest = 1 - p.d;                                    // top = crest
        var a = (0.20 + crest * 0.62) * p.alpha * pres;
        if (a <= 0.015) continue;
        ctx.fillStyle = "rgba(" +
          Math.round(40 + crest * 96) + "," +
          Math.round(196 + crest * 59) + "," +
          Math.round(58 + crest * 32) + "," + a + ")";
        if (p.streak) {
          ctx.fillRect(x - 0.55, y, 1.1, p.streakLen);
        } else {
          ctx.beginPath();
          ctx.arc(x, y, p.size + crest * 0.5, 0, TWO_PI);
          ctx.fill();
        }
        if (crest > 0.86) {                                     // bright crest glow
          ctx.beginPath();
          ctx.fillStyle = "rgba(150,255,90," + (a * 0.5) + ")";
          ctx.arc(x, y, (p.size + 0.6) * 2.0, 0, TWO_PI);
          ctx.fill();
        }
      }
    }

    var raf = 0, last = 0;
    function loop(time) {
      var dt = last ? Math.min((time - last) / 1000, 0.05) : 0.016;
      last = time;
      var t = time * 0.001;
      for (var i = 0; i < COUNT; i++) {
        var p = particles[i];
        p.u += dt * 0.11 * p.speed;                             // left -> right flow
        if (p.u >= 1) p.u -= 1;
      }
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
