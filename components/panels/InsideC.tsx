import { SITE } from "@/content/site";
import { Eyebrow, Panel } from "./Panel";

export function InsideC() {
  const s = SITE.services;
  const p = SITE.pricing;
  return (
    <Panel tone="paper">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[40px] font-semibold leading-[0.96] tracking-[-0.05em]">{s.heading}</h2>
      <p className="mt-3 text-[16px] leading-[1.5] text-ink/70">{s.body}</p>

      <ul className="mt-6 flex flex-col gap-2">
        {s.categories.map((c) => (
          <li key={c.id} data-hotspot={c.id} className="flex gap-4 rounded-panel bg-black/[0.045] px-5 py-3.5">
            <span className="mt-0.5 text-[20px] font-medium leading-none tracking-[-0.02em] text-ink/40">{c.letter}</span>
            <div>
              <p className="text-[17px] font-semibold leading-tight tracking-[-0.02em]">{c.title}</p>
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
        <p className="mt-2 text-[22px] font-semibold leading-[1.1] tracking-[-0.035em]">{p.heading}</p>
        <p className="accent-serif mt-2 text-[15px] leading-snug text-paper/70">“{p.quote}”</p>
      </div>
    </Panel>
  );
}
