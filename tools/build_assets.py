from pathlib import Path
import subprocess
from PIL import Image
import math

# ==========================================================
# CHANGE ONLY THESE VALUES FOR EVERY NEW ANIMAL
# ==========================================================

ASSET = "whale"

KEY_R = 215
KEY_G = 177
KEY_B = 13

FPS = 12

# ==========================================================

ROOT = Path(__file__).resolve().parent.parent

VIDEO = ROOT / "src" / "assets" / "fauna" / f"{ASSET}.mp4"
FRAMES = ROOT / "src" / "assets" / "fauna" / f"{ASSET}_frames"
SPRITESHEET = ROOT / "src" / "assets" / "fauna" / f"{ASSET}_sheet.png"

FFMPEG = r"C:\Users\yash gawde\Downloads\ffmpeg-8.1.2-essentials_build\ffmpeg-8.1.2-essentials_build\bin\ffmpeg.exe"

FRAMES.mkdir(parents=True, exist_ok=True)

print(f"\n========== BUILDING {ASSET.upper()} ==========\n")

# ----------------------------------------------------------
# Extract Frames
# ----------------------------------------------------------

print("Extracting frames...")

subprocess.run([
    FFMPEG,
    "-y",
    "-i",
    str(VIDEO),
    "-vf",
    f"fps={FPS}",
    str(FRAMES / "frame_%04d.png")
], check=True)

# ----------------------------------------------------------
# Remove Background
# ----------------------------------------------------------

print("Removing background...")

for frame in sorted(FRAMES.glob("*.png")):

    img = Image.open(frame).convert("RGBA")
    pixels = img.load()

    width, height = img.size

    for y in range(height):
        for x in range(width):

            r, g, b, a = pixels[x, y]

            if (
                abs(r - KEY_R) < 35 and
                abs(g - KEY_G) < 35 and
                abs(b - KEY_B) < 35
            ):
                pixels[x, y] = (0, 0, 0, 0)

    img.save(frame)

# ----------------------------------------------------------
# Pack Sprite Sheet
# ----------------------------------------------------------

print("Packing sprite sheet...")

files = sorted(FRAMES.glob("*.png"))

sample = Image.open(files[0])

w, h = sample.size

cols = 10
rows = math.ceil(len(files) / cols)

sheet = Image.new(
    "RGBA",
    (cols * w, rows * h),
    (0, 0, 0, 0),
)

for i, frame in enumerate(files):

    img = Image.open(frame)

    x = (i % cols) * w
    y = (i // cols) * h

    sheet.paste(img, (x, y))

sheet.save(SPRITESHEET)

print("\n======================================")
print("Done!")
print("Frames :", len(files))
print("Sheet  :", SPRITESHEET)
print("======================================")