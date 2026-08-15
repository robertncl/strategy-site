# Open Source Risk in the Enterprise

A 19-slide security briefing deck making the case for a working open-source risk program: how much
of a typical codebase is inherited (not written) code, how that risk actually reaches production
(known CVEs vs. deliberate supply-chain attacks), what it costs when it goes wrong, and the five
controls — plus a first-90-days plan — that a working program needs.

Built with **[Claude Design](https://claude.ai/design)** as a `.dc.html` deck: HTML slides driven by
a small runtime (`support.js` + `deck-stage.js`) and the ACME design system tokens/components under
`_ds/`.

## Run it

It's static — no build step. Either open `index.html` directly, or serve it:

```bash
cd open-source-risk
python3 -m http.server 8000
# → http://localhost:8000
```

## Navigation

- **←/→**, **↑/↓**, **PgUp/PgDn**, **Space**, **Home/End**, or number keys to move between slides
- On touch devices, tap the left/right half of the stage for prev/next
- **R** resets to slide 0

## Slides (the argument)

1. **Title** — Open source risk in the enterprise
2. **Agenda** — four parts: where the risk comes from, how it reaches production, what it costs, what good looks like
3. **Part 1 divider** — Where the risk comes from
4. **Dependency baseline** — 98% of codebases contain open source; 84,000 files average; +30% components YoY
5. **2026 inflection** — known vulnerabilities per codebase nearly doubled (280 → 581) in a year
6. **Direct vs. transitive** — the review gap: nobody reviews what a manifest file pulls in automatically
7. **Part 2 divider** — How it reaches production
8. **Two problems** — known vulnerabilities vs. deliberate supply-chain attacks, side by side
9. **Three incidents** — Log4Shell, event-stream, and the xz backdoor as three different failure modes
10. **Maintainers** — 90% of codebases carry unmaintained or out-of-date components
11. **AI-assisted development** — only 24% of orgs check AI-generated code for security, quality, and licence together
12. **Licence exposure** — licence conflicts jumped from 56% to 68% of codebases in one year
13. **Part 3 divider** — What it costs
14. **Cost of inaction** — $4.99M average breach cost; supply chain is the 2nd most common vector and the longest to contain
15. **Regulatory clock** — SEC disclosure, NIST SSDF, and the EU Cyber Resilience Act reporting deadlines
16. **Part 4 divider** — What good looks like
17. **Five controls** — SBOM, ownership, upgrade SLAs, a hardened pipeline, and a plan for unmaintained code
18. **First 90 days** — a sequenced rollout: see the estate, rank the exposure, close the loop
19. **Close** — three decisions to leave the room with

## ⚠️ About the numbers

All statistics are sourced and cited on-slide — **Black Duck OSSRA 2026**, **IBM Cost of a Data
Breach 2026**, and the **European Commission's CRA reporting obligations**. Verify dates (the CRA
Article 14 deadline in particular) and figures against the primary reports before presenting, since
report editions update annually.

## Files

- `index.html` / `open-source-risk.dc.html` — identical content; `open-source-risk.dc.html` is the
  editable source for round-tripping through [Claude Design](https://claude.ai/design), `index.html`
  is the same file so the topic follows this repo's `index.html`-as-entry-point convention.
- `support.js` — the generated `.dc.html` runtime (parses the `<x-dc>` template, applies props)
- `deck-stage.js` — the reusable `<deck-stage>` web component (keyboard nav, speaker notes, auto-scaling)
- `_ds/acme-design-system-*/` — the ACME design system this deck is built on: tokens (`tokens/acme.css`,
  `tokens/fonts.css`) and a small React component bundle (`_ds_bundle.js`)
