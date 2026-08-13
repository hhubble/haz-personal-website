import type { Metadata } from "next";
import { TurnLink } from "@/components/page-turn";
import { diaryEntries } from "@/lib/entries";

export const metadata: Metadata = {
  title: "Entries",
  description:
    "[PLACEHOLDER COPY] Diary-style biography entries for Harry \"Haz\" Hubble.",
  alternates: {
    canonical: "/entries",
  },
};

export default function EntriesPage() {
  return (
    <section className="notebook-page">
      <div className="notebook-inner">
        <nav className="margin-nav" aria-label="Diary pages">
          <TurnLink href="/" className="marginalia">
            back to today
          </TurnLink>
          <TurnLink href="/work" className="marginalia">
            the work
          </TurnLink>
          <TurnLink href="/about" className="marginalia">
            who is haz?
          </TurnLink>
        </nav>

        <h1 className="page-title">earlier entries</h1>
        <p className="page-intro">
          [PLACEHOLDER COPY] Short journal notes will become the biographical
          source material for the interactive diary.
        </p>

        <ol className="entry-list" aria-label="Table of contents">
          {diaryEntries.map((entry) => (
            <li key={entry.slug}>
              <TurnLink href={`/entries/${entry.slug}`} className="entry-row">
                <time className="entry-year" dateTime={entry.date}>
                  {entry.displayDate}
                </time>
                <article>
                  <h2 className="entry-title">{entry.title}</h2>
                  <p className="entry-summary">{entry.summary}</p>
                </article>
              </TurnLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
