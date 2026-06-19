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

    function draw(time) {
      ctx.clearRect(0, 0, w, h);
      if (!w || !h) return;
      var t = time * 0.0005; // slow drift, right -> left
      var rows = 16;
      var step = w > 700 ? 5 : 9;

      for (var x = -10; x <= w; x += step) {
        var nx = x / w;
        // Start low-left (below the headline), sweep up to the middle-right.
        var centerY =
          h * 0.86 -
          Math.pow(nx, 1.25) * h * 0.4 +
          Math.sin(nx * 9 + t) * h * 0.05 +
          Math.sin(nx * 4 - t * 0.6) * h * 0.03;
        var bandHalf = h * 0.1 * (0.8 + nx * 0.4);
        var edge = Math.min(1, Math.min(nx, 1 - nx) / 0.05);
        if (edge <= 0) continue;

        for (var v = 0; v < rows; v++) {
          var s = v / (rows - 1) - 0.5;
          var ripple = Math.sin(nx * 13 + v * 0.55 + t * 1.1) * h * 0.018;
          var y = centerY + s * bandHalf * 2 + ripple;
          if (y < -6 || y > h + 6) continue;
          var vFade = 1 - Math.abs(s) * 1.7;
          if (vFade <= 0) continue;
          var bright = 0.45 + (0.5 - s) * 0.55;
          var alpha = edge * vFade * (0.18 + bright * 0.5);
          if (alpha <= 0.02) continue;
          var g = Math.round(150 + bright * 95);
          var r = Math.round(28 + bright * 45);
          var size = 0.55 + bright * 0.65;
          ctx.beginPath();
          ctx.fillStyle = "rgba(" + r + ", " + g + ", 78, " + alpha + ")";
          ctx.arc(x, y, size, 0, TWO_PI);
          ctx.fill();
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
