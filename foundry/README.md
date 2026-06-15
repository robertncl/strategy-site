# Stretch the $30 — Copilot × Azure AI Foundry

A single-page, framework-free **pitch deck website** making the business case for
supplementing **GitHub Copilot** with **Azure AI Foundry** models — **DeepSeek, MiniMax, Kimi** —
to get more engineering done inside a fixed **$30 / developer / month** AI budget.

## Run it

It's static — no build step. Either open `index.html` directly, or serve it:

```bash
cd foundry
python3 -m http.server 8000
# → http://localhost:8000
```

## Navigation

- **Scroll** (snap), or **→ / ↓ / Space** and **← / ↑** to move between slides
- **Home / End** jump to first / last
- Click the **dot rail** (right) or the **‹ ›** arrows (bottom-right)

## Slides (the argument)

1. **Title** — Stretch the $30
2. **The budget** — every dev has a finite $30/month envelope
3. **The bottleneck** — power users exhaust premium allowance mid-month
4. **The idea** — don't replace Copilot, add a cheaper second lane
5. **The models** — DeepSeek, MiniMax, Kimi in your tenant
6. **Cost** — same task, ~10–15× cheaper per request
7. **Routing** — right task → right model matrix
8. **Calculator** — interactive: how far does $30 go?
9. **At scale** — per-dev saving × the whole org
10. **Governance** — why Azure AI Foundry (in-tenant, private, compliant)
11. **Architecture** — thin routing layer, familiar tools
12. **Rollout** — low-risk 4-phase plan
13. **Risks** — honest trade-offs + mitigations
14. **The ask** — approve a 2-week pilot, no new budget

## ⚠️ About the numbers

All figures in the deck are **illustrative** and meant to frame the conversation, not
quote contract pricing. Before presenting, validate against your own data:

| Assumption (in `app.js`) | Default | Where to confirm |
|---|---|---|
| `RATE_PREMIUM` — Copilot premium request overage | `$0.04` | GitHub Copilot billing / premium-request pricing |
| `RATE_FOUNDRY` — equivalent Foundry request (~4K in + 1K out tokens) | `$0.003` | Azure AI Foundry per-model token pricing, your region |
| `BUDGET` — per-dev monthly AI budget | `$30` | Your org policy (from the brief) |

The cost-comparison bars on slide 6 are hard-coded in `index.html` (the `--w` widths and
labels) — update them alongside the calculator rates if your numbers differ.

Model multipliers (a single premium call can consume 1×–50× of the allowance depending on
model) are mentioned qualitatively on slide 2; tune the talk track to your contract.

## Files

- `index.html` — content + structure
- `styles.css` — dark theme, scroll-snap slides, glass cards, reveal styles
- `app.js` — nav, keyboard, progress, IntersectionObserver reveals, calculator

## Accessibility / robustness

- Content is fully visible **without JS** (reveals are progressive enhancement).
- Honors `prefers-reduced-motion` (disables animations + smooth scroll).
- Keyboard navigable; dot buttons carry `aria-label` and `aria-current`.
- Responsive via container queries; usable on mobile (dot rail hides, arrows reflow).
