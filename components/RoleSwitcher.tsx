import Link from "next/link";
import { AUDIENCES, type AudienceSlug } from "@/content/audiences";

export function RoleSwitcher({ current }: { current: AudienceSlug }) {
  return (
    <nav aria-label="Switch role" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [mask-image:linear-gradient(to_right,black_calc(100%-40px),transparent)]">
      <ul className="flex w-max gap-2">
        {AUDIENCES.map((a) => {
          const active = a.slug === current;
          return (
            <li key={a.slug}>
              <Link
                href={`/p/${a.slug}`}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-9 items-center rounded-pill px-3.5 text-sm transition-colors ${
                  active ? "bg-paper text-ink" : "bg-white/[0.06] text-paper/80 hover:bg-white/10"
                }`}
              >
                {a.short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
