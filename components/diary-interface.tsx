"use client";

import { FormEvent, KeyboardEvent, useMemo, useState } from "react";
import type { DiaryResponse } from "@/lib/diary";

const starterPrompts = [
  "what should i know about haz?",
  "tell me about pally.",
  "where should i begin?",
];

type Exchange = {
  id: number;
  visitor: string;
  diary: string;
};

type DiaryStatus = "idle" | "sinking" | "loading" | "error";

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function BleedingReply({ exchange }: { exchange: Exchange }) {
  const words = exchange.diary.split(/\s+/);

  return (
    <p className="bleeding-reply" aria-hidden="true">
      {words.map((word, index) => (
        <span
          className="bleeding-word"
          key={`${exchange.id}-${index}-${word}`}
          style={{ animationDelay: `${index * 65}ms` }}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

export function DiaryInterface() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<DiaryStatus>("idle");
  const [sinkingText, setSinkingText] = useState("");
  const [pastExchanges, setPastExchanges] = useState<Exchange[]>([]);
  const [currentExchange, setCurrentExchange] = useState<Exchange | null>(null);
  const [liveReply, setLiveReply] = useState("");

  const canSubmit = useMemo(
    () =>
      message.trim().length > 0 &&
      status !== "loading" &&
      status !== "sinking",
    [message, status],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const submittedMessage = message.trim();
    const blotTimer = setTimeout(() => setStatus("loading"), 610);

    setSinkingText(submittedMessage);
    setMessage("");
    setStatus("sinking");
    setLiveReply("");

    const responsePromise = fetch("/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: submittedMessage }),
    });

    try {
      await wait(760);
      const response = await responsePromise;

      if (!response.ok) {
        throw new Error("Diary API request failed.");
      }

      const data = (await response.json()) as DiaryResponse;
      const nextExchange = {
        id: Date.now(),
        visitor: submittedMessage,
        diary: data.reply,
      };

      setPastExchanges((exchanges) =>
        currentExchange
          ? [...exchanges, currentExchange].slice(-3)
          : exchanges,
      );
      setCurrentExchange(nextExchange);
      setLiveReply(data.reply);
      setSinkingText("");
      setStatus("idle");
    } catch {
      setSinkingText("");
      setStatus("error");
    } finally {
      clearTimeout(blotTimer);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <div className="diary-interface">
      {pastExchanges.length > 0 ? (
        <section className="ghost-exchanges" aria-label="Earlier writing">
          {pastExchanges.map((exchange, index) => (
            <div
              className="ghost-exchange"
              key={exchange.id}
              style={{ opacity: 0.24 + index * 0.13 }}
            >
              <p className="ghost-visitor">{exchange.visitor}</p>
              <p className="ghost-diary">{exchange.diary}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="diary-answer" aria-label="The diary answers">
        {currentExchange ? (
          <>
            <p className="current-question">{currentExchange.visitor}</p>
            <BleedingReply exchange={currentExchange} />
          </>
        ) : (
          <p className="opening-line" aria-hidden="true">
            write, and let the page decide what it remembers.
          </p>
        )}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {liveReply}
        </p>

        {status === "loading" ? (
          <div className="ink-loading" role="status">
            <span className="ink-blot" aria-hidden="true" />
            <span className="sr-only">The ink is settling.</span>
          </div>
        ) : null}

        {status === "error" ? (
          <p className="diary-error" role="alert">
            the ink will not settle tonight. try again.
          </p>
        ) : null}
      </section>

      <form className="diary-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="diary-message">
          Write into the diary
        </label>
        <div className="writing-field">
          <textarea
            id="diary-message"
            rows={4}
            placeholder="leave a question here..."
            value={message}
            disabled={status === "loading" || status === "sinking"}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          {status === "sinking" ? (
            <p className="sinking-ink" aria-hidden="true">
              {sinkingText}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          className="submit-note"
          disabled={!canSubmit}
        >
          press enter, or tap here
        </button>
      </form>

      <aside className="prompt-marginalia" aria-label="Suggested questions">
        <p>perhaps ask...</p>
        {starterPrompts.map((prompt, index) => (
          <button
            key={prompt}
            type="button"
            style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.2}deg)` }}
            onClick={() => setMessage(prompt)}
          >
            {prompt}
          </button>
        ))}
      </aside>
    </div>
  );
}
