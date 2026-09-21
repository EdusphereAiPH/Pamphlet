import Image from "next/image";
import type { Section as SectionData } from "@/content/types";
import { StatGrid } from "./StatGrid";

export function Section({ data }: { data: SectionData }) {
  return (
    <section className="rounded-card bg-surface p-6 ring-1 ring-white/[0.06] sm:p-8">
      {data.eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-dark">{data.eyebrow}</p>
      )}
      <h2 className="mt-3 font-serif text-[2rem] leading-[1.05] tracking-tight sm:text-4xl">
        {data.heading}
      </h2>
      <p className="mt-4 text-[17px] leading-relaxed text-paper/80">{data.body}</p>

      {data.quote && (
        <blockquote className="mt-5 border-l-2 border-white/15 pl-4">
          <p className="font-serif text-xl italic leading-snug text-paper/90">“{data.quote.text}”</p>
          {data.quote.attribution && (
            <footer className="mt-2 text-sm text-muted-dark">{data.quote.attribution}</footer>
          )}
        </blockquote>
      )}

      {data.bullets && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {data.bullets.map((b) => (
            <li key={b} className="rounded-pill bg-white/[0.06] px-3 py-1.5 text-sm text-paper/85">
              {b}
            </li>
          ))}
        </ul>
      )}

      {data.groups && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {data.groups.map((g) => (
            <div key={g.title} className="rounded-panel bg-white/[0.04] p-4">
              <h3 className="text-sm font-medium">{g.title}</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-dark">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.stats && <StatGrid stats={data.stats} className="mt-6" />}

      {data.image && (
        <div className="mt-6 overflow-hidden rounded-panel bg-black/40">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={1100}
            height={1100}
            sizes="(max-width: 720px) 100vw, 720px"
            className="h-auto w-full"
          />
        </div>
      )}
    </section>
  );
}
