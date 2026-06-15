/* ============================================================
   Sandboxes for Agentic AI — deck interactions
   - dot nav + arrows + keyboard
   - progress bar + slide counter
   - IntersectionObserver reveals
   - interactive "which sandbox" selector
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

  /* ---- which slide is in view ---- */
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

  /* ---- arrows ---- */
  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  /* ---- keyboard ---- */
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

  /* ---- reveals (progressive enhancement) ---- */
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

  /* ============================================================
     "WHICH SANDBOX" SELECTOR
     Each chip carries weights toward gh / cs / af. Selected
     weights are summed, normalised to the leader = 100%, and the
     top match is highlighted. Heuristic guidance only.
     ============================================================ */
  const chips   = Array.from(document.querySelectorAll("#chips .chip"));
  const matches = Array.from(document.querySelectorAll("#matches .match"));
  const hint    = document.getElementById("pickerHint");

  const NAMES = { gh: "GitHub Copilot", cs: "Copilot Studio", af: "Azure AI Foundry" };

  function recalc() {
    const totals = { gh: 0, cs: 0, af: 0 };
    let anySelected = false;

    chips.forEach((c) => {
      if (c.getAttribute("aria-pressed") === "true") {
        anySelected = true;
        totals.gh += +c.dataset.gh || 0;
        totals.cs += +c.dataset.cs || 0;
        totals.af += +c.dataset.af || 0;
      }
    });

    const max = Math.max(totals.gh, totals.cs, totals.af, 1);

    // find leading key (only when something is selected and there's a clear sum)
    let topKey = null;
    if (anySelected && max > 0) {
      topKey = ["gh", "cs", "af"].reduce((a, b) => (totals[b] > totals[a] ? b : a), "gh");
      if (totals[topKey] === 0) topKey = null;
    }

    matches.forEach((m) => {
      const k = m.dataset.key;
      const pct = anySelected ? Math.round((totals[k] / max) * 100) : 0;
      const fill = m.querySelector("[data-fill]");
      const pctEl = m.querySelector("[data-pct]");
      if (fill) fill.style.width = pct + "%";
      if (pctEl) pctEl.textContent = anySelected ? pct + "%" : "—";
      m.classList.toggle("is-top", k === topKey);
    });

    if (hint) {
      if (!anySelected) {
        hint.innerHTML =
          'Select one or more options above — the best-fit sandbox rises to the top. ' +
          '<span class="muted">Heuristic guide, not a substitute for a fit assessment.</span>';
      } else {
        hint.innerHTML =
          'Best fit for your selection: <b>' + NAMES[topKey] + '</b>. ' +
          '<span class="muted">Heuristic guide — most real strategies blend more than one.</span>';
      }
    }
  }

  chips.forEach((c) => {
    c.setAttribute("aria-pressed", "false");
    c.addEventListener("click", () => {
      const on = c.getAttribute("aria-pressed") === "true";
      c.setAttribute("aria-pressed", on ? "false" : "true");
      recalc();
    });
  });
  recalc();
})();
