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

  /* ---------- Hero wave — green dots streaming through the wave shape ----------
     The wave silhouette is sampled from assets/wave.png (so it keeps the exact
     shape), then a field of green dots flows left -> right through that shape,
     so the wave itself is made of moving particles. Falls back to a procedural
     wave band if the image can't be read. */
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

    // Per-column vertical band of the wave shape, normalized 0..1 of height.
    var prof = null; // { top:Float32Array, bot:Float32Array, cols:int }

    function buildProfileFromImage(img) {
      try {
        var oc = document.createElement("canvas");
        var cols = Math.max(2, Math.floor(w));
        var rows = Math.max(2, Math.floor(h));
        oc.width = cols;
        oc.height = rows;
        var octx = oc.getContext("2d");
        // Match the CSS "center / 100% auto": full width, proportional height,
        // vertically centered.
        var drawW = w;
        var drawH = w * img.naturalHeight / img.naturalWidth;
        octx.drawImage(img, 0, (h - drawH) / 2, drawW, drawH);
        var data = octx.getImageData(0, 0, cols, rows).data;
        var top = new Float32Array(cols), bot = new Float32Array(cols);
        var has = false;
        for (var x = 0; x < cols; x++) {
          var t = -1, b = -1;
          for (var y = 0; y < rows; y++) {
            if (data[(y * cols + x) * 4 + 3] > 28) {
              if (t < 0) t = y;
              b = y;
            }
          }
          if (t >= 0) { top[x] = t / rows; bot[x] = b / rows; has = true; }
          else { top[x] = -1; bot[x] = -1; }
        }
        if (!has) return false;
        prof = { top: top, bot: bot, cols: cols };
        return true;
      } catch (e) {
        return false;
      }
    }

    function buildProfileFallback() {
      var cols = Math.max(2, Math.floor(w));
      var top = new Float32Array(cols), bot = new Float32Array(cols);
      for (var x = 0; x < cols; x++) {
        var u = x / (cols - 1);
        if (u < 0.04 || u > 0.99) { top[x] = -1; bot[x] = -1; continue; }
        var rise = Math.pow(u, 2.3);                       // sweep up on the right
        var center = 0.74 - rise * 0.56 + Math.sin(u * 6.0) * 0.04;
        var thick = 0.18 + 0.16 * (1 - Math.abs(u - 0.5) * 1.2);
        top[x] = Math.max(0, center - thick / 2);
        bot[x] = Math.min(1, center + thick / 2);
      }
      prof = { top: top, bot: bot, cols: cols };
    }

    // Flowing dot field.
    var COUNT = 0, particles = [];
    function seed() {
      COUNT = Math.round(Math.min(Math.max(w * 0.95, 420), 1300));
      particles = new Array(COUNT);
      for (var i = 0; i < COUNT; i++) {
        particles[i] = {
          u: Math.random(),
          band: Math.random(),
          speed: 0.5 + Math.random() * 1.0,
          size: 0.7 + Math.random() * 1.7,
          bobAmp: 1 + Math.random() * 3,
          bobSpd: 0.5 + Math.random() * 1.3,
          phase: Math.random() * TWO_PI,
          alpha: 0.5 + Math.random() * 0.5
        };
      }
    }

    function render(time) {
      ctx.clearRect(0, 0, w, h);
      if (!prof) return;
      var cols = prof.cols, top = prof.top, bot = prof.bot;
      for (var i = 0; i < COUNT; i++) {
        var p = particles[i];
        var c = Math.floor(p.u * (cols - 1));
        var tN = top[c];
        if (tN < 0) continue;                         // gap in the wave shape
        var bN = bot[c];
        var x = p.u * w;
        var y = (tN + p.band * (bN - tN)) * h +
                Math.sin(time * 0.001 * p.bobSpd + p.phase) * p.bobAmp;
        // Fade in/out at the extreme edges so the wrap-around is seamless.
        var edge = Math.min(1, p.u / 0.06) * Math.min(1, (1 - p.u) / 0.05);
        var crest = 1 - p.band;                       // top of band = crest
        var a = (0.30 + crest * 0.55) * p.alpha * edge;
        if (a <= 0.015) continue;
        ctx.beginPath();
        ctx.fillStyle = "rgba(" +
          Math.round(36 + crest * 100) + "," +
          Math.round(198 + crest * 57) + "," +
          Math.round(55 + crest * 35) + "," + a + ")";
        ctx.arc(x, y, p.size + crest * 0.6, 0, TWO_PI);
        ctx.fill();
        if (crest > 0.85) {                           // bright lime crest glow
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
      for (var i = 0; i < COUNT; i++) {
        var p = particles[i];
        p.u += dt * 0.12 * p.speed;                   // left -> right flow
        if (p.u >= 1) p.u -= 1;
      }
      render(time);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      last = 0;
      if (reduceMotion) render(0);
      else raf = requestAnimationFrame(loop);
    }

    var waveImg = new Image();
    waveImg.crossOrigin = "anonymous";
    function rebuild() {
      resize();
      if (!buildProfileFromImage(waveImg)) buildProfileFallback();
      seed();
    }
    waveImg.onload = function () { rebuild(); start(); };
    waveImg.onerror = function () {
      resize();
      buildProfileFallback();
      seed();
      start();
    };
    waveImg.src = "assets/wave.png";

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { rebuild(); start(); }, 150);
    });
  }
})();
