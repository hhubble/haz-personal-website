import Link from "next/link";
import { DiaryInterface } from "@/components/diary-interface";

export default function HomePage() {
  return (
    <section className="site-shell flex min-h-[calc(100svh-9rem)] items-center py-10 sm:py-14">
      <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="paper-panel min-h-[32rem] rounded-lg p-5 sm:p-8 lg:p-10">
          <div className="relative z-10 flex min-h-[28rem] flex-col">
            <p className="page-kicker">interactive diary</p>
            <div className="mt-8 max-w-3xl">
              <h1 className="font-serif text-5xl leading-none text-ink sm:text-7xl lg:text-8xl">
                the diary
              </h1>
              <p className="mt-5 max-w-2xl text-base text-ink/72 sm:text-lg">
                [PLACEHOLDER COPY] A sparse, context-aware entry point for Harry
                &quot;Haz&quot; Hubble&apos;s public biography and work.
              </p>
            </div>
            <DiaryInterface />
          </div>
        </div>
        <aside
          aria-label="Backpages"
          className="grid gap-3 text-sm text-paper-soft/72 lg:pb-4"
        >
          <Link
            href="/entries"
            className="border-t border-paper-soft/14 py-4 transition hover:text-paper-soft"
          >
            Read placeholder diary entries
          </Link>
          <Link
            href="/work"
            className="border-t border-paper-soft/14 py-4 transition hover:text-paper-soft"
          >
            View the conventional work timeline
          </Link>
          <Link
            href="/about"
            className="border-y border-paper-soft/14 py-4 transition hover:text-paper-soft"
          >
            See the structured-data bio block
          </Link>
        </aside>
      </div>
    </section>
  );
}
