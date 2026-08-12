import type { Metadata } from "next";
import { CanonicalBioBlock } from "@/components/canonical-bio-block";

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
    <section className="site-shell py-16 sm:py-24">
      <div className="max-w-3xl">
        <p className="page-kicker">canonical bio</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper-soft sm:text-6xl">
          About Haz
        </h1>
      </div>
      <CanonicalBioBlock className="mt-10" />
    </section>
  );
}
