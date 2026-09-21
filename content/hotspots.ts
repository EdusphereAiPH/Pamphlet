// What the sheet shows when a hotspot is tapped. Keyed by the `data-hotspot` id in the panel HTML.
import { SITE } from "./site";

export type FaceId = "front" | "flap" | "inside-a" | "inside-b" | "inside-c" | "back";

export type Hotspot = {
  id: string;
  face: FaceId;
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: readonly string[];
  stats?: readonly { value: string; label: string }[];
  image?: string;
  quote?: string;
  links?: readonly { label: string; href: string }[];
};

const T = SITE.teacher;
const O = SITE.os;
const R = SITE.trust;
const S = SITE.services;

export const HOTSPOTS: Hotspot[] = [
  { id: "platform", face: "front", eyebrow: "EduSphere AI", title: SITE.tagline, body: SITE.description },
  { id: "st-clare", face: "front", eyebrow: "Live today", title: `${SITE.proof.school} · ${SITE.proof.headline}`, body: "Running on EduSphere today.", stats: SITE.proof.stats },

  { id: "idea", face: "flap", eyebrow: SITE.idea.eyebrow, title: SITE.idea.heading, body: `${SITE.idea.body} ${O.body}` },
  ...R.pillars.map((p) => ({ id: p.id, face: "flap" as const, eyebrow: R.eyebrow, title: p.lead, body: p.body, bullets: [p.tag] })),

  ...T.steps.map((s) => ({ id: `step-${s.n}`, face: "inside-a" as const, eyebrow: `Step ${s.n} · ${T.eyebrow}`, title: s.title, body: s.body, image: s.image })),
  { id: "taglish", face: "inside-a", eyebrow: "AI Teacher Mode", title: T.demo.objective, body: `${T.demo.studentAsk} — ${T.demo.reply}`, quote: T.demo.quote, bullets: T.demo.chips },

  ...O.systems.map((s) => ({ id: s.id, face: "inside-b" as const, eyebrow: s.title, title: s.lead, body: s.body, stats: "stats" in s ? s.stats : undefined })),

  ...S.categories.map((c) => ({ id: c.id, face: "inside-c" as const, eyebrow: `${S.eyebrow} · ${c.letter}`, title: c.title, body: S.body, bullets: c.items })),
  { id: "pricing", face: "inside-c", eyebrow: SITE.pricing.eyebrow, title: SITE.pricing.heading, body: SITE.pricing.body, quote: SITE.pricing.quote, bullets: SITE.pricing.points.map((p) => `${p.title} — ${p.body}`) },

  {
    id: "contact",
    face: "back",
    eyebrow: SITE.close.heading,
    title: SITE.close.write,
    body: SITE.close.body,
    links: [
      { label: SITE.contactEmail, href: `mailto:${SITE.contactEmail}?subject=${encodeURIComponent("EduSphere AI — inquiry")}` },
      { label: SITE.urlLabel, href: SITE.url },
      { label: "Facebook", href: SITE.facebook },
    ],
    bullets: [SITE.footerLine],
  },
];

export const HOTSPOT_BY_ID: Record<string, Hotspot> = Object.fromEntries(HOTSPOTS.map((h) => [h.id, h]));

export const FACES: FaceId[] = ["front", "flap", "inside-a", "inside-b", "inside-c", "back"];
