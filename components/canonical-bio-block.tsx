type CanonicalBioBlockProps = {
  className?: string;
};

export function CanonicalBioBlock({ className }: CanonicalBioBlockProps) {
  return (
    <section
      className={`paper-panel rounded-lg p-6 sm:p-8 ${className ?? ""}`}
      aria-labelledby="canonical-bio-heading"
    >
      <div className="relative z-10 max-w-3xl">
        <h2
          id="canonical-bio-heading"
          className="font-serif text-3xl leading-tight text-ink"
        >
          Canonical biography placeholder
        </h2>
        <p className="mt-4 text-ink/74">
          [PLACEHOLDER COPY] Harry &quot;Haz&quot; Hubble is the co-founder and
          CEO of Pally. This block exists as the future source of truth for
          concise public biography copy and structured-data alignment.
        </p>
      </div>
    </section>
  );
}
