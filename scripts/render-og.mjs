// Renders the link-preview image (public/og.png, 1200×630 @2x): the closed 3D pamphlet
// captured from the running app, composed with the wordmark and headline.
//   npm run dev   (in another terminal)   then   npm run og
import { chromium } from "playwright";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const BASE = process.env.BASE_URL || "http://localhost:3000";

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const scene = await browser.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 2 });
await scene.goto(`${BASE}/p`, { waitUntil: "load" });
await scene.getByRole("button", { name: "Open" }).waitFor({ timeout: 90000 });
await scene.addStyleTag({ content: "header, nav, [role=status], p.fixed { display: none !important }" });
await scene.waitForTimeout(3500);
const raw = await scene.screenshot();
// Trim the black surround so only the pamphlet remains.
const pamphlet = await sharp(raw).trim({ background: "#09090b", threshold: 12 }).png().toBuffer();
const pamphletB64 = pamphlet.toString("base64");
const mark = readFileSync(path.join(root, "public/brand/edusphere-mark-white.png")).toString("base64");

const html = `<!doctype html><html><head><meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: radial-gradient(55% 90% at 78% 50%, #1e2126 0%, #09090b 72%); color: #f5f5f7; font-family: Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased; overflow: hidden; }
  .card { position: relative; height: 100%; padding: 64px 72px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 12px; font-size: 24px; font-weight: 600; letter-spacing: -0.02em; }
  .brand img { height: 40px; width: auto; }
  .ai { font-size: 15px; font-weight: 500; line-height: 1.5; padding: 0 7px; border: 1.5px solid rgba(245,245,247,.4); border-radius: 7px; letter-spacing: 0; }
  h1 { margin-top: auto; font-size: 72px; line-height: .96; letter-spacing: -0.055em; font-weight: 600; max-width: 640px; }
  h1 em { font-family: "Instrument Serif", serif; font-style: italic; font-weight: 400; font-size: 1.08em; letter-spacing: -0.02em; color: #a1a1a6; }
  .lead { margin-top: 24px; font-size: 22px; line-height: 1.45; color: #a1a1a6; max-width: 560px; }
  .foot { margin-top: 36px; font-size: 17px; color: #6e6e73; }
  .shot { position: absolute; right: 88px; top: 50%; transform: translateY(-50%) rotate(-4deg); height: 560px; width: auto; filter: drop-shadow(0 40px 60px rgba(0,0,0,.7)); }
</style></head><body><div class="card">
  <div class="brand"><img src="data:image/png;base64,${mark}" />EduSphere <span class="ai">AI</span></div>
  <h1>Open<br /><em>the pamphlet.</em></h1>
  <p class="lead">A 3D pamphlet you can turn, unfold and tap. One platform. Complete school intelligence.</p>
  <p class="foot">edusphere-ai.com · Built in the Philippines for schools</p>
  <img class="shot" src="data:image/png;base64,${pamphletB64}" />
</div></body></html>`;

const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, "public/og.png") });
await browser.close();
console.log("wrote public/og.png");
