# Choosing an AI Gateway — market landscape 2026

Research deck comparing the top AI gateway products against three enterprise
requirements:

1. **Enterprise access control with Microsoft Entra ID** — SSO/SCIM on the
   control plane, JWT/OIDC on the data plane, managed identity to backends.
2. **GitHub Copilot integration (BYOK)** — routing Copilot chat/agent traffic
   through the gateway's OpenAI-compatible endpoint.
3. **Azure AI Foundry models** — first-class provider support for Foundry
   deployments.

Products covered: Azure API Management AI Gateway, LiteLLM, Portkey,
Kong AI Gateway, TrueFoundry, Bifrost (Maxim), Cloudflare AI Gateway.

## Files

- [index.html](index.html) — the presentation site (market context,
  requirements, product profiles, scorecard, recommendation, sources).
- [architecture.html](architecture.html) — the target-state architecture
  diagram: Azure API Management fronting every model call, Azure API Center
  for design-time governance.

Research compiled July 2026 from vendor docs, GitHub changelogs/community
discussions, and 2026 gateway market comparisons (full source list in the
deck's Sources section).
