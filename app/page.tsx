import { DiaryDate } from "@/components/diary-date";
import { DiaryInterface } from "@/components/diary-interface";
import { TurnLink } from "@/components/page-turn";
import { navigation } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="notebook-page home-page">
      <div className="home-heading">
        <DiaryDate />
        <h1 className="page-title">the diary of haz</h1>
        <p className="page-intro">
          [PLACEHOLDER COPY] Write to the page to explore Haz&apos;s public
          biography and work.
        </p>
      </div>

      <nav className="home-marginalia" aria-label="Pages in the diary">
        {navigation.map((item) => (
          <TurnLink key={item.href} href={item.href} className="marginalia">
            {item.label}
          </TurnLink>
        ))}
      </nav>

      <DiaryInterface />

      <TurnLink
        href="/entries"
        className="dog-ear"
        aria-label="Turn to earlier entries"
      >
        <span aria-hidden="true" />
      </TurnLink>
    </section>
  );
}
