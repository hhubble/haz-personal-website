type CanonicalBioBlockProps = {
  className?: string;
};

export function CanonicalBioBlock({ className }: CanonicalBioBlockProps) {
  return (
    <section
      className={`canonical-bio ${className ?? ""}`}
      aria-labelledby="canonical-bio-heading"
    >
      <h2 id="canonical-bio-heading" className="bio-title">
        the careful version
      </h2>
      <p className="bio-copy">
        [PLACEHOLDER COPY] Harry &quot;Haz&quot; Hubble is the co-founder and
        CEO of Pally. This block exists as the future source of truth for
        concise public biography copy and structured-data alignment.
      </p>
    </section>
  );
}
