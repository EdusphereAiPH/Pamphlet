# Pamphlet

A digital pamphlet for EduSphere AI, built for booth visitors who scan a QR code.
One QR, four audiences: the pamphlet reshapes itself around who's reading it.

## Run

```bash
npm install
npm run dev      # http://localhost:3000/p
npm run build    # production build — every route is prerendered
```

## Routes

| Route | What |
|---|---|
| `/` | Redirects to `/p` |
| `/p` | Landing + "What brings you here today?" role picker |
| `/p/{owner,teacher,government,investor,everyone}` | Audience tracks (static) |
| `/api/scan` | Scan and view logging (POST) |

The QR code encodes `/p?s=<placement>` — `s` tags which physical placement
(booth, flyer, standee) the scan came from and is persisted for the session.

## Where things live

- `content/` — all copy as typed data. **Every claim traces to edusphere-ai.com.** Edit wording here, not in components.
- `components/` — UI. `Section` renders one content block; `AudiencePicker` is the landing's spine.
- `lib/analytics.ts` — fire-and-forget event beacon.
- `app/globals.css` — brand tokens (Inter + Instrument Serif, ink/paper palette, radii) lifted from the main site.

## Stack

Next.js 16 (App Router, Turbopack), Tailwind v4, `motion`. Deploys to Vercel.
