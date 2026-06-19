/* =========================================================================
   Applied Research Institute — shared site interactions (vanilla JS).
   Premium motion system: reveal-on-scroll, staggered grids, count-up,
   glass header, hero-wave parallax, smooth anchors. No dependencies.

   Public markup API
   -----------------
   data-reveal="fade-up|fade|slide-left|slide-right|scale"  (bare = fade-up)
   data-delay="120"          explicit reveal delay in ms (overrides stagger)
   data-stagger              on a wrapper: its revealable children cascade 90ms
   data-replay               re-run the reveal each time it re-enters view
   data-count-up data-value="25000" data-suffix="+"   animated number
   (legacy .reveal and .count keep working — .reveal == data-reveal="fade-up")
   ========================================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supportsIO = "IntersectionObserver" in window;
  var STAGGER_STEP = 90; // ms between staggered siblings
  var STAGGER_MAX = 8; // cap so long lists don't lag far behind

  /* ---------- 1. Glass header on scroll ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var onScroll = function () {
      var scrolled = window.scrollY > 12;
      header.classList.toggle("is-scrolled", scrolled);
      header.classList.toggle("scrolled", scrolled); // legacy hook
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 2. Mobile nav ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("menuToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 3 + 4. Scroll reveal & staggered grids ---------- */
  function reveal(el) {
    el.classList.add("is-visible");
    if (el.classList.contains("reveal")) el.classList.add("visible"); // legacy CSS
  }
  function unreveal(el) {
    el.classList.remove("is-visible", "visible");
  }
  function assignDelays(els) {
    // a) explicit data-stagger groups
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var kids = group.querySelectorAll(":scope > [data-reveal], :scope > .reveal");
      Array.prototype.forEach.call(kids, function (kid, i) {
        if (!kid.hasAttribute("data-delay")) {
          kid.style.setProperty("--reveal-delay", Math.min(i, STAGGER_MAX) * STAGGER_STEP + "ms");
        }
      });
    });
    // b) explicit data-delay, then c) implicit "same parent" cascade
    var lastParent = null;
    var idx = 0;
    els.forEach(function (el) {
      if (el.hasAttribute("data-delay")) {
        el.style.setProperty("--reveal-delay", (parseInt(el.dataset.delay, 10) || 0) + "ms");
        return;
      }
      if (el.style.getPropertyValue("--reveal-delay")) return; // set by data-stagger
      if (el.closest("[data-stagger]")) return;
      if (el.parentElement !== lastParent) {
        lastParent = el.parentElement;
        idx = 0;
      }
      el.style.setProperty("--reveal-delay", Math.min(idx, 6) * STAGGER_STEP + "ms");
      idx++;
    });
  }
  function initScrollReveal() {
    var els = Array.prototype.slice.call(
      document.querySelectorAll(".reveal, [data-reveal]")
    );
    if (!els.length) return;
    assignDelays(els);

    if (reduceMotion || !supportsIO) {
      els.forEach(reveal);
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var el = entry.target;
          if (entry.isIntersecting) {
            reveal(el);
            if (!el.hasAttribute("data-replay")) obs.unobserve(el);
          } else if (el.hasAttribute("data-replay")) {
            unreveal(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ---------- 5. Count-up stats ---------- */
  function withCommas(s) {
    var parts = String(s).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  function renderCount(el, value) {
    var prefix = el.dataset.prefix || "";
    var suffix = el.dataset.suffix || "";
    var decimals = parseInt(el.dataset.decimals, 10) || 0;
    el.textContent = prefix + withCommas(value.toFixed(decimals)) + suffix;
  }
  function animateCount(el) {
    var target = parseFloat(el.dataset.value != null ? el.dataset.value : el.dataset.target);
    if (isNaN(target)) return;
    if (reduceMotion) {
      renderCount(el, target);
      return;
    }
    var duration = 1500;
    var start = performance.now();
    (function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      renderCount(el, target * (1 - Math.pow(1 - p, 3))); // easeOutCubic
      if (p < 1) requestAnimationFrame(tick);
    })(performance.now());
  }
  function initCountUp() {
    var els = document.querySelectorAll(".count, [data-count-up]");
    if (!els.length) return;
    if (!supportsIO) {
      Array.prototype.forEach.call(els, function (el) {
        renderCount(el, parseFloat(el.dataset.value != null ? el.dataset.value : el.dataset.target) || 0);
      });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    Array.prototype.forEach.call(els, function (el) {
      obs.observe(el);
    });
  }

  /* ---------- 6. Hero green-wave parallax ---------- */
  function initHeroWaveParallax() {
    var wave = document.querySelector(".wave-wrap");
    if (!wave || reduceMotion) return;
    var ticking = false;
    function update() {
      ticking = false;
      var p = Math.min((window.scrollY || 0) / 400, 1);
      wave.style.transform =
        "translate3d(0," + (-60 * p).toFixed(1) + "px,0) scale(" + (1 + 0.03 * p).toFixed(3) + ")";
      wave.style.opacity = (1 - 0.5 * p).toFixed(3);
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------- 7. Smooth in-page anchors (header-aware) ---------- */
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var hash = a.getAttribute("href");
      if (!hash || hash === "#" || hash.length < 2) return;
      var target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      var header = document.getElementById("siteHeader");
      var offset = (header ? header.offsetHeight : 0) + 12;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", hash);
    });
  }

  /* ---------- Contact form (client-side confirmation) ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    var confirmation = document.getElementById("formConfirmation");
    if (!form || !confirmation) return;
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
  function initFooterYear() {
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- Logo rail (auto-scroll + arrow controls) ---------- */
  function initLogoRail() {
    var track = document.getElementById("logoTrack");
    if (!track) return;
    var offset = 0;
    var speed = 0.5; // px per frame, leftward
    var paused = false;
    var half = 0;
    var measure = function () {
      half = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    if (reduceMotion) return;

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
    (function railLoop() {
      if (!paused) offset -= speed;
      if (half) {
        if (offset <= -half) offset += half;
        if (offset > 0) offset -= half;
      }
      track.style.transform = "translateX(" + offset + "px)";
      requestAnimationFrame(railLoop);
    })();
  }

  /* ---------- Hero wave — 3-D perspective dot-lattice ----------
     A free-flowing field of green dots warped by a rolling wave height-field,
     drawn in perspective so it reads as a cohesive sheet receding into the
     distance. Nearby dots are linked with thin green lines via a spatial grid.
     Tunables are grouped up top. */
  function initHeroWave() {
    var canvas = document.getElementById("heroWave");
    if (!canvas || !canvas.getContext) return;
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
    var DEPTH = 2.4, SPREAD = 1.6, GROUND = 0.40, HORIZON = 0.04, AMP = 0.24,
      TILT = 0.12, DRIFT = 0.02, ROLL = 0.6, LIFT = 0;
    var BACKW = 0.82, LINKR = 14, LINKA = 0.08, LINKMIN = 0.52;

    var N = 0, px, pz, pph, psz, pspd;
    var vsx, vsy, val, vsz, vflag, vlink, vnext, gridHead = null, gridLen = 0;
    function seed() {
      N = Math.round(Math.min(Math.max(w * 4.6, 2600), 6800));
      px = new Float32Array(N); pz = new Float32Array(N); pph = new Float32Array(N);
      psz = new Float32Array(N); pspd = new Float32Array(N);
      var tmp = [];
      for (var i = 0; i < N; i++) {
        tmp.push({
          x: Math.random(),
          z: Math.pow(Math.random(), 1.3),
          ph: Math.random() * TWO_PI,
          sz: 0.7 + Math.random() * 1.4,
          spd: 0.6 + Math.random() * 0.9
        });
      }
      tmp.sort(function (a, b) { return b.z - a.z; });
      for (var j = 0; j < N; j++) {
        px[j] = tmp[j].x; pz[j] = tmp[j].z; pph[j] = tmp[j].ph;
        psz[j] = tmp[j].sz; pspd[j] = tmp[j].spd;
      }
      vsx = new Float32Array(N); vsy = new Float32Array(N);
      val = new Float32Array(N); vsz = new Float32Array(N);
      vflag = new Uint8Array(N); vlink = new Uint8Array(N); vnext = new Int32Array(N);
    }

    function edge(u) { return Math.min(1, u / 0.06) * Math.min(1, (1 - u) / 0.06); }

    function render(t) {
      ctx.clearRect(0, 0, w, h);
      var cx = w * 0.5;
      var horizonY = h * HORIZON, ground = h * GROUND, amp = h * AMP;
      var tilt2 = (h * TILT) * 2, lift = h * LIFT;
      var R = LINKR;
      var cols = ((w / R) | 0) + 2, rows = ((h / R) | 0) + 2, cells = cols * rows;
      if (!gridHead || gridLen < cells) { gridHead = new Int32Array(cells); gridLen = cells; }
      for (var c = 0; c < cells; c++) gridHead[c] = -1;

      var nv = 0;
      for (var i = 0; i < N; i++) {
        var xp = px[i];
        var ex = edge(xp);
        if (ex <= 0.01) continue;
        var z = pz[i];
        var persp = 1 / (1 + z * DEPTH);
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
        vsz[nv] = (0.63 + persp * 2.63) * psz[i] * (0.7 + crest * 0.5);
        vflag[nv] = (crest > 0.72 && persp > 0.4) ? 1 : 0;
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

      var R2 = R * R;
      ctx.globalAlpha = 1; ctx.lineWidth = 1;
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
        var nx = px[i] + dt * DRIFT * pspd[i];
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

    resize(); seed(); start();
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { resize(); seed(); start(); }, 150);
    });
  }

  /* ---------- boot ---------- */
  function init() {
    initHeaderScroll();
    initMobileNav();
    initScrollReveal();
    initCountUp();
    initHeroWaveParallax();
    initSmoothAnchors();
    initContactForm();
    initFooterYear();
    initLogoRail();
    initHeroWave();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
