/* ============================================================================
   DevSecOps Agentic Automation — interactions
   - Agent catalogue (render + filter + search)
   - Theme toggle (system default, user can pin; persisted)
   - Scroll-spy nav, scroll progress, reveal-on-scroll, count-up, back-to-top
   - Mobile nav
   ============================================================================ */
(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------- AGENT CATALOGUE -- */
  const BUILD_NAMES = { CS: "Copilot Studio", AF: "Azure AI Foundry", GH: "GitHub Copilot" };
  const VERB = { L1: "Advise", L2: "Propose", L3: "Act-with-approval" };

  // group, groupName, name, desc, tools[], level (accent), levels[] (filter), auto (label), build[]
  const AGENTS = [
    { n: 1, g: "A", gn: "Orchestration", name: "DevSecOps Orchestrator",
      desc: "Routes events and requests to specialists, maintains run state, and returns one consolidated result.",
      tools: ["All (via sub-agents)"], level: "L2", levels: ["L2"], auto: "L2", build: ["AF"], wave: 2 },

    { n: 2, g: "B", gn: "Plan, Govern & Document", name: "Security Backlog & Story",
      desc: "Drafts well-formed Jira issues from findings and requirements, linked to their specs.",
      tools: ["Jira", "Confluence"], level: "L2", levels: ["L2"], auto: "L2", build: ["CS"], wave: 2 },
    { n: 3, g: "B", gn: "Plan, Govern & Document", name: "Compliance Evidence & Audit",
      desc: "Assembles release audit-evidence packs mapped to BNM / MAS controls.",
      tools: ["Confluence", "Azure DevOps", "Jira", "Scanners"], level: "L1", levels: ["L1", "L2"], auto: "L1 → L2", build: ["CS"], wave: 1 },
    { n: 4, g: "B", gn: "Plan, Govern & Document", name: "Knowledge & Runbook",
      desc: "Answers “how do we…” from Confluence and Jira, and drafts runbooks — always cited.",
      tools: ["Confluence", "Jira"], level: "L1", levels: ["L1"], auto: "L1", build: ["CS"], wave: 1 },

    { n: 5, g: "C", gn: "Secure Code & Pull Requests", name: "PR Review & Triage",
      desc: "Reviews PRs against SonarQube and Veracode findings, then comments a verdict — it cannot merge.",
      tools: ["GitHub", "SonarQube", "Veracode"], level: "L2", levels: ["L2"], auto: "L2", build: ["GH", "AF"], wave: 2 },
    { n: 6, g: "C", gn: "Secure Code & Pull Requests", name: "SAST & Quality Remediation",
      desc: "Proposes and opens fix PRs for SAST and quality issues; merges only on green + approval.",
      tools: ["Veracode", "SonarQube", "GitHub"], level: "L3", levels: ["L3"], auto: "L3", build: ["GH"], wave: 3 },
    { n: 7, g: "C", gn: "Secure Code & Pull Requests", name: "Secret-Leak & Key-Rotation",
      desc: "On a secret-scan alert: validate, ticket, and rotate the credential via Key Vault.",
      tools: ["GitHub Adv. Security", "Azure Key Vault", "Jira"], level: "L3", levels: ["L3"], auto: "L3", build: ["AF"], wave: 3 },
    { n: 8, g: "C", gn: "Secure Code & Pull Requests", name: "Quality-Gate Watch",
      desc: "Monitors SonarQube gates, explains failures, and trends pass-rate over time.",
      tools: ["SonarQube", "GitHub / ADO"], level: "L1", levels: ["L1"], auto: "L1", build: ["AF"], wave: 1 },

    { n: 9, g: "D", gn: "Dependencies & Supply Chain", name: "SCA & Dependency Triage",
      desc: "Correlates Veracode SCA with Sonatype IQ, prioritises, and files triage tickets with safe-version advice.",
      tools: ["Veracode SCA", "Sonatype IQ", "Jira"], level: "L2", levels: ["L2"], auto: "L2", build: ["AF"], wave: 2 },
    { n: 10, g: "D", gn: "Dependencies & Supply Chain", name: "OSS Policy & Quarantine",
      desc: "Enforces Nexus policy, quarantines risky components, and raises waivers.",
      tools: ["Sonatype Nexus", "IQ / Firewall"], level: "L3", levels: ["L3"], auto: "L3", build: ["AF"], wave: 3 },
    { n: 11, g: "D", gn: "Dependencies & Supply Chain", name: "SBOM & License Compliance",
      desc: "Generates and maintains the SBOM, flags license risk, and re-alerts on new CVEs.",
      tools: ["Sonatype Nexus", "GitHub", "Confluence"], level: "L2", levels: ["L2"], auto: "L2", build: ["AF"], wave: 2 },
    { n: 12, g: "D", gn: "Dependencies & Supply Chain", name: "Dependency-Update",
      desc: "Proposes and tests dependency upgrades as PRs; merges on green build + approval.",
      tools: ["GitHub", "Sonatype Nexus", "CI"], level: "L3", levels: ["L3"], auto: "L3", build: ["GH"], wave: 3 },

    { n: 13, g: "E", gn: "Cloud, IaC & Containers", name: "CSPM Drift & Misconfig",
      desc: "On a Prisma posture alert: explain it, propose an IaC fix, and track the SLA.",
      tools: ["Prisma Cloud", "Azure", "GitHub"], level: "L3", levels: ["L3"], auto: "L3", build: ["AF"], wave: 3 },
    { n: 14, g: "E", gn: "Cloud, IaC & Containers", name: "IaC Security Scan",
      desc: "Scans Terraform / Bicep pre-deploy, blocks high-risk changes, and comments fixes.",
      tools: ["Prisma Cloud", "GitHub / ADO"], level: "L2", levels: ["L2"], auto: "L2", build: ["AF"], wave: 2 },
    { n: 15, g: "E", gn: "Cloud, IaC & Containers", name: "Container & Image Compliance",
      desc: "Gates images (Prisma + Nexus / ACR) and suggests base-image fixes.",
      tools: ["Prisma Cloud", "Sonatype Nexus", "ACR"], level: "L3", levels: ["L3"], auto: "L3", build: ["AF"], wave: 3 },

    { n: 16, g: "F", gn: "Release & Deploy", name: "Release-Readiness & Change-Gate",
      desc: "Verifies all gates, assembles the change record, and posts a go / no-go.",
      tools: ["All", "Jira"], level: "L2", levels: ["L2"], auto: "L2", build: ["AF"], wave: 2 },
    { n: 17, g: "F", gn: "Release & Deploy", name: "Deploy & Rollback",
      desc: "Orchestrates the Azure deploy, monitors health, and auto-rolls-back on failure.",
      tools: ["Azure DevOps / Pipelines", "Azure"], level: "L3", levels: ["L3"], auto: "L3", build: ["AF"], wave: 3 },

    { n: 18, g: "G", gn: "Vulnerability Mgmt & Reporting", name: "Unified Vulnerability Correlation",
      desc: "Aggregates findings across all scanners, dedupes them, into one prioritised backlog.",
      tools: ["All scanners"], level: "L2", levels: ["L2"], auto: "L2", build: ["AF"], wave: 2 },
    { n: 19, g: "G", gn: "Vulnerability Mgmt & Reporting", name: "Security & DORA Metrics",
      desc: "Computes DORA and security KPIs for leadership, with a generated report.",
      tools: ["All", "Confluence"], level: "L1", levels: ["L1", "L2"], auto: "L1 → L2", build: ["AF"], wave: 1 },

    { n: 20, g: "H", gn: "Incident Response", name: "Security Incident Response",
      desc: "Triage and enrich the alert, open an incident, draft comms, scope containment, and a postmortem.",
      tools: ["Prisma", "GitHub", "Azure / Sentinel", "Jira", "Confluence"], level: "L3", levels: ["L3"], auto: "L3", build: ["AF"], wave: 3 },

    { n: 21, g: "I", gn: "Enablement", name: "Secure Pipeline / Golden-Path Scaffold",
      desc: "Scaffolds a compliant pipeline: repo, CI gates, Jira project and Confluence space.",
      tools: ["All"], level: "L3", levels: ["L3"], auto: "L3", build: ["GH", "AF"], wave: 3 },
  ];

  const grid = document.getElementById("agent-grid");
  const resultN = document.getElementById("result-n");
  const emptyState = document.getElementById("empty-state");
  const state = { auto: "all", build: "all", q: "" };

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function cardHTML(a) {
    const lvl = a.level.toLowerCase();
    const builds = a.build
      .map((b) => `<span class="ac-build" title="${esc(BUILD_NAMES[b] || b)}">${b}</span>`)
      .join("");
    const tools = a.tools.map((t) => `<li>${esc(t)}</li>`).join("");
    const verb = a.auto.includes("→") ? "Propose" : VERB[a.level];
    return `
      <li class="agent-card" data-level="${a.level}">
        <div class="ac-top">
          <span class="ac-num">#${String(a.n).padStart(2, "0")}</span>
          <div class="ac-badges">${builds}</div>
        </div>
        <div>
          <p class="ac-group">${a.g} · ${esc(a.gn)}</p>
          <h3 class="ac-name">${esc(a.name)}</h3>
        </div>
        <p class="ac-desc">${esc(a.desc)}</p>
        <ul class="ac-tools">${tools}</ul>
        <div class="ac-foot">
          <span class="ac-auto"><span class="swatch sw-${lvl}"></span>${esc(a.auto)} · ${verb}</span>
          <span class="ac-wave">Wave ${a.wave}</span>
        </div>
      </li>`;
  }

  function matches(a) {
    if (state.auto !== "all" && !a.levels.includes(state.auto)) return false;
    if (state.build !== "all" && !a.build.includes(state.build)) return false;
    if (state.q) {
      const hay = [a.name, a.desc, a.gn, a.auto, a.tools.join(" "), a.build.map((b) => BUILD_NAMES[b]).join(" ")]
        .join(" ").toLowerCase();
      if (!hay.includes(state.q)) return false;
    }
    return true;
  }

  function render() {
    if (!grid) return;
    const list = AGENTS.filter(matches);
    grid.innerHTML = list.map(cardHTML).join("");
    if (resultN) resultN.textContent = String(list.length);
    if (emptyState) emptyState.hidden = list.length !== 0;
  }

  // Filter chips
  document.querySelectorAll(".chip[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.filter;
      state[group] = chip.dataset.value;
      document.querySelectorAll(`.chip[data-filter="${group}"]`).forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      render();
    });
  });

  // Search
  const search = document.getElementById("agent-search");
  if (search) {
    search.addEventListener("input", () => {
      state.q = search.value.trim().toLowerCase();
      render();
    });
  }

  // Clear filters
  const clearBtn = document.getElementById("clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.auto = "all"; state.build = "all"; state.q = "";
      if (search) search.value = "";
      document.querySelectorAll(".chip[data-filter]").forEach((c) => {
        const on = c.dataset.value === "all";
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      render();
    });
  }

  render();

  /* ----------------------------------------------------------- THEME TOGGLE -- */
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="color-scheme"]');
  const themeBtn = document.getElementById("theme-toggle");
  const mqDark = matchMedia("(prefers-color-scheme: dark)");

  const effective = () =>
    root.classList.contains("theme-dark") ? "dark"
    : root.classList.contains("theme-light") ? "light"
    : (mqDark.matches ? "dark" : "light");

  function syncThemeBtn() {
    if (themeBtn) themeBtn.setAttribute("aria-pressed", String(effective() === "dark"));
  }
  syncThemeBtn();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = effective() === "dark" ? "light" : "dark";
      root.classList.remove("theme-light", "theme-dark");
      root.classList.add("theme-" + next);
      if (meta) meta.content = next;
      try { localStorage.setItem("color-scheme", next); } catch (e) { /* storage may be blocked */ }
      syncThemeBtn();
    });
  }
  // React to OS theme change while following the system default
  mqDark.addEventListener("change", syncThemeBtn);

  /* ------------------------------------------------------------- MOBILE NAV -- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.getElementById("nav-list");
  function closeMenu() { if (menuToggle) menuToggle.setAttribute("aria-expanded", "false"); }
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
    });
  }
  if (navList) navList.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* --------------------------------------------------------------- SCROLL-SPY -- */
  const navLinks = new Map();
  document.querySelectorAll(".nav-list a[href^='#']").forEach((a) => navLinks.set(a.getAttribute("href").slice(1), a));
  const spied = [...navLinks.keys()].map((id) => document.getElementById(id)).filter(Boolean);

  if (spied.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => { a.classList.remove("is-current"); a.removeAttribute("aria-current"); });
          const link = navLinks.get(entry.target.id);
          if (link) { link.classList.add("is-current"); link.setAttribute("aria-current", "true"); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    spied.forEach((s) => spy.observe(s));
  }

  /* ------------------------------------------------------ REVEAL ON SCROLL -- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* --------------------------------------------------------------- COUNT-UP -- */
  function countUp(el) {
    const to = parseInt(el.dataset.to, 10) || 0;
    if (reduceMotion) { el.textContent = String(to); return; }
    const dur = 1100;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const counts = document.querySelectorAll(".count[data-to]");
  if (counts.length) {
    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { countUp(entry.target); obs.unobserve(entry.target); } });
      }, { threshold: 0.5 });
      counts.forEach((c) => cio.observe(c));
    } else {
      counts.forEach(countUp);
    }
  }

  /* ----------------------------------------------- SCROLL PROGRESS + TO-TOP -- */
  const bar = document.getElementById("scroll-bar");
  const toTop = document.getElementById("to-top");
  let ticking = false;
  function onScroll() {
    const st = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.inlineSize = (docH > 0 ? (st / docH) * 100 : 0) + "%";
    if (toTop) toTop.hidden = st < 600;
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
