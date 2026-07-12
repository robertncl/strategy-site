# Own the Weights

Pitch deck: self-host open-weight models (DeepSeek, Qwen, Kimi, gpt-oss, Llama, Mistral)
on **Azure AI Foundry** (serverless + managed compute) and **local hardware** to

1. fix the token-cost problem of agentic AI — agents burn 10–100× the tokens of chat,
   and per-token frontier pricing scales linearly with success; and
2. hedge the geopolitical access risk of depending on closed models in either the US
   or China — downloaded weights are irrevocable and jurisdiction-portable.

## Files

- `index.html` + `styles.css` + `app.js` — the deck (13 slides, scroll-snap, keyboard nav)
- `ai-single.html` — self-contained build (fonts, CSS, JS inlined; works offline)

Open `index.html` in a browser, or serve the folder with any static server.
Regenerate `ai-single.html` after editing the source files by re-inlining
`styles.css` and `app.js` (fonts are embedded as data URIs).

All cost figures in the deck are labeled illustrative — directional planning
numbers, not quotes.
