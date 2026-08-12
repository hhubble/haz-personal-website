import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <article className="site-shell py-16 sm:py-24">
      <Link href="/entries" className="soft-link text-sm">
        Back to entries
      </Link>
      <div className="paper-panel mt-8 rounded-lg p-6 sm:p-10">
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="page-kicker text-verdigris">journal entry</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-ink sm:text-6xl">
            {entry.title}
          </h1>
          <time
            className="mt-5 block text-sm text-ink/58"
            dateTime={entry.date}
          >
            {entry.displayDate}
          </time>
          <div className="mt-10 space-y-6 text-lg leading-8 text-ink/78">
            {entry.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
