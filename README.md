# Pamphlet

EduSphere AI's digital pamphlet for booth visitors who scan a QR code: a 3D tri-fold
they can turn, fold and tap, carrying everything on edusphere-ai.com.

## Run

```bash
npm install
npm run dev        # http://localhost:3000/p
npm run panels     # re-render panel textures + hotspot rects (dev server must be running)
npm run build      # production build
```

## How it's put together

**Panel artwork is HTML.** Each of the six faces is a React component in
`components/panels/` laid out at 512×1086 CSS px (a 99×210 mm tri-fold panel) using the
site's fonts and tokens. They're served at `/panels/<face>` (noindex) purely so that
`scripts/render-panels.mjs` can screenshot them into `public/panels/<face>.webp`.

**Hotspots come from the same HTML.** Any element with `data-hotspot="id"` becomes a
tappable region; the render script measures it and writes `content/hotspot-rects.json`.
Because positions are extracted, not hand-typed, they can't drift from the design.
What the sheet says for each id lives in `content/hotspots.ts`.

**The 3D scene** (`components/pamphlet/`) is React Three Fiber:

- `Pamphlet.tsx` — three thin boxes on hinges. Panel A (cover) folds over last; C folds
  first. Six-material arrays put the right face on each side.
- `CameraRig.tsx` — drives the camera on state changes (fold, flip, focus), fitting the
  pamphlet between the HUD's header and controls, then hands back to OrbitControls.
- `Hud.tsx` / `Sheet.tsx` — DOM overlays: Open/Close · Flip · Reset, and the info sheet.
- `FlatPamphlet.tsx` — no-WebGL fallback: the six textures stacked, same hotspots.

**Copy** lives in `content/site.ts`. Every line traces to edusphere-ai.com.

## Routes

| Route | What |
|---|---|
| `/` | Redirects to `/p` |
| `/p` | The pamphlet (static shell; scene loads client-side) |
| `/panels/<face>` | Source artwork for textures (not linked) |
| `/api/scan` | Scan and interaction logging (POST) |

The QR encodes `/p?s=<placement>`; `s` tags which physical placement the scan came
from and is persisted for the session.

## QR print assets

`npm run qr` reads `content/event.json` (event name, date, base URL, placements) and
writes `print/qr/<placement>.{svg,png}` plus an A4 sheet, `print/qr-sheet.{html,pdf}`,
one page per placement. `SITE_URL=https://… npm run qr` overrides the base URL.

## Hosting

Railway, project `lovely-generosity`, service `Pamphlet`, deployed from `main`.
Set `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL` on the service.

## Environment

See `.env.example`. `DATABASE_URL` uses a dedicated insert-only Postgres role through
the Supabase pooler; the project's Data API is intentionally closed.
