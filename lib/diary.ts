export type DiaryRequest = {
  message?: string;
};

export type DiaryResponse = {
  reply: string;
  source: "placeholder";
  received: string;
  suggestedEntries: string[];
};

export const suggestedDiaryEntries = [
  "the-year-i-started-brokering-at-14",
  "becoming-cfo-at-22",
  "the-pandemic-year",
  "building-pally",
];

export function buildPlaceholderDiaryResponse(message: string): DiaryResponse {
  // TODO: Replace this placeholder with an LLM call that receives verified Haz context.
  return {
    reply:
      "[PLACEHOLDER COPY] The diary heard you. Later, this response will be generated from verified context about Haz and the selected site entries.",
    source: "placeholder",
    received: message,
    suggestedEntries: suggestedDiaryEntries,
  };
}
