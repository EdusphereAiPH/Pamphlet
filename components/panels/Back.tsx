import Image from "next/image";
import { SITE } from "@/content/site";
import { Panel } from "./Panel";

export function Back() {
  const c = SITE.close;
  return (
    <Panel tone="dark">
      <div className="flex items-center gap-3">
        <Image src="/brand/edusphere-mark-white.png" alt="" width={952} height={777} className="h-11 w-auto" unoptimized />
        <span className="text-[18px] font-medium tracking-tight">
          EduSphere <span className="text-muted-dark">AI</span>
        </span>
      </div>

      <div className="mt-auto">
        <h2 className="font-serif text-[54px] leading-[0.98] tracking-tight">{c.heading}</h2>
        <p className="mt-6 text-[19px] leading-[1.5] text-muted-dark">{c.body}</p>
      </div>

      <div data-hotspot="contact" className="mt-10 rounded-panel bg-white/[0.06] p-6 ring-1 ring-white/10">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted-dark">{c.write}</p>
        <p className="mt-3 text-[24px] font-medium tracking-tight">{SITE.contactEmail}</p>
        <p className="mt-2 text-[17px] text-paper/70">{SITE.urlLabel} · Facebook</p>
      </div>

      <div className="mt-10 text-[14px] text-muted">
        <p>{SITE.footerLine}</p>
        <p className="mt-1">{SITE.copyright}</p>
      </div>
    </Panel>
  );
}
