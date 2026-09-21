import Image from "next/image";
import { SITE } from "@/content/site";
import { Panel } from "./Panel";

export function Front() {
  return (
    <Panel tone="dark">
      <div className="flex items-center gap-3">
        <Image src="/brand/edusphere-mark-white.png" alt="" width={952} height={777} className="h-11 w-auto" unoptimized />
        <span className="text-[19px] font-semibold tracking-[-0.02em]">EduSphere</span>
        <span className="rounded-[6px] border border-current/40 px-1.5 text-[12px] font-medium leading-[1.5]">AI</span>
      </div>

      <div data-hotspot="platform" className="mt-auto -mx-3 px-3 py-3">
        <h1 className="text-[60px] font-semibold leading-[0.94] tracking-[-0.055em]">
          One platform.
          <br />
          <span className="accent-serif text-paper/70">Complete school intelligence.</span>
        </h1>
        <p className="mt-7 text-[20px] leading-[1.5] text-muted-dark">{SITE.description}</p>
      </div>

      <div data-hotspot="st-clare" className="mt-12 rounded-panel bg-white/[0.06] p-6 ring-1 ring-white/10">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted-dark">Live today</p>
        <p className="mt-2 text-[25px] font-semibold leading-[1.1] tracking-[-0.035em]">
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
