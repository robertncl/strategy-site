# Sandboxes for Agentic AI — Copilot · Copilot Studio · Foundry

A single-page, framework-free **comparison deck website** for enterprise decision-makers choosing
**where AI should run its code**. It surveys the three sandbox (isolated, ephemeral code-execution)
options across the GitHub & Microsoft stack — **GitHub Copilot** local/cloud sandboxes,
**Microsoft Copilot Studio**'s code interpreter, and **Azure AI Foundry** agent sandboxes — and shows
that all three converge on one shared substrate: **Azure Container Apps + Hyper-V isolation**.

## Run it

It's static — no build step. Either open `index.html` directly, or serve it:

```bash
cd sandbox
python3 -m http.server 8000
# → http://localhost:8000
```

## Navigation

- **Scroll** (snap), or **→ / ↓ / Space** and **← / ↑** to move between slides
- **Home / End** jump to first / last
- Click the **dot rail** (right) or the **‹ ›** arrows (bottom-right)

## Slides (the argument)

1. **Title** — where should AI run its code?
2. **Why now** — AI stopped suggesting; it started executing
3. **The risk** — autonomy without isolation is a breach waiting to happen
4. **Three surfaces** — three products, three audiences, one idea
5. **GitHub Copilot** — local & cloud sandboxes + the coding agent
6. **Copilot Studio** — the code interpreter sandbox for low-code makers
7. **Azure AI Foundry** — code interpreter & per-session VM-isolated hosted agents
8. **Side by side** — a dimension-by-dimension comparison matrix
9. **Shared substrate** — one isolation engine (Azure Container Apps + Hyper-V) powers all three
10. **Which one?** — interactive selector that scores fit from your requirements
11. **Security model** — defense in depth, by construction
12. **Governance** — enterprise controls + inherited compliance
13. **Rollout** — a pragmatic, low-risk three-track plan
14. **Trade-offs** — honest risks + mitigations
15. **The ask** — approve a three-track pilot this quarter

## The interactive selector (slide 10)

Toggle the requirement chips and the three products fill bars proportional to fit; the leader is
highlighted. Weights live inline in `index.html` as `data-gh` / `data-cs` / `data-af` attributes on
each `.chip`, and the scoring/normalisation runs in `app.js`. It's a **heuristic conversation aid**,
not a procurement decision — adjust the weights to match your own priorities.

## ⚠️ About the facts

The deck reflects publicly documented behaviour as of **June 2026**. These offerings move fast —
especially GitHub Copilot sandboxes, which were in **public preview** at the time of writing.
Re-verify against current docs before presenting:

| Claim | Source |
|---|---|
| Copilot local (`/sandbox enable`) & cloud (`copilot --cloud`) sandboxes, ACA-based, public preview | GitHub Changelog / Docs — "Cloud and local sandboxes for GitHub Copilot" |
| Copilot Studio code interpreter — isolated Azure VM, no egress, live-monitored, off by default | Microsoft Learn — "FAQ for code interpreter (Copilot Studio)" |
| Foundry code interpreter — ACA dynamic sessions, Hyper-V boundary, ≤1 hr / 30-min idle, no egress | Microsoft Learn — "Use Code Interpreter with Microsoft Foundry agents" |

The comparison matrix (slide 8) and selector weights are **editorial summaries** for framing — confirm
specifics (region availability, pricing, sovereign-cloud coverage) for your tenant.

## Files

- `index.html` — content + structure (15 slides)
- `styles.css` — dark theme, scroll-snap slides, glass cards, comparison matrix, selector, reveal styles
- `app.js` — nav, keyboard, progress, IntersectionObserver reveals, the "which sandbox" selector

## Accessibility / robustness

- Content is fully visible **without JS** (reveals are progressive enhancement).
- Honors `prefers-reduced-motion` (disables animations + smooth scroll).
- Keyboard navigable; dot buttons carry `aria-label` / `aria-current`; chips use `aria-pressed`.
- Responsive via container queries; usable on mobile (dot rail hides, arrows reflow, matrix scrolls).
