"use client";

import { FormEvent, useMemo, useState } from "react";
import type { DiaryResponse } from "@/lib/diary";

const starterPrompts = [
  "What should I know about Haz?",
  "Tell me about Pally.",
  "Show me the conventional version.",
];

export function DiaryInterface() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(
    "[PLACEHOLDER COPY] Write into the diary and it will answer with a stubbed response.",
  );
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [lastSent, setLastSent] = useState("");

  const canSubmit = useMemo(
    () => message.trim().length > 0 && status !== "loading",
    [message, status],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const submittedMessage = message.trim();
    setStatus("loading");
    setLastSent(submittedMessage);

    try {
      const response = await fetch("/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: submittedMessage }),
      });

      if (!response.ok) {
        throw new Error("Diary API request failed.");
      }

      const data = (await response.json()) as DiaryResponse;
      setReply(data.reply);
      setMessage("");
      setStatus("idle");
    } catch {
      setReply(
        "[PLACEHOLDER COPY] The diary could not answer. Keep this error state for API and LLM integration testing.",
      );
      setStatus("error");
    }
  }

  return (
    <div className="mt-auto pt-10">
      <div className="grid gap-4 border-y ink-rule py-5">
        <p className="min-h-20 whitespace-pre-wrap font-serif text-2xl leading-9 text-ink sm:text-3xl">
          {status === "loading" ? "[PLACEHOLDER COPY] The ink is moving..." : reply}
        </p>
        {lastSent ? (
          <p className="text-xs uppercase text-ink/48">Last prompt: {lastSent}</p>
        ) : null}
      </div>

      <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="diary-message">
          Write into the diary
        </label>
        <textarea
          id="diary-message"
          className="min-h-32 resize-none rounded-md border border-ink/16 bg-paper-soft/70 p-4 text-base text-ink outline-none transition placeholder:text-ink/42 focus:border-verdigris focus:bg-paper-soft"
          placeholder="Write a question for the diary..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="rounded-full border border-ink/14 px-3 py-1.5 text-xs text-ink/68 transition hover:border-ink/30 hover:text-ink"
                onClick={() => setMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={!canSubmit}
            className="min-h-11 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper-soft transition hover:bg-verdigris disabled:opacity-[0.42]"
          >
            Write back
          </button>
        </div>
      </form>
    </div>
  );
}
