# AI-Driven Risk in the Enterprise

A 19-slide security briefing on what changes when models write our code and agents run it: the three
new inputs into production, how that risk reaches production (insecure by accident vs. adversarial by
design), what it costs, and the five controls — plus a first-90-days plan — a working program needs.

The argument is deliberately *not* "slow down AI adoption". It is "know what we have deployed, and
scope what it can reach".

Built with **[Claude Design](https://claude.ai/design)** as a `.dc.html` deck: HTML slides driven by
a small runtime (`support.js` + `deck-stage.js`) and the ACME design system tokens/components under
`_ds/`.

## Run it

It's static — no build step. Either open `index.html` directly, or serve it:

```bash
cd ai-risk
python3 -m http.server 8000
# → http://localhost:8000
```

## Navigation

- **←/→**, **↑/↓**, **PgUp/PgDn**, **Space**, **Home/End**, or number keys to move between slides
- On touch devices, tap the left/right half of the stage for prev/next
- **R** resets to slide 0
- Speaker notes are attached per slide via `data-speaker-notes`

## Slides (the argument)

1. **Title** — AI-driven risk in the enterprise
2. **Agenda** — four parts: what changed, how it reaches production, what it costs, what good looks like
3. **Part 1 divider** — What actually changed
4. **Three new inputs** — generated code, autonomous agents, and third-party models/tools
5. **Package hallucination** — models recommend packages that don't exist; attackers register the names
6. **The review gap** — output scaled with the tooling, review capacity did not
7. **Part 2 divider** — How it reaches production
8. **Two problems** — insecure by accident vs. adversarial by design, and why only one has mature defences
9. **Three incidents** — Rules File Backdoor, EchoLeak, and the Nx "s1ngularity" compromise
10. **The agent problem** — agents hold real credentials and can't separate instructions from data
11. **Model supply chain** — weights, datasets and MCP servers are executable dependencies too
12. **Governance gap** — most AI use is unsupervised, and shadow AI is the expensive part
13. **Part 3 divider** — What it costs
14. **Cost of inaction** — breach economics, and the AI-specific slice of them
15. **Regulatory clock** — SEC disclosure, EU AI Act GPAI obligations, and the EU CRA deadlines
16. **Part 4 divider** — What good looks like
17. **Five controls** — inventory, least privilege, curated dependencies, logging, and a human gate
18. **First 90 days** — see the estate, cut the blast radius, close the loop
19. **Close** — three decisions to leave the room with

## ⚠️ Verify before presenting

Figures are cited on-slide and drawn from published sources rather than invented, but **check them
against the primary source before you present** — report editions update annually and regulatory
dates have been subject to amendment.

| Claim | Source to confirm against |
|---|---|
| 19.7% of recommended packages don't exist; 21.7% open-source vs. 5.2% commercial; 205k unique names; 43% recur across runs | Spracklen et al., *"We Have a Package for You!"* — USENIX Security 2025 |
| $4.44M global / $10.22M US average breach cost; 13% breached AI models or apps; 97% lacked AI access controls; 63% no AI governance policy; +$670K shadow AI | IBM *Cost of a Data Breach Report 2025* (Ponemon) |
| Prompt injection ranked LLM01 | OWASP *Top 10 for LLM Applications* |
| CRA Article 14 reporting (24h/72h) from 11 Sep 2026; full application 11 Dec 2027 | EU Cyber Resilience Act, official text / Commission guidance |
| EU AI Act GPAI obligations in force | EU AI Act implementation timeline — **re-check, this has been amended** |
| Incident details (Rules File Backdoor, EchoLeak / CVE-2025-32711, Nx "s1ngularity") | Original vendor and researcher write-ups |

The two bar charts on slide 6 (**output vs. review capacity**) are explicitly **illustrative** and
labelled as such on-slide — substitute your own delivery metrics before presenting.

## Files

- `index.html` / `ai-risk.dc.html` — identical content; `ai-risk.dc.html` is the editable source for
  round-tripping through [Claude Design](https://claude.ai/design), `index.html` is the same file so
  the topic follows this repo's `index.html`-as-entry-point convention.
- `support.js` — the generated `.dc.html` runtime (parses the `<x-dc>` template, applies props)
- `deck-stage.js` — the reusable `<deck-stage>` web component (keyboard nav, speaker notes, auto-scaling)
- `_ds/acme-design-system-*/` — the ACME design system this deck is built on: tokens (`tokens/acme.css`,
  `tokens/fonts.css`) and a small React component bundle (`_ds_bundle.js`)

## Editable knobs

The deck exposes three props via the Claude Design properties panel (see the `data-props` block at
the foot of the HTML): **accent** colour, **title size**, and a **show sources** toggle that hides
every on-slide citation line for a cleaner board-level read.
