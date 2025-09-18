"""Generate Apple-specific icons and splash screens for the Daren Prince site."""

from __future__ import annotations

import base64
import io
import json
import mimetypes
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ICONS_DIR = ROOT / "assets" / "icons"
PAYLOAD_PATH = ICONS_DIR / "icon-data.json"


mimetypes.add_type("image/svg+xml", ".svg")


def _gradient_background(size: int) -> Image.Image:
    top_color = (26, 29, 39)
    bottom_color = (10, 12, 18)
    img = Image.new("RGB", (size, size))
    pixels = img.load()
    for y in range(size):
        ratio = y / (size - 1)
        r = int(top_color[0] * (1 - ratio) + bottom_color[0] * ratio)
        g = int(top_color[1] * (1 - ratio) + bottom_color[1] * ratio)
        b = int(top_color[2] * (1 - ratio) + bottom_color[2] * ratio)
        for x in range(size):
            pixels[x, y] = (r, g, b)
    return img


def _add_accent(draw: ImageDraw.ImageDraw, size: int) -> None:
    accent_color = (125, 222, 91, 230)
    overlay = Image.new("RGBA", (size, size))
    overlay_draw = ImageDraw.Draw(overlay)
    polygon = [
        (int(size * 0.08), int(size * 0.70)),
        (int(size * 0.38), int(size * 0.48)),
        (int(size * 0.62), int(size * 0.56)),
        (int(size * 0.92), int(size * 0.36)),
        (int(size * 0.82), int(size * 0.88)),
        (int(size * 0.20), int(size * 0.92)),
    ]
    overlay_draw.polygon(polygon, fill=accent_color)
    draw.bitmap((0, 0), overlay, fill=None)


def _draw_monogram(draw: ImageDraw.ImageDraw, size: int, font: ImageFont.FreeTypeFont) -> None:
    center = size // 2
    letter_color = (240, 241, 246)

    # Crown base
    crown_base_top = int(size * 0.17)
    crown_base_bottom = int(size * 0.30)
    crown_width = int(size * 0.42)
    crown_left = center - crown_width // 2
    crown_right = center + crown_width // 2

    crown = [
        (crown_left, crown_base_bottom),
        (crown_left + int(crown_width * 0.18), crown_base_top),
        (center, crown_base_bottom - int(size * 0.15)),
        (crown_right - int(crown_width * 0.18), crown_base_top),
        (crown_right, crown_base_bottom),
    ]
    draw.polygon(crown, fill=letter_color)
    draw.rectangle(
        (crown_left, crown_base_bottom - int(size * 0.035), crown_right, crown_base_bottom),
        fill=letter_color,
    )

    # The "D" letter
    draw.text((center, int(size * 0.60)), "D", font=font, fill=letter_color, anchor="mm")

    # Inner knockout stroke to echo brand styling
    stroke_font = ImageFont.truetype(font.path, int(font.size * 0.74))  # type: ignore[arg-type]
    draw.text(
        (center, int(size * 0.60)),
        "D",
        font=stroke_font,
        fill=(16, 18, 28),
        anchor="mm",
    )


def create_base_artwork(size: int = 3200) -> Image.Image:
    img = _gradient_background(size).convert("RGBA")
    draw = ImageDraw.Draw(img)
    _add_accent(draw, size)

    font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    font = ImageFont.truetype(font_path, int(size * 0.64))
    _draw_monogram(draw, size, font)
    return img


def save_touch_icons(base: Image.Image) -> dict[str, bytes]:
    ICONS_DIR.mkdir(parents=True, exist_ok=True)
    payload: dict[str, bytes] = {}
    for size in (512, 256, 180, 167, 152, 120):
        resized = base.resize((size, size), Image.LANCZOS)
        buffer = io.BytesIO()
        resized.save(buffer, format="PNG", optimize=True)
        data = buffer.getvalue()
        name = f"apple-touch-icon-{size}.png"
        (ICONS_DIR / name).write_bytes(data)
        payload[name] = data
    alias_data = payload["apple-touch-icon-180.png"]
    (ICONS_DIR / "apple-touch-icon.png").write_bytes(alias_data)
    payload["apple-touch-icon.png"] = alias_data
    return payload


def save_splash_screens(base: Image.Image, payload: dict[str, bytes]) -> None:
    splash_specs = [
        (2048, 2732),
        (1668, 2388),
        (1536, 2048),
        (1290, 2796),
        (1179, 2556),
        (1170, 2532),
        (1242, 2688),
        (1242, 2208),
        (1125, 2436),
        (828, 1792),
        (750, 1334),
        (640, 1136),
    ]
    for width, height in splash_specs:
        splash = ImageOps.fit(base, (width, height), method=Image.LANCZOS, centering=(0.5, 0.5))
        buffer = io.BytesIO()
        splash.save(buffer, format="PNG", optimize=True)
        data = buffer.getvalue()
        name = f"apple-splash-{width}x{height}.png"
        (ICONS_DIR / name).write_bytes(data)
        payload[name] = data


def save_mask_icon(payload: dict[str, bytes]) -> None:
    mask_svg = """<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1024 1024\">
  <path fill=\"#000\" d=\"M298 220h214c210 0 364 140 364 292 0 180-128 292-364 292H298z\" />
  <path fill=\"#000\" fill-rule=\"evenodd\" d=\"M374 312v400h96c142 0 226-80 226-200s-84-200-226-200z\" />
  <path fill=\"#000\" d=\"M292 220h82v584h-82z\" />
  <path fill=\"#000\" d=\"M312 340h260v88H312z\" />
  <path fill=\"#000\" d=\"M328 184h368l-48 176-132-108-128 108z\" />
</svg>
"""
    (ICONS_DIR / "safari-pinned-tab.svg").write_text(mask_svg, encoding="utf-8")
    payload["safari-pinned-tab.svg"] = mask_svg.encode("utf-8")


def write_payload(payload: dict[str, bytes]) -> None:
    def to_data_uri(name: str, data: bytes) -> str:
        mime_type, _ = mimetypes.guess_type(name)
        if not mime_type:
            mime_type = "application/octet-stream"
        encoded = base64.b64encode(data).decode("ascii")
        return f"data:{mime_type};base64,{encoded}"

    encoded = {name: to_data_uri(name, data) for name, data in sorted(payload.items())}
    PAYLOAD_PATH.write_text(json.dumps(encoded, indent=2), encoding="utf-8")


def main() -> None:
    base = create_base_artwork()
    payload = save_touch_icons(base)
    save_splash_screens(base, payload)
    save_mask_icon(payload)
    write_payload(payload)


if __name__ == "__main__":
    main()
