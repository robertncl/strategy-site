/* =========================================================================
   Secure CDE for Agentic AI — interactions
   Vanilla JS, no dependencies. Progressive enhancement + reduced-motion aware.
   ========================================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Scroll progress bar + nav shadow ---------- */
  const progress = $("#scrollProgress");
  const nav = $("#nav");

  function onScroll() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    if (progress) progress.style.inlineSize = pct + "%";
    if (nav) nav.classList.toggle("scrolled", scrolled > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = $("#navToggle");
  const navLinks = $(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Reveal on scroll (IntersectionObserver — universally supported) ---------- */
  const reveals = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const revObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => revObserver.observe(el));
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  const sections = $$("main section[id]");
  const linkFor = {};
  $$(".nav-links a").forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    linkFor[id] = a;
  });
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkFor[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            $$(".nav-links a").forEach((a) => a.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Animated number counters ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || "0");
    if (reduceMotion) { el.textContent = formatNum(target); return; }
    const duration = 1300;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = formatNum(target * eased, target);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = formatNum(target);
    }
    requestAnimationFrame(tick);
  }
  function formatNum(v, target) {
    const ref = target != null ? target : v;
    const decimals = Number.isInteger(ref) ? 0 : 1;
    const n = decimals === 0 ? Math.round(v) : Math.round(v * 10) / 10;
    return n.toLocaleString("en-US");
  }

  /* ---------- One-shot reveal for data-viz blocks ---------- */
  function whenVisible(el, cb, opts) {
    if (!el) return;
    if (!("IntersectionObserver" in window)) { cb(); return; }
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { cb(); o.unobserve(e.target); }
      });
    }, opts || { threshold: 0.4 });
    obs.observe(el);
  }

  // counters
  $$(".counter").forEach((el) => whenVisible(el, () => animateCounter(el), { threshold: 0.6 }));

  /* ---------- Maturity bars ---------- */
  $$(".maturity-row").forEach((row) => {
    whenVisible(row, () => {
      const now = row.dataset.now || 0;
      const target = row.dataset.target || 0;
      const targetBar = $(".m-target", row);
      const nowBar = $(".m-now", row);
      // target sits behind (full extent), now sits on top
      if (targetBar) targetBar.style.inlineSize = target + "%";
      if (nowBar) nowBar.style.inlineSize = now + "%";
    }, { threshold: 0.5 });
  });

  /* ---------- Bar chart (cumulative cash flow) ---------- */
  const barFig = $(".chart .bars");
  if (barFig) {
    whenVisible(barFig.closest(".chart-card"), () => {
      $$(".bar", barFig).forEach((bar) => {
        const h = parseFloat(bar.dataset.h || "0");
        const dir = bar.dataset.dir;
        const baseline = 210;
        if (reduceMotion) {
          setBar(bar, h, dir, baseline);
        } else {
          requestAnimationFrame(() => setBar(bar, h, dir, baseline));
        }
      });
    }, { threshold: 0.4 });
  }
  function setBar(bar, h, dir, baseline) {
    if (dir === "up") {
      bar.style.height = h + "px";
      bar.style.y = (baseline - h) + "px";
      bar.setAttribute("height", h);
      bar.setAttribute("y", baseline - h);
    } else {
      bar.style.height = h + "px";
      bar.style.y = baseline + "px";
      bar.setAttribute("height", h);
      bar.setAttribute("y", baseline);
    }
  }

  /* ---------- Donut chart ---------- */
  const donut = $(".donut");
  if (donut) {
    const C = 2 * Math.PI * 80; // r = 80
    whenVisible(donut.closest(".chart-card"), () => {
      $$(".donut-seg", donut).forEach((seg) => {
        const pct = parseFloat(seg.dataset.dash || "0");
        const offset = parseFloat(seg.dataset.offset || "0");
        const len = (C * pct) / 100;
        // position each segment around the ring
        seg.style.strokeDashoffset = String(-(C * offset) / 100);
        const apply = () => { seg.style.strokeDasharray = `${len} ${C - len}`; };
        if (reduceMotion) apply();
        else requestAnimationFrame(apply);
      });
    }, { threshold: 0.4 });
  }
})();
