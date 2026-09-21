"use client";

// No-WebGL fallback: the six faces as flat images with the same tappable regions.

import Image from "next/image";
import rectsJson from "@/content/hotspot-rects.json";
import { FACES, type FaceId } from "@/content/hotspots";
import { FACE_TONE, TEXTURE_URL, type Rect } from "./geometry";

const RECTS = rectsJson as Record<FaceId, Rect[]>;
const LABEL: Record<FaceId, string> = {
  front: "Front cover",
  flap: "Inside flap",
  "inside-a": "Inside · 1",
  "inside-b": "Inside · 2",
  "inside-c": "Inside · 3",
  back: "Back cover",
};

export function FlatPamphlet({ onTap }: { onTap: (id: string) => void }) {
  return (
    <main className="mx-auto w-full max-w-[520px] px-4 pb-28 pt-20">
      <p className="mb-6 text-sm text-muted">Your browser can&apos;t show the 3D pamphlet, so here it is flat. Tap any dot.</p>
      <ol className="flex flex-col gap-6">
        {FACES.map((face) => (
          <li key={face}>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-dark">{LABEL[face]}</p>
            <div className="relative overflow-hidden rounded-panel">
              <Image src={TEXTURE_URL(face)} alt={LABEL[face]} width={1024} height={2172} sizes="(max-width: 520px) 100vw, 520px" className="h-auto w-full" />
              {(RECTS[face] ?? []).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onTap(r.id)}
                  aria-label={`Open ${r.id}`}
                  className="absolute rounded-[10px] ring-1 ring-transparent transition-colors hover:ring-white/40 focus-visible:ring-white/60"
                  style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` }}
                >
                  <span
                    className={`absolute bottom-2 right-2 block h-3 w-3 rounded-full ring-2 ${
                      FACE_TONE[face] === "dark" ? "bg-paper ring-paper/30" : "bg-ink ring-ink/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
