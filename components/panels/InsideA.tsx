import Image from "next/image";
import { SITE } from "@/content/site";
import { Eyebrow, Panel } from "./Panel";

export function InsideA() {
  const t = SITE.teacher;
  return (
    <Panel tone="paper">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[38px] font-semibold leading-[0.98] tracking-[-0.05em]">{t.heading}</h2>
      <p className="mt-4 text-[17px] leading-[1.5] text-ink/70">{t.body}</p>

      <ol className="mt-8 grid grid-cols-2 gap-4">
        {t.steps.map((s) => (
          <li key={s.n} data-hotspot={`step-${s.n}`} className="overflow-hidden rounded-panel bg-ink text-paper">
            <div className="relative h-[100px] w-full">
              <Image src={s.image} alt="" fill sizes="216px" className="object-cover" unoptimized />
            </div>
            <div className="px-4 pb-4 pt-3">
              <p className="text-[12px] font-medium tracking-[0.16em] text-muted-dark">{s.n}</p>
              <p className="mt-1 text-[17px] font-semibold leading-tight tracking-[-0.02em]">{s.title}</p>
              <p className="mt-1.5 text-[13px] leading-[1.38] text-paper/70">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div data-hotspot="taglish" className="mt-5 rounded-panel bg-black/[0.045] p-5">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted">AI Teacher Mode · {t.demo.context}</p>
        <p className="accent-serif mt-2.5 text-[18px] leading-snug">“{t.demo.quote}”</p>
        <p className="mt-3 text-[14px] leading-[1.45] text-ink/70">
          <span className="font-medium text-ink">Student:</span> {t.demo.studentAsk}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {t.demo.chips.map((c) => (
            <li key={c} className="rounded-pill bg-ink px-2.5 py-1 text-[11.5px] text-paper">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
