// Renders each /panels/<face> route to a WebP texture and extracts hotspot rectangles.
//
//   npm run dev            # in another terminal
//   npm run panels         # → public/panels/<face>.webp + content/hotspot-rects.json
//
// Textures are 1024×2172 (512×1086 CSS px at 2×). Rects are fractions of the panel
// measured from the top-left, so they're resolution-independent.

import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.PANELS_BASE ?? "http://localhost:3000";
const FACES = ["front", "flap", "inside-a", "inside-b", "inside-c", "back"];
const W = 512;
const H = 1086;
const SCALE = 2;
const QUALITY = 88;

const outDir = path.resolve("public/panels");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });

const rects = {};
let overflowed = false;

for (const face of FACES) {
  const page = await ctx.newPage();
  await page.goto(`${BASE}/panels/${face}`, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
  });

  const panel = page.locator("[data-panel]");
  const box = await panel.boundingBox();
  const scrollH = await panel.evaluate((el) => el.scrollHeight);
  if (scrollH > H + 1) {
    overflowed = true;
    console.warn(`!! ${face}: content overflows the panel by ${scrollH - H}px`);
  }

  const png = await page.screenshot({ type: "png", clip: { x: box.x, y: box.y, width: W, height: H } });
  const file = path.join(outDir, `${face}.webp`);
  const info = await sharp(png).webp({ quality: QUALITY }).toFile(file);

  rects[face] = await page.evaluate(
    ([w, h]) =>
      [...document.querySelectorAll("[data-hotspot]")].map((el) => {
        const r = el.getBoundingClientRect();
        return {
          id: el.getAttribute("data-hotspot"),
          x: +(r.left / w).toFixed(4),
          y: +(r.top / h).toFixed(4),
          w: +(r.width / w).toFixed(4),
          h: +(r.height / h).toFixed(4),
        };
      }),
    [W, H],
  );

  console.log(`${face.padEnd(9)} ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB  hotspots=${rects[face].length}`);
  await page.close();
}

await browser.close();
await writeFile(path.resolve("content/hotspot-rects.json"), JSON.stringify(rects, null, 2) + "\n");
console.log("wrote content/hotspot-rects.json");
if (overflowed) {
  console.error("Some faces overflow — fix the layout and re-run.");
  process.exit(1);
}
