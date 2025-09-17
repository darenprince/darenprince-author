"""Inject Apple-friendly meta tags and icon references into HTML files."""

from __future__ import annotations

import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ICON_DIR = ROOT / "assets" / "icons"
APPLE_SPLASH_MEDIA = {
    "apple-splash-2048x2732.png": "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    "apple-splash-1668x2388.png": "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    "apple-splash-1536x2048.png": "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    "apple-splash-1290x2796.png": "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    "apple-splash-1179x2556.png": "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    "apple-splash-1170x2532.png": "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    "apple-splash-1242x2688.png": "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    "apple-splash-1242x2208.png": "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    "apple-splash-1125x2436.png": "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
    "apple-splash-828x1792.png": "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    "apple-splash-750x1334.png": "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
    "apple-splash-640x1136.png": "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
}


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
    def href(name: str) -> str:
        return f"{icon_rel}/{name}"

    lines = [
        "  <!-- Apple PWA + Safari enhancements -->",
        '  <meta name="apple-mobile-web-app-capable" content="yes">',
        '  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
        '  <meta name="apple-mobile-web-app-title" content="Daren Prince">',
        '  <meta name="format-detection" content="telephone=no">',
        f'  <link rel="apple-touch-icon" sizes="180x180" href="{href("apple-touch-icon-180.png")}">',
        f'  <link rel="apple-touch-icon" sizes="167x167" href="{href("apple-touch-icon-167.png")}">',
        f'  <link rel="apple-touch-icon" sizes="152x152" href="{href("apple-touch-icon-152.png")}">',
        f'  <link rel="apple-touch-icon" sizes="120x120" href="{href("apple-touch-icon-120.png")}">',
        f'  <link rel="mask-icon" href="{href("safari-pinned-tab.svg")}" color="#7dde5b">',
        f'  <meta name="theme-color" content="{theme_color}">',
        f'  <meta name="msapplication-TileColor" content="{theme_color}">',
    ]
    for filename, media in APPLE_SPLASH_MEDIA.items():
        lines.append(
            f'  <link rel="apple-touch-startup-image" href="{href(filename)}" media="{media}">'  # noqa: E501
        )
    lines.append("  <!-- End Apple PWA + Safari enhancements -->")
    return "\n".join(lines)


def inject_into_file(path: Path) -> None:
    contents = path.read_text(encoding="utf-8")
    if "Apple PWA + Safari enhancements" in contents or "</head>" not in contents:
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
