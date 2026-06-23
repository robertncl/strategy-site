/* ============================================================
   Copilot Sandbox Comparison — deck interactions
   ============================================================ */
(() => {
  "use strict";

  const deck   = document.getElementById("deck");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsNav = document.querySelector(".dots");
  const prevBtn = document.querySelector(".nav--prev");
  const nextBtn = document.querySelector(".nav--next");
  const bar     = document.querySelector(".progress__bar");
  const nowEl   = document.getElementById("slideNow");
  const totalEl = document.getElementById("slideTotal");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;

  /* ---- build dot nav ---- */
  slides.forEach((s, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Go to slide ${i + 1}: ${s.dataset.label || ""}`);
    const tip = document.createElement("span");
    tip.textContent = s.dataset.label || `Slide ${i + 1}`;
    b.appendChild(tip);
    b.addEventListener("click", () => goTo(i));
    dotsNav.appendChild(b);
  });
  const dots = Array.from(dotsNav.children);
  if (totalEl) totalEl.textContent = String(slides.length).padStart(2, "0");

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  function setActive(i) {
    if (i === current) return;
    current = i;
    dots.forEach((d, n) => d.setAttribute("aria-current", n === i ? "true" : "false"));
    if (nowEl) nowEl.textContent = String(i + 1).padStart(2, "0");
    const pct = slides.length > 1 ? (i / (slides.length - 1)) * 100 : 100;
    if (bar) bar.style.width = pct + "%";
    if (prevBtn) prevBtn.disabled = i === 0;
    if (nextBtn) nextBtn.disabled = i === slides.length - 1;
  }

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.5) {
          setActive(slides.indexOf(e.target));
        }
      });
    },
    { root: deck, threshold: [0.5] }
  );
  slides.forEach((s) => spy.observe(s));

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  window.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;
      e.preventDefault(); goTo(current + 1);
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
      if (e.target.tagName === "INPUT") return;
      e.preventDefault(); goTo(current - 1);
    } else if (e.key === "Home") { e.preventDefault(); goTo(0); }
    else if (e.key === "End")  { e.preventDefault(); goTo(slides.length - 1); }
  });

  setActive(0);

  /* ---- reveals ---- */
  document.documentElement.classList.add("js-anim");
  if (reduceMotion) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  } else {
    const revObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
        });
      },
      { root: deck, threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));
  }
})();
