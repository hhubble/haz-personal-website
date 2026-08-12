import { socials } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-shell border-t border-paper-soft/12 py-8 text-sm text-paper-soft/56">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>[PLACEHOLDER COPY] Harry &quot;Haz&quot; Hubble</p>
        <nav aria-label="Social links" className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="soft-link"
              rel="noreferrer"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
