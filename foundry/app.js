/* ============================================================
   Stretch the $30 — deck interactions
   - dot nav + arrows + keyboard
   - progress bar + slide counter
   - IntersectionObserver reveals
   - interactive cost calculator
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
      if (e.target.tagName === "INPUT") return;
      e.preventDefault(); goTo(current + 1);
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
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
     COST CALCULATOR
     Illustrative rates — edit to match contracted pricing.
     ============================================================ */
  const RATE_PREMIUM = 0.04;   // $ per Copilot premium request (overage)
  const RATE_FOUNDRY = 0.003;  // $ per equivalent Foundry request (~4K in + 1K out)
  const BUDGET = 30;           // $ per dev / month

  const vol   = document.getElementById("vol");
  const split = document.getElementById("split");
  const volOut   = document.getElementById("volOut");
  const splitOut = document.getElementById("splitOut");
  const costAllEl = document.getElementById("costAll");
  const costMixEl = document.getElementById("costMix");
  const saveEl    = document.getElementById("save");
  const tagAll = document.getElementById("tagAll");
  const tagMix = document.getElementById("tagMix");
  const savePct = document.getElementById("savePct");
  const orgSave = document.getElementById("orgSave");

  const usd = (n) =>
    "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const usd0 = (n) => "$" + Math.round(n).toLocaleString("en-US");

  function budgetTag(cost, el) {
    if (!el) return;
    if (cost <= BUDGET) {
      el.textContent = `Within the $30 budget (${usd(BUDGET - cost)} to spare)`;
      el.closest(".result")?.classList.remove("over");
    } else {
      el.textContent = `Over budget by ${usd(cost - BUDGET)}`;
      el.closest(".result")?.classList.add("over");
    }
  }

  function recalc() {
    if (!vol || !split) return;
    const requests = +vol.value;
    const foundryShare = +split.value / 100;

    const toFoundry = requests * foundryShare;
    const toPremium = requests - toFoundry;

    const costAll = requests * RATE_PREMIUM;
    const costMix = toPremium * RATE_PREMIUM + toFoundry * RATE_FOUNDRY;
    const save = costAll - costMix;
    const pct = costAll > 0 ? (save / costAll) * 100 : 0;

    if (volOut)   volOut.textContent = requests.toLocaleString("en-US");
    if (splitOut) splitOut.textContent = Math.round(foundryShare * 100) + "%";

    if (costAllEl) costAllEl.textContent = usd(costAll);
    if (costMixEl) costMixEl.textContent = usd(costMix);
    if (saveEl)    saveEl.textContent = usd(save);
    if (savePct)   savePct.textContent = pct.toFixed(0) + "% lower cost for the same work";

    budgetTag(costAll, tagAll);
    budgetTag(costMix, tagMix);

    // org saving / 100 devs / year
    if (orgSave) orgSave.textContent = usd0(save * 100 * 12);
  }

  vol?.addEventListener("input", recalc);
  split?.addEventListener("input", recalc);
  recalc();
})();
