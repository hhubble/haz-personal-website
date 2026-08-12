import type { Metadata } from "next";
import { workTimeline } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "[PLACEHOLDER COPY] Conventional work timeline for Harry \"Haz\" Hubble.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <section className="site-shell py-16 sm:py-24">
      <div className="max-w-3xl">
        <p className="page-kicker">work</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-paper-soft sm:text-6xl">
          Work timeline
        </h1>
        <p className="mt-5 text-paper-soft/72">
          [PLACEHOLDER COPY] A conventional route for people who want the
          resume-shaped version of the story.
        </p>
      </div>

      <ol className="mt-12 grid gap-5">
        {workTimeline.map((item) => (
          <li
            key={`${item.period}-${item.title}`}
            className="grid gap-3 border-t border-paper-soft/14 py-6 sm:grid-cols-[10rem_minmax(0,1fr)]"
          >
            <p className="text-sm text-brass">{item.period}</p>
            <div>
              <h2 className="text-xl font-semibold text-paper-soft">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-paper-soft/58">{item.context}</p>
              <p className="mt-3 max-w-2xl text-paper-soft/72">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
