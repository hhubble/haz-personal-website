import Link from "next/link";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-shell flex min-h-20 items-center justify-between gap-6 py-4">
      <Link
        href="/"
        className="font-serif text-2xl leading-none text-paper-soft"
        aria-label="The diary homepage"
      >
        the diary
      </Link>
      <nav aria-label="Primary navigation" className="flex items-center gap-5">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
