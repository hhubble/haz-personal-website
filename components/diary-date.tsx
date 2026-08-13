"use client";

import { useEffect, useState } from "react";

type Today = {
  dateTime: string;
  label: string;
};

export function DiaryDate() {
  const [today, setToday] = useState<Today | null>(null);

  useEffect(() => {
    const now = new Date();
    setToday({
      dateTime: now.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
        .format(now)
        .toLowerCase(),
    });
  }, []);

  return (
    <p className="diary-date" aria-label="Today">
      {today ? <time dateTime={today.dateTime}>{today.label}</time> : "\u00a0"}
    </p>
  );
}
