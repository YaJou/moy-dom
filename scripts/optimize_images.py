#!/usr/bin/env python3
"""Сжатие public/images для статического экспорта (без Image Optimizer)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1] / "public" / "images"

# Макс. длинная сторона / качество
JPEG_MAX = 1600
JPEG_QUALITY = 76
PNG_MAX = 1400
PNG_JPEG_QUALITY = 78  # фото-PNG → JPEG
LOGO_WIDTH = 480


def is_logo(path: Path) -> bool:
    return path.name.lower().startswith("krovservice-logo")


def optimize_jpeg(path: Path, max_edge: int = JPEG_MAX, quality: int = JPEG_QUALITY) -> tuple[int, int]:
    before = path.stat().st_size
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode not in ("RGB", "L"):
            im = im.convert("RGB")
        elif im.mode == "L":
            im = im.convert("RGB")
        w, h = im.size
        scale = min(1.0, max_edge / max(w, h))
        if scale < 1.0:
            im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        tmp = path.with_suffix(path.suffix + ".tmp")
        im.save(
            tmp,
            "JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
            subsampling=2,
        )
    tmp.replace(path)
    after = path.stat().st_size
    return before, after


def png_to_jpeg(path: Path, max_edge: int = PNG_MAX, quality: int = PNG_JPEG_QUALITY) -> tuple[int, int, Path]:
    """Конвертирует фото-PNG в JPEG рядом (тот же stem)."""
    before = path.stat().st_size
    out = path.with_suffix(".jpg")
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode in ("RGBA", "LA", "P"):
            bg = Image.new("RGB", im.size, (255, 255, 255))
            if im.mode == "P":
                im = im.convert("RGBA")
            bg.paste(im, mask=im.split()[-1] if im.mode in ("RGBA", "LA") else None)
            im = bg
        elif im.mode != "RGB":
            im = im.convert("RGB")
        w, h = im.size
        scale = min(1.0, max_edge / max(w, h))
        if scale < 1.0:
            im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        im.save(out, "JPEG", quality=quality, optimize=True, progressive=True, subsampling=2)
    after = out.stat().st_size
    path.unlink(missing_ok=True)
    return before, after, out


def optimize_logo(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode not in ("RGBA", "RGB"):
            im = im.convert("RGBA")
        w, h = im.size
        if w > LOGO_WIDTH:
            nh = int(h * (LOGO_WIDTH / w))
            im = im.resize((LOGO_WIDTH, nh), Image.Resampling.LANCZOS)
        # WebP + маленький PNG
        webp = path.with_suffix(".webp")
        im.save(webp, "WEBP", quality=85, method=6)
        tmp = path.with_suffix(".png.tmp")
        im.save(tmp, "PNG", optimize=True)
        tmp.replace(path)
    after = path.stat().st_size
    return before, after


def main() -> None:
    saved = 0
    touched = 0
    renames: list[tuple[str, str]] = []

    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        ext = path.suffix.lower()
        if ext not in {".jpg", ".jpeg", ".png"}:
            continue
        # skip already tiny
        if path.stat().st_size < 80_000 and ext in {".jpg", ".jpeg"} and not is_logo(path):
            continue

        try:
            if is_logo(path) and ext == ".png":
                b, a = optimize_logo(path)
                print(f"LOGO {path.relative_to(ROOT)}: {b/1024:.0f}→{a/1024:.0f} KB")
            elif ext in {".jpg", ".jpeg"}:
                b, a = optimize_jpeg(path)
                print(f"JPG  {path.relative_to(ROOT)}: {b/1024:.0f}→{a/1024:.0f} KB")
            elif ext == ".png":
                # photo-like PNGs → JPEG
                b, a, out = png_to_jpeg(path)
                rel_old = str(path.relative_to(ROOT)).replace("\\", "/")
                rel_new = str(out.relative_to(ROOT)).replace("\\", "/")
                renames.append((rel_old, rel_new))
                print(f"PNG→JPG {rel_old}: {b/1024:.0f}→{a/1024:.0f} KB")
            else:
                continue
            saved += max(0, b - a)
            touched += 1
        except Exception as e:
            print(f"FAIL {path}: {e}")

    map_path = ROOT.parent.parent / "scripts" / "_image_renames.txt"
    map_path.write_text("\n".join(f"{a}\t{b}" for a, b in renames), encoding="utf-8")
    print(f"\nTouched {touched} files, saved ~{saved/1024/1024:.1f} MB")
    print(f"Renames written to {map_path}")


if __name__ == "__main__":
    main()
