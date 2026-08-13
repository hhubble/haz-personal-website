import type { Metadata } from "next";
import { TurnLink } from "@/components/page-turn";
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
    <section className="notebook-page">
      <div className="notebook-inner">
        <nav className="margin-nav" aria-label="Diary pages">
          <TurnLink href="/" className="marginalia">
            back to today
          </TurnLink>
          <TurnLink href="/entries" className="marginalia">
            earlier entries
          </TurnLink>
          <TurnLink href="/about" className="marginalia">
            who is haz?
          </TurnLink>
        </nav>

        <h1 className="page-title">the work</h1>
        <p className="page-intro">
          [PLACEHOLDER COPY] This page holds the resume-shaped version of the
          story.
        </p>

        <ol className="work-list">
          {workTimeline.map((item) => (
            <li className="work-row" key={`${item.period}-${item.title}`}>
              <p className="work-period">{item.period}</p>
              <div>
                <h2 className="work-title">{item.title}</h2>
                <p className="work-context">{item.context}</p>
                <p className="work-description">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
