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

  /* ---------- Hero green flowing-dot wave ---------- */
  var canvas = document.getElementById("heroWave");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var w = 0,
      h = 0;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    var TWO_PI = Math.PI * 2;

    // Flowing 3-D dot mesh: horizontal contour rows (front rows nearer/larger)
    // warped by a coherent wave height-field, brighter on the crests, sweeping
    // up toward the right edge — a perspective particle terrain.
    function clamp01(n) { return n < 0 ? 0 : n > 1 ? 1 : n; }

    function draw(time) {
      ctx.clearRect(0, 0, w, h);
      if (!w || !h) return;

      var t = time * 0.0003;
      var rows = 48;
      var cols = Math.floor(w / 6);
      var horizon = h * 0.06;

      for (var zi = 0; zi < rows; zi++) {
        var z = zi / (rows - 1); // 0 = far/back, 1 = near/front
        var rowY = horizon + Math.pow(z, 1.5) * (h - horizon); // perspective spacing
        var depth = 0.3 + z * 0.7;
        var hScale = h * 0.06 + z * (h * 0.22); // nearer rows warp more

        for (var xi = 0; xi <= cols; xi++) {
          var u = xi / cols;

          // Coherent height-field with a strong rolling swell; peaks drift with
          // depth for a 3-D effect.
          var hgt =
            Math.sin(u * 5.0 + z * 1.0 - t * 1.3) * 0.7 +
            Math.sin(u * 10.0 - z * 0.8 + t * 0.9) * 0.28 +
            Math.sin(u * 2.4 + t * 0.5) * 0.6;

          var rise = Math.pow(u, 2.6) * (h * 0.66); // up-sweep on the right
          var x = u * w;
          var y = rowY - hgt * hScale - rise;
          if (y < -14 || y > h + 14) continue;

          var crest = clamp01((hgt + 1.4) / 2.8);
          var leftFade = clamp01((u - 0.02) / 0.16);
          var rightEdge = clamp01((1 - u) / 0.02);
          var alpha = depth * leftFade * rightEdge * (0.34 + crest * 0.66);
          if (alpha <= 0.02) continue;

          var g = Math.round(150 + crest * 100);
          var r = Math.round(24 + crest * 70);
          var size = 0.6 + depth * 0.9 + crest * 0.8;

          ctx.beginPath();
          ctx.fillStyle = "rgba(" + r + ", " + g + ", " + Math.round(56 + crest * 30) + ", " + alpha + ")";
          ctx.arc(x, y, size, 0, TWO_PI);
          ctx.fill();

          // Bright lime highlight on the peaks (and the rising right edge).
          if (crest > 0.82) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(150, 255, 90, " + Math.min(alpha * 0.8, 0.6) + ")";
            ctx.arc(x, y, size * 1.7, 0, TWO_PI);
            ctx.fill();
          }
        }
      }
    }

    var raf = 0;
    function loop(time) {
      draw(time);
      raf = requestAnimationFrame(loop);
    }
    resize();
    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        if (reduceMotion) draw(0);
      }, 150);
    });
  }
})();
