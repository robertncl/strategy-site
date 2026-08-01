# Controlling GitHub Copilot — AI Agent Security Report

A single-page, framework-free **research report** on what AI gateways, MCP gateways,
sandboxes, GitHub-native policy and agent harnesses each cover — and don't — when
running GitHub Copilot's agentic surfaces (cloud agent, CLI, code review agent).

## Run it

It's static — no build step. Either open `index.html` directly, or serve it:

```bash
cd copilot-security
python3 -m http.server 8000
# → http://localhost:8000
```

## Contents

1. **Headline takeaways** — six load-bearing findings, each tagged by evidence strength
2. **Method** — scope and sourcing standard
3. **The incident record** — a table of nine months of working exploits (CamoLeak,
   Comment and Control, the Trivy→LiteLLM cascade, Semantic Kernel RCE, and more),
   plus a deep-dive on how the Copilot Agent exploit defeated three runtime defences
4. **Control planes** — why an LLM gateway, MCP gateway, sandbox and harness are not
   substitutes for one another
5. **GitHub-native controls** — what GitHub ships today, and the documented edges of
   each (the agent firewall, MCP policy, Copilot's own preview sandboxes)
6. **Gateways** — the AI-gateway and MCP-gateway landscape, and the Copilot-specific
   catch (a gateway can only govern traffic you can point at it)
7. **Sandboxes** — isolation primitives compared (containers, gVisor, Firecracker,
   Kata, V8 isolates) and what shipped for developer machines
8. **Harness** — why the harness is the only layer that can decline an action before
   it exists; hooks vs. permission prompts; identity and secrets hardening
9. **Threat → control matrix** — coverage rating (Primary / Partial / None) for eight
   threat categories across all five control layers, with the residual gap named
10. **Evidence gaps** — claims the report could *not* establish, stated plainly
11. **Sources** — 38 citations, primary vendor docs and disclosures preferred,
    vendor-published comparisons and unverified figures labelled as such

## ⚠️ About the content

This report is a **snapshot of documented behavior as of 31 July 2026**, compiled from
primary sources (vendor documentation, changelogs, the original researcher disclosure,
and a Cloud Security Alliance research note) where one exists, with secondary or
vendor-published claims explicitly labelled. Agentic tooling changes weekly — re-verify
anything you intend to rely on as a control before presenting or acting on it. No
architecture is recommended; the stance is neutral throughout.

## Files

- `index.html` — the complete report, self-contained (inline styles + a small
  embedded stylesheet for shared tokens/components — tags, tables, cards)

## Accessibility / robustness

- Fully static HTML — no JavaScript, works with scripting disabled.
- In-page citation anchors (`#s1`…`#s38`) link superscript references to the
  numbered source list.
- Responsive: the two-column (label + content) section layout collapses to a single
  column on narrow viewports; tables scroll horizontally rather than truncating.
