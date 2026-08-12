export type DiaryEntry = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  summary: string;
  body: string[];
};

export const diaryEntries: DiaryEntry[] = [
  {
    slug: "the-year-i-started-brokering-at-14",
    title: "the year i started brokering at 14",
    date: "2010-01-01",
    displayDate: "2010",
    summary:
      "[PLACEHOLDER COPY] Early entrepreneurship entry summary goes here.",
    body: [
      "[PLACEHOLDER COPY] Replace with verified detail about the first brokering chapter.",
      "[PLACEHOLDER COPY] Add what changed, what Haz learned, and why it matters to the later story.",
    ],
  },
  {
    slug: "becoming-cfo-at-22",
    title: "becoming CFO at 22",
    date: "2018-01-01",
    displayDate: "2018",
    summary:
      "[PLACEHOLDER COPY] Finance and operating responsibility entry summary goes here.",
    body: [
      "[PLACEHOLDER COPY] Replace with verified context about the CFO chapter.",
      "[PLACEHOLDER COPY] Add operating lessons, scope, and the parts that should feed the diary model.",
    ],
  },
  {
    slug: "the-pandemic-year",
    title: "the pandemic year",
    date: "2020-01-01",
    displayDate: "2020",
    summary:
      "[PLACEHOLDER COPY] Transition and resilience entry summary goes here.",
    body: [
      "[PLACEHOLDER COPY] Replace with verified context about this year.",
      "[PLACEHOLDER COPY] Add the narrative arc only after facts are confirmed.",
    ],
  },
  {
    slug: "building-pally",
    title: "building pally",
    date: "2024-01-01",
    displayDate: "2024",
    summary:
      "[PLACEHOLDER COPY] Pally founder story entry summary goes here.",
    body: [
      "[PLACEHOLDER COPY] Replace with verified context about founding and building Pally.",
      "[PLACEHOLDER COPY] Add product thesis, team context, and public-facing details later.",
    ],
  },
];

export function getDiaryEntry(slug: string) {
  return diaryEntries.find((entry) => entry.slug === slug);
}
