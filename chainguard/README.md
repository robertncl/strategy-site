# Secure by Default — Chainguard for the Enterprise

A single-page, framework-free **pitch deck website** making the business case for adopting
**Chainguard** across a large enterprise: minimal, signed, **near-zero-CVE container images** plus
**hardened, built-from-source library repositories** — to cut vulnerability toil, shrink the attack
surface, and pass software supply-chain audits.

## Run it

It's static — no build step. Either open `index.html` directly, or serve it:

```bash
cd chainguard
python3 -m http.server 8000
# → http://localhost:8000
```

## Navigation

- **Scroll** (snap), or **→ / ↓ / Space** and **← / ↑** to move between slides
- **Home / End** jump to first / last
- Click the **dot rail** (right) or the **‹ ›** arrows (bottom-right)

## Slides (the argument)

1. **Title** — Secure by default
2. **The reality** — your software is mostly other people's code
3. **The treadmill** — teams patch CVEs in software they never run
4. **The idea** — start from secure: hardened images + hardened dependencies
5. **Images** — Chainguard Images: minimal, near-zero-CVE, signed + SBOM
6. **Libraries** — securing the packages *inside* the app, built from source
7. **The numbers** — same workload, a fraction of the CVEs
8. **Calculator** — interactive: what does the CVE treadmill cost you?
9. **At scale** — per-image relief × the whole fleet
10. **Compliance** — secure *and* provable (SBOM, provenance, FIPS/FedRAMP)
11. **Architecture** — a drop-in swap, not a re-platform
12. **Rollout** — low-risk 4-phase plan
13. **Risks** — honest trade-offs + mitigations
14. **The ask** — approve a 2-service pilot this quarter

## ⚠️ About the numbers

All figures in the deck are **illustrative** and meant to frame the conversation, not quote your
environment. Before presenting, validate against a scan of your own images and your cost data:

| Assumption (in `app.js`) | Default | Where to confirm |
|---|---|---|
| `CVES_PER_IMAGE_MONTH` — CVEs needing remediation per image / month | `12` | Your container scanner (Trivy, Grype, Prisma, etc.) |
| `HOURS_PER_CVE` — eng-hours to triage, patch, test, redeploy | `2.5` | Your vuln-management / delivery metrics |
| `ENG_RATE` — loaded engineering cost / hour | `$100` | Finance / engineering cost model |
| `REDUCTION` — share of CVE work removed on hardened images | `0.95` | Compare scanner output before/after a pilot |

The CVE-comparison bars on slide 7 are hard-coded in `index.html` (the `--w` widths and labels) —
update them alongside the calculator rates with counts from your own images.

## Files

- `index.html` — content + structure
- `styles.css` — dark theme, scroll-snap slides, glass cards, reveal styles
- `app.js` — nav, keyboard, progress, IntersectionObserver reveals, CVE calculator

## Accessibility / robustness

- Content is fully visible **without JS** (reveals are progressive enhancement).
- Honors `prefers-reduced-motion` (disables animations + smooth scroll).
- Keyboard navigable; dot buttons carry `aria-label` and `aria-current`.
- Responsive via container queries; usable on mobile (dot rail hides, arrows reflow).
