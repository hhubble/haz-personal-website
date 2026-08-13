import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TurnLink } from "@/components/page-turn";
import { diaryEntries, getDiaryEntry } from "@/lib/entries";

type EntryPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return diaryEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: EntryPageProps): Promise<Metadata> {
  const { slug } = params;
  const entry = getDiaryEntry(slug);

  if (!entry) {
    return {
      title: "Entry not found",
    };
  }

  return {
    title: entry.title,
    description: entry.summary,
    alternates: {
      canonical: `/entries/${entry.slug}`,
    },
  };
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { slug } = params;
  const entry = getDiaryEntry(slug);

  if (!entry) {
    notFound();
  }

  const entryIndex = diaryEntries.findIndex((item) => item.slug === entry.slug);
  const nextEntry = diaryEntries[(entryIndex + 1) % diaryEntries.length];

  return (
    <article className="notebook-page">
      <div className="entry-article">
        <nav className="margin-nav" aria-label="Diary pages">
          <TurnLink href="/" className="marginalia">
            back to today
          </TurnLink>
          <TurnLink href="/entries" className="marginalia">
            contents
          </TurnLink>
          <TurnLink
            href={`/entries/${nextEntry.slug}`}
            className="marginalia"
          >
            next entry
          </TurnLink>
        </nav>

        <p className="diary-hand entry-date">an earlier page</p>
        <h1 className="page-title">{entry.title}</h1>
        <time className="entry-date" dateTime={entry.date}>
          {entry.displayDate}
        </time>

        <div className="entry-body">
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
