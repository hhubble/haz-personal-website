import type { Metadata } from "next";
import Link from "next/link";
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
    <section className="site-shell py-16 sm:py-24">
      <div className="max-w-3xl">
        <p className="page-kicker">entries</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper-soft sm:text-6xl">
          Diary entries
        </h1>
        <p className="mt-5 text-paper-soft/72">
          [PLACEHOLDER COPY] Short journal-style notes that will become the
          biographical source material for the interactive diary.
        </p>
      </div>

      <div className="mt-12 grid gap-4">
        {diaryEntries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/entries/${entry.slug}`}
            className="group grid gap-3 border-t border-paper-soft/14 py-6 sm:grid-cols-[10rem_minmax(0,1fr)]"
          >
            <time className="text-sm text-brass" dateTime={entry.date}>
              {entry.displayDate}
            </time>
            <article>
              <h2 className="font-serif text-3xl leading-tight text-paper-soft transition group-hover:text-brass">
                {entry.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-paper-soft/68">
                {entry.summary}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
