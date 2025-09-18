"""Inject Apple-friendly meta tags and icon references into HTML files."""

from __future__ import annotations

import json
import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "assets" / "icons"
ICON_DATA = json.loads((ICON_DIR / "icon-data.json").read_text())

APPLE_BLOCK_RE = re.compile(
    r"\s*<!-- Apple PWA \+ Safari enhancements -->.*?<!-- End Apple PWA \+ Safari enhancements -->\s*",
    re.DOTALL,
)
THEME_META_RE = re.compile(r"<meta[^>]+name=\"theme-color\"[^>]*>", re.IGNORECASE)
THEME_CONTENT_RE = re.compile(r"content=\"([^\"]+)\"")


def compute_theme_color(contents: str) -> tuple[str, str]:
    match = THEME_META_RE.search(contents)
    if not match:
        return contents, "#111217"
    tag = match.group(0)
    contents = contents.replace(tag, "")
    color_match = THEME_CONTENT_RE.search(tag)
    return contents, color_match.group(1) if color_match else "#111217"


def build_meta_block(target: Path, theme_color: str) -> str:
    icon_rel = Path(os.path.relpath(ICON_DIR, target.parent)).as_posix()
    manifest_href = f"{icon_rel}/site.webmanifest"
    mask_icon_href = f"{icon_rel}/safari-pinned-tab.svg"
    ms_config_href = f"{icon_rel}/browserconfig.xml"

    lines = [
        "  <!-- Apple PWA + Safari enhancements -->",
        "  <!-- Favicons are delivered inline so Git diffs stay text-only -->",
        f'  <link rel="icon" type="image/png" sizes="32x32" href="{ICON_DATA['icon32']}">',
        f'  <link rel="icon" type="image/png" sizes="16x16" href="{ICON_DATA['icon16']}">',
        f'  <link rel="shortcut icon" href="{ICON_DATA['icon48']}">',
        f'  <link rel="apple-touch-icon" sizes="120x120" href="{ICON_DATA['icon120']}">',
        f'  <link rel="apple-touch-icon" sizes="152x152" href="{ICON_DATA['icon152']}">',
        f'  <link rel="apple-touch-icon" sizes="180x180" href="{ICON_DATA['icon180']}">',
        f'  <link rel="apple-touch-icon" sizes="192x192" href="{ICON_DATA['icon192']}">',
        f'  <link rel="manifest" href="{manifest_href}">',
        '  <meta name="apple-mobile-web-app-capable" content="yes">',
        '  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
        '  <meta name="apple-mobile-web-app-title" content="Daren Prince">',
        '  <meta name="format-detection" content="telephone=no">',
        f'  <link rel="mask-icon" href="{mask_icon_href}" color="#32ff7b">',
        f'  <meta name="theme-color" content="{theme_color}">',
        f'  <meta name="msapplication-TileColor" content="{theme_color}">',
        f'  <meta name="msapplication-config" content="{ms_config_href}">',
        "  <!-- End Apple PWA + Safari enhancements -->",
    ]
    return "\n".join(lines)


def inject_into_file(path: Path) -> None:
    contents = path.read_text(encoding="utf-8")
    contents = APPLE_BLOCK_RE.sub("\n", contents)
    if "</head>" not in contents:
        return
    contents, theme_color = compute_theme_color(contents)
    meta_block = build_meta_block(path, theme_color)
    contents = contents.replace("</head>", f"{meta_block}\n</head>", 1)
    path.write_text(contents, encoding="utf-8")


def main() -> None:
    html_files = [
        path
        for path in ROOT.rglob("*.html")
        if not any(part in {"node_modules", "public", "supabase"} for part in path.parts)
    ]
    for html_file in html_files:
        inject_into_file(html_file)


if __name__ == "__main__":
    main()
