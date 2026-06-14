# Secure CDE for Agentic AI — Strategy Site

A self-contained, single-page strategy site that makes the executive case for
investing in a **secure Cloud Development Environment (CDE)** for a large
enterprise (thousands of developers) — designed to let engineers and **AI
agents** build safely.

It is built for a tech estate of **GitHub Enterprise · Azure · Citrix VDI**,
supporting **Java · .NET · Python · JavaScript**.

## What it covers

The page walks an executive audience through a complete investment narrative:

1. **The Imperative** — why agentic AI rewrites the threat model of the dev inner loop
2. **Current State** — where today's setup breaks for agentic AI (with a capability-maturity chart)
3. **The Solution** — one governed CDE; four strategic pillars; before/after; and what it
   **replaces** (Citrix VDI farm → cloud workspaces, Docker Desktop licences → golden
   images, powerful laptops → low-cost thin clients)
4. **Reference Architecture** — layered controls built on GitHub Enterprise and Azure,
   with thin-client/browser access replacing the VDI farm
5. **Security Model** — the five controls that contain an agent's blast radius
6. **Roadmap** — a phased, de-risked 30-month rollout
7. **Business Case** — investment, ROI, cash-flow and benefit-mix charts
8. **Risks & Mitigations**
9. **Success Metrics (KPIs)**
10. **The Ask** — funding, team and timeline

## Running it

It's a static site with **no build step and no external dependencies**. Any
static server works:

```bash
# from the CDE/ folder
python3 -m http.server 8080
# then open http://localhost:8080
```

Or open `index.html` directly in a browser (animations and charts still work;
a server is only recommended so relative asset paths resolve cleanly).

## Files

```
CDE/
├── index.html          # all content & structure
├── assets/
│   ├── styles.css       # dark executive theme, layout, charts, responsive
│   └── app.js           # scroll-spy nav, reveal-on-scroll, counters, charts
└── README.md
```

## Design & technical notes

- **No frameworks, no CDN.** Everything is hand-built so the deck works
  offline and in a locked-down boardroom browser.
- **Charts are inline SVG/CSS** (cash-flow bars, benefit donut, maturity bars)
  animated with `IntersectionObserver` + CSS transitions — no charting library.
- **Accessibility:** semantic landmarks, ARIA labels on data viz, keyboard-
  reachable nav, and full `prefers-reduced-motion` support (animations and the
  scroll cue are disabled when the user opts out).
- **Responsive** via CSS grid with `auto-fit`/`minmax`; collapses to a mobile
  menu under 900px.

## The numbers (and how they're grounded)

The business case is sized for **~3,000 developers and contractors**. Headline
planning figures: **$18M** 3-year investment, **$48M** gross benefit, **~$30M**
net, payback inside ~18 months, ~165% 3-year ROI.

These are **illustrative planning estimates**, but the cost side is built
bottom-up and benchmarked against real CDE tooling (see the *Cost basis* table
in the Business Case section). The key insight: the dominant cost is **Azure
compute for ephemeral, auto-stopped workspaces**, not platform licensing — a
tool like **Coder** (or GitHub Codespaces / Microsoft Dev Box) is a small
per-seat layer on top. Reference list pricing used (June 2026):

- **GitHub Codespaces** — compute from ~$0.18/core-hr, storage ~$0.07/GB-month
- **Microsoft Dev Box** — ~$138–629/mo compute + ~$19–152/mo storage per box
- **Coder** — Premium licensed via sales (no public per-seat price); runs on
  your own Azure compute, so budget the VM cost separately

Blended run-rate lands around **~$165/developer/month (≈ $6M/yr)** plus a
platform team (~$2M/yr). Calibrate with Finance and a **paid pilot** before
committing.

The easiest places to edit:

- Headline stats: the `.hero-stats` block in `index.html`
- KPI band, charts & cost basis: the `#business-case` section (bar `data-h`
  values and donut `data-dash`/`data-offset` values control the visuals)
- The funding ask: the `#ask` section
