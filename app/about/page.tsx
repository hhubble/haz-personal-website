import type { Metadata } from "next";
import { CanonicalBioBlock } from "@/components/canonical-bio-block";
import { TurnLink } from "@/components/page-turn";

export const metadata: Metadata = {
  title: "About",
  description:
    "[PLACEHOLDER COPY] Canonical biography placeholder for Harry \"Haz\" Hubble.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="notebook-page">
      <div className="notebook-inner">
        <nav className="margin-nav" aria-label="Diary pages">
          <TurnLink href="/" className="marginalia">
            back to today
          </TurnLink>
          <TurnLink href="/entries" className="marginalia">
            earlier entries
          </TurnLink>
          <TurnLink href="/work" className="marginalia">
            the work
          </TurnLink>
        </nav>

        <h1 className="page-title">who is haz?</h1>
        <CanonicalBioBlock />
      </div>
    </section>
  );
}
