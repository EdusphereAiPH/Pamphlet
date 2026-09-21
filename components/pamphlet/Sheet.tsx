"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { HOTSPOT_BY_ID } from "@/content/hotspots";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Sheet({ id, onClose }: { id: string | null; onClose: () => void }) {
  const h = id ? HOTSPOT_BY_ID[id] : undefined;
  return (
    <AnimatePresence>
      {h && (
        <motion.aside
          key={h.id}
          role="dialog"
          aria-label={h.title}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-30 mx-auto max-h-[52svh] w-full max-w-[720px] overflow-y-auto rounded-t-card bg-paper px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 text-ink shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-pill bg-ink/15" />
          <div className="flex items-start justify-between gap-4">
            <div>
              {h.eyebrow && <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/55">{h.eyebrow}</p>}
              <h2 className="mt-2 text-[1.6rem] font-semibold leading-[1.05] tracking-[-0.04em]">{h.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-ink/[0.06] text-lg hover:bg-ink/10"
            >
              ×
            </button>
          </div>

          {h.quote && <p className="accent-serif mt-4 text-lg leading-snug text-ink/80">“{h.quote}”</p>}
          <p className="mt-3 text-[16px] leading-relaxed text-ink/80">{h.body}</p>

          {h.links && (
            <div className="mt-4 flex flex-col gap-2">
              {h.links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={`inline-flex h-12 items-center justify-between rounded-pill px-5 font-medium ${
                    i === 0 ? "bg-ink text-paper hover:bg-black" : "bg-ink/[0.06] text-ink hover:bg-ink/10"
                  }`}
                >
                  <span className="truncate">{l.label}</span>
                  <span aria-hidden className={`ml-3 shrink-0 ${i === 0 ? "text-paper/60" : "text-ink/50"}`}>{l.href.startsWith("mailto:") ? "✉" : "↗"}</span>
                </a>
              ))}
            </div>
          )}

          {h.stats && (
            <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {h.stats.map((s) => (
                <div key={s.label} className="rounded-panel bg-ink/[0.05] p-3">
                  <dd className="text-2xl font-semibold leading-none tracking-[-0.04em]">{s.value}</dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-wider text-ink/55">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}

          {h.bullets && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {h.bullets.map((b) => (
                <li key={b} className="rounded-pill bg-ink/[0.06] px-3 py-1.5 text-sm">
                  {b}
                </li>
              ))}
            </ul>
          )}

          {h.image && (
            <div className="mt-4 overflow-hidden rounded-panel bg-ink">
              <Image src={h.image} alt="" width={1200} height={560} sizes="(max-width: 720px) 100vw, 720px" className="h-auto w-full" />
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-pill bg-ink font-medium text-paper hover:bg-black"
          >
            ← Back to the pamphlet
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
