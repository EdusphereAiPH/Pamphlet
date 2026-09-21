import Image from "next/image";
import { SITE } from "@/content/site";
import { Panel } from "./Panel";

export function Front() {
  return (
    <Panel tone="dark">
      <div className="flex items-center gap-3">
        <Image src="/brand/edusphere-mark-white.png" alt="" width={952} height={777} className="h-11 w-auto" unoptimized />
        <span className="text-[18px] font-medium tracking-tight">
          EduSphere <span className="text-muted-dark">AI</span>
        </span>
      </div>

      <div data-hotspot="platform" className="mt-auto -mx-3 px-3 py-3">
        <h1 className="font-serif text-[64px] leading-[0.98] tracking-tight">
          One platform.
          <br />
          <em className="text-paper/70">Complete school intelligence.</em>
        </h1>
        <p className="mt-7 text-[20px] leading-[1.5] text-muted-dark">{SITE.description}</p>
      </div>

      <div data-hotspot="san-isidro" className="mt-12 rounded-panel bg-white/[0.06] p-6 ring-1 ring-white/10">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted-dark">Live today</p>
        <p className="mt-2 font-serif text-[30px] leading-tight">
          {SITE.proof.school} · {SITE.proof.headline}
        </p>
        <p className="mt-2 text-[15px] text-paper/70">
          {SITE.proof.stats.slice(1).map((s) => `${s.value} ${s.label.toLowerCase()}`).join(" · ")}
        </p>
      </div>

      <p className="mt-8 text-[14px] text-muted">{SITE.footerLine}</p>
    </Panel>
  );
}
