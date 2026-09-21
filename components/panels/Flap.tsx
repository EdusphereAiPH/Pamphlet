import { SITE } from "@/content/site";
import { Eyebrow, Panel } from "./Panel";

export function Flap() {
  const { idea, trust } = SITE;
  return (
    <Panel tone="paper">
      <div data-hotspot="idea" className="-mx-3 px-3 py-2">
        <Eyebrow>{idea.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-[40px] font-semibold leading-[0.98] tracking-[-0.05em]">{idea.heading}</h2>
        <p className="accent-serif mt-4 text-[23px] leading-[1.15] text-ink/70">{idea.body}</p>
      </div>

      <div className="mt-12">
        <Eyebrow>{trust.eyebrow}</Eyebrow>
        <h3 className="mt-3 text-[30px] font-semibold leading-[1.02] tracking-[-0.045em]">{trust.heading}</h3>
        <p className="mt-3 text-[16px] leading-[1.5] text-ink/70">{trust.body}</p>
      </div>

      <ul className="mt-8 flex flex-col gap-3.5">
        {trust.pillars.map((p) => (
          <li key={p.id} data-hotspot={p.id} className="rounded-panel bg-black/[0.045] px-5 py-4">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-muted">{p.title}</p>
            <p className="mt-1.5 text-[19px] font-semibold leading-[1.15] tracking-[-0.03em]">{p.lead}</p>
            <p className="mt-1.5 text-[14px] text-ink/60">{p.tag}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
