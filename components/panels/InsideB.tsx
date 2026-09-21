import { SITE } from "@/content/site";
import { Eyebrow, Panel } from "./Panel";

export function InsideB() {
  const o = SITE.os;
  return (
    <Panel tone="paper">
      <Eyebrow>{o.eyebrow}</Eyebrow>
      <h2 className="mt-4 font-serif text-[46px] leading-[1.0] tracking-tight">{o.heading}</h2>
      <p className="mt-4 text-[17px] leading-[1.5] text-ink/70">{o.body}</p>

      <ul className="mt-8 flex flex-col gap-3">
        {o.systems.map((s) => (
          <li key={s.id} data-hotspot={s.id} className="rounded-panel bg-black/[0.045] px-5 py-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">{s.title}</p>
            <p className="mt-1.5 font-serif text-[26px] leading-tight">{s.lead}</p>
            <p className="mt-2 text-[15px] leading-[1.45] text-ink/70">{s.body}</p>
            {"stats" in s && (
              <div className="mt-3 flex gap-6">
                {s.stats.map((st) => (
                  <div key={st.label}>
                    <p className="font-serif text-[30px] leading-none">{st.value}</p>
                    <p className="mt-1 text-[11.5px] uppercase tracking-wider text-muted">{st.label}</p>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
