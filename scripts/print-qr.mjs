// Generates the QR print assets: the QR code (SVG + PNG) and an A4 sheet (HTML + PDF)
// with the event name and date from content/event.json.
//
//   npm run qr                      # uses baseUrl from content/event.json
//   SITE_URL=https://… npm run qr   # override the URL the QR codes point at
//
// The QR encodes `${baseUrl}/p`.
import { chromium } from "playwright";
import QRCode from "qrcode";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const event = JSON.parse(readFileSync(path.join(root, "content/event.json"), "utf8"));
const baseUrl = (process.env.SITE_URL || event.baseUrl).replace(/\/$/, "");
const outDir = path.join(root, "print");
const qrDir = path.join(outDir, "qr");
mkdirSync(qrDir, { recursive: true });

const mark = readFileSync(path.join(root, "public/brand/edusphere-mark-black.png")).toString("base64");
const qrOpts = { errorCorrectionLevel: "Q", margin: 1, color: { dark: "#09090b", light: "#ffffff" } };

const url = `${baseUrl}/p`;
const svg = await QRCode.toString(url, { ...qrOpts, type: "svg" });
writeFileSync(path.join(qrDir, "pamphlet.svg"), svg);
await QRCode.toFile(path.join(qrDir, "pamphlet.png"), url, { ...qrOpts, width: 2048 });
const cards = [{ url, svg }];
console.log(url);

const page = (c) => `
<section class="page">
  <header>
    <span class="brand"><i class="mark"></i>EduSphere <span class="ai">AI</span></span>
    <span class="eyebrow">${event.name} · ${event.date}</span>
  </header>
  <main>
    <h1>Scan to open<br /><em>the pamphlet.</em></h1>
    <p class="lead">Turn it, unfold it, tap anything to learn more. One platform. Complete school intelligence.</p>
    <div class="qr">${c.svg}</div>
    <p class="url">${c.url.replace(/^https?:\/\//, "")}</p>
  </main>
  <footer>
    <span>edusphere-ai.com</span>
    <span class="dim">${event.date}</span>
  </footer>
</section>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>EduSphere AI — pamphlet QR sheet</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: #fff; color: #09090b; font-family: Inter, system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; height: 297mm; padding: 18mm 20mm; display: flex; flex-direction: column; page-break-after: always; break-after: page; }
  header, footer { display: flex; justify-content: space-between; align-items: center; font-size: 11pt; }
  .brand { display: inline-flex; align-items: center; gap: 7px; font-weight: 600; letter-spacing: -0.02em; }
  .brand .ai { font-size: 8pt; font-weight: 500; line-height: 1.5; padding: 0 4px; border: 1px solid rgba(9,9,11,.4); border-radius: 4px; letter-spacing: 0; }
  .brand .mark { display: inline-block; height: 22px; width: 27px; background: url(data:image/png;base64,${mark}) center / contain no-repeat; }
  .dim { color: #6e6e73; }
  .eyebrow { font-size: 9.5pt; letter-spacing: 0.14em; text-transform: uppercase; color: #6e6e73; }
  main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 8mm; }
  h1 { font-family: "Instrument Serif", serif; font-weight: 400; font-size: 44pt; line-height: 1.02; letter-spacing: -0.02em; margin: 0; }
  h1 em { font-style: italic; color: #3a3a40; }
  .lead { max-width: 120mm; margin: 0; font-size: 12pt; line-height: 1.5; color: #6e6e73; }
  .qr { width: 96mm; height: 96mm; padding: 6mm; border: 1px solid #d9d9df; border-radius: 22px; }
  .qr svg { width: 100%; height: 100%; display: block; }
  .url { margin: 0; font-size: 10.5pt; color: #6e6e73; letter-spacing: 0.01em; }
  footer { border-top: 1px solid #d9d9df; padding-top: 5mm; font-size: 9.5pt; }
</style>
</head>
<body>${cards.map(page).join("\n")}</body>
</html>`;

writeFileSync(path.join(outDir, "qr-sheet.html"), html);

const browser = await chromium.launch();
const pg = await browser.newPage();
await pg.setContent(html, { waitUntil: "networkidle" });
await pg.evaluate(() => document.fonts.ready);
await pg.pdf({ path: path.join(outDir, "qr-sheet.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("wrote print/qr/pamphlet.{svg,png}, print/qr-sheet.{html,pdf}");
