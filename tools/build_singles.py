#!/usr/bin/env python3
"""Rebuild the self-contained "single" HTML file for each deck.

A single is its deck's index.html with every local stylesheet and script
inlined, and the Modernist design system's fonts embedded as data URIs, so it
works offline as one file (email it, open it from a USB stick).

    python3 tools/build_singles.py            # rebuild all singles
    python3 tools/build_singles.py AI CDE     # rebuild just these decks

Run it after editing a deck's index.html, styles.css or app.js, or after
updating _modernist/.
"""
import base64
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# deck folder -> single file name
SINGLES = {
    "AI": "ai-single.html",
    "foundry": "foundry-single.html",
    "copilot-sandbox": "copilot-sandbox-single.html",
    "sandbox": "sandbox-single.html",
    "agentic": "agentic-single.html",
    "CDE": "cde-single.html",
    "chainguard": "chainguard-single.html",
}

NOTE = ("<!-- Self-contained build: fonts, styles, and script inlined. "
        "Source of truth: index.html + its stylesheets + scripts. "
        "Regenerate with: python3 tools/build_singles.py -->")


def inline_fonts(css: str, base: Path) -> str:
    """Replace url("fonts/x.woff2") with a base64 data URI."""
    def repl(m):
        path = base / m.group(1)
        data = base64.b64encode(path.read_bytes()).decode("ascii")
        return f'url("data:font/woff2;base64,{data}")'
    return re.sub(r'url\("([^"]+\.woff2)"\)', repl, css)


def safe_style(css: str) -> str:
    return css.replace("</style", "<\\/style")


def safe_script(js: str) -> str:
    return js.replace("</script", "<\\/script")


def build(deck: str) -> Path:
    deck_dir = ROOT / deck
    html = (deck_dir / "index.html").read_text(encoding="utf-8")

    def link(m):
        href = m.group(1)
        if href.startswith(("http:", "https:", "//")):
            return m.group(0)
        path = (deck_dir / href).resolve()
        css = path.read_text(encoding="utf-8")
        if path.name == "tokens.css":
            css = inline_fonts(css, path.parent)
        return f"<style>\n{safe_style(css)}\n</style>"

    def script(m):
        src = m.group(1)
        if src.startswith(("http:", "https:", "//")):
            return m.group(0)
        js = (deck_dir / src).read_text(encoding="utf-8")
        return f"<script>\n{safe_script(js)}\n</script>"

    html, n_css = re.subn(r'<link rel="stylesheet" href="([^"]+)"\s*/?>', link, html)
    html, n_js = re.subn(r'<script src="([^"]+)"(?:\s+defer)?\s*></script>', script, html)
    html = re.sub(r'(<meta charset="UTF-8"\s*/?>)', r"\1\n  " + NOTE, html, count=1)

    out = deck_dir / SINGLES[deck]
    out.write_text(html, encoding="utf-8")
    print(f"{out.relative_to(ROOT)}: {n_css} stylesheet(s), {n_js} script(s) inlined, "
          f"{out.stat().st_size // 1024} KB")
    return out


if __name__ == "__main__":
    decks = sys.argv[1:] or list(SINGLES)
    for d in decks:
        if d not in SINGLES:
            sys.exit(f"unknown deck {d!r}; choose from {', '.join(SINGLES)}")
        build(d)
