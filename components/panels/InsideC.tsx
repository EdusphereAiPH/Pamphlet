import { SITE } from "@/content/site";
import { Eyebrow, Panel } from "./Panel";

export function InsideC() {
  const s = SITE.services;
  const p = SITE.pricing;
  return (
    <Panel tone="paper">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 className="mt-4 font-serif text-[44px] leading-[1.0] tracking-tight">{s.heading}</h2>
      <p className="mt-3 text-[16px] leading-[1.5] text-ink/70">{s.body}</p>

      <ul className="mt-6 flex flex-col gap-2">
        {s.categories.map((c) => (
          <li key={c.id} data-hotspot={c.id} className="flex gap-4 rounded-panel bg-black/[0.045] px-5 py-3.5">
            <span className="mt-0.5 font-serif text-[26px] leading-none text-ink/40">{c.letter}</span>
            <div>
              <p className="font-serif text-[22px] leading-tight">{c.title}</p>
              <ul className="mt-1.5 text-[13.5px] leading-[1.4] text-ink/70">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <div data-hotspot="pricing" className="mt-auto rounded-panel bg-ink p-5 text-paper">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-dark">{p.eyebrow}</p>
        <p className="mt-2 font-serif text-[26px] leading-tight">{p.heading}</p>
        <p className="mt-2 font-serif text-[17px] italic leading-snug text-paper/70">“{p.quote}”</p>
      </div>
    </Panel>
  );
}
