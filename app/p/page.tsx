import Link from "next/link";
import { AudiencePicker } from "@/components/AudiencePicker";
import { FoldOpen } from "@/components/FoldOpen";
import { Wordmark } from "@/components/Wordmark";
import { SITE } from "@/content/site";

export default function PamphletLanding() {
  return (
    <main className="pb-10 pt-6">
      <FoldOpen />
      <header>
        <Wordmark />
      </header>

      <div className="mt-14 sm:mt-20">
        <h1 className="font-serif text-[2.75rem] leading-[0.98] tracking-tight sm:text-6xl">
          One platform.
          <br />
          <em className="text-paper/70">Complete school intelligence.</em>
        </h1>
        <p className="mt-5 max-w-[34ch] text-[17px] leading-relaxed text-muted-dark">
          {SITE.description}
        </p>
      </div>

      <div className="mt-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-dark">
          What brings you here today?
        </p>
        <div className="mt-4">
          <AudiencePicker />
        </div>
        <p className="mt-4 text-sm">
          <Link href="/p/everyone" className="text-paper/80 underline-offset-4 hover:underline">
            Just show me everything →
          </Link>
        </p>
        <p className="mt-8 text-sm text-muted">
          This pamphlet changes depending on who&apos;s reading it. Paper can&apos;t do that.
        </p>
      </div>
    </main>
  );
}
