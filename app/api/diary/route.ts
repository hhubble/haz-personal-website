import { NextResponse } from "next/server";
import {
  buildPlaceholderDiaryResponse,
  type DiaryRequest,
} from "@/lib/diary";

export const runtime = "edge";

export async function POST(request: Request) {
  let body: DiaryRequest;

  try {
    body = (await request.json()) as DiaryRequest;
  } catch {
    return NextResponse.json(
      { error: "Expected a JSON body with a message field." },
      { status: 400 },
    );
  }

  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 },
    );
  }

  return NextResponse.json(buildPlaceholderDiaryResponse(message));
}
