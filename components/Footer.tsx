import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[720px] px-4 pb-10 pt-6 text-sm text-muted-dark">
      <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
        <p>
          <a href={`mailto:${SITE.contactEmail}`} className="text-paper/85 underline-offset-4 hover:underline">
            {SITE.contactEmail}
          </a>
        </p>
        <p>
          <a href={SITE.url} className="underline-offset-4 hover:underline">
            edusphere-ai.com
          </a>
          {" · "}
          <a href={SITE.facebook} className="underline-offset-4 hover:underline">
            Facebook
          </a>
        </p>
        <p>
          {SITE.footerLine}. © {SITE.year} {SITE.name}.
        </p>
        <p className="text-xs text-muted">
          We count scans and section views to improve this pamphlet. Nothing personal is collected unless
          you choose to share it.
        </p>
      </div>
    </footer>
  );
}
