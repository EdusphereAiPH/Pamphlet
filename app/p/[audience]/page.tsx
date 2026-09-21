import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { AITeacherDemo } from "@/components/AITeacherDemo";
import { AskEdusphere } from "@/components/AskEdusphere";
import { Beacon } from "@/components/Beacon";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { SchoolIntro } from "@/components/SchoolIntro";
import { Section } from "@/components/Section";
import { StatGrid } from "@/components/StatGrid";
import { Wordmark } from "@/components/Wordmark";
import { AUDIENCES, getAudience } from "@/content/audiences";
import { SITE } from "@/content/site";

// All five tracks are prerendered at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/p/[audience]">): Promise<Metadata> {
  const a = getAudience((await params).audience);
  if (!a) return {};
  return { title: a.hook, description: a.intro };
}

export default async function TrackPage({ params }: PageProps<"/p/[audience]">) {
  const { audience } = await params;
  const a = getAudience(audience);
  if (!a) notFound();

  const mailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(a.ctaSubject)}`;
  const demoAfter = a.demoAfter ?? a.sections.length - 1;

  return (
    <main className="pb-10 pt-6">
      <Beacon event="view_track" audience={a.slug} />

      <header>
        <Link href="/p" aria-label="Back to the start">
          <Wordmark />
        </Link>
      </header>

      <div className="sticky top-0 z-10 -mx-4 mt-6 bg-ink/85 px-4 py-3 backdrop-blur-md">
        <RoleSwitcher current={a.slug} />
      </div>

      <div className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-dark">{a.forLine}</p>
        <h1 className="mt-3 font-serif text-[2.5rem] leading-[1] tracking-tight sm:text-5xl">{a.hook}</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted-dark">{a.intro}</p>
      </div>

      <div className="mt-8">
        <SchoolIntro audience={a.slug} />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {a.sections.map((s, i) => (
          <Fragment key={s.heading}>
            <Section data={s} />
            {i === demoAfter && <AITeacherDemo audience={a.slug} />}
          </Fragment>
        ))}
      </div>

      <section className="mt-10 rounded-card bg-paper p-6 text-ink sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/60">
          Proof · as of {SITE.proof.asOf}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight">
          Live at {SITE.proof.school}.
        </h2>
        <StatGrid stats={SITE.proof.stats} tone="light" className="mt-6" />
      </section>

      <div className="mt-4">
        <AskEdusphere audience={a.slug} />
      </div>

      <section className="mt-4 rounded-card bg-surface p-6 ring-1 ring-white/[0.06] sm:p-8">
        <h2 className="font-serif text-3xl leading-tight tracking-tight">Ready when your school is.</h2>
        <p className="mt-3 text-paper/80">Write to us and we&apos;ll shape a proposal around your school.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={mailto}
            className="inline-flex h-12 items-center rounded-pill bg-paper px-5 font-medium text-ink transition-colors hover:bg-white"
          >
            Write to us
          </a>
          <a
            href={SITE.url}
            className="inline-flex h-12 items-center rounded-pill bg-white/[0.06] px-5 font-medium text-paper transition-colors hover:bg-white/10"
          >
            See the full site
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-dark">
          Wearing more than one hat?{" "}
          <Link href="/p" className="text-paper/80 underline-offset-4 hover:underline">
            Read this as someone else →
          </Link>
        </p>
      </section>
    </main>
  );
}
