//src/app/api/test-mcq/route.ts
import { NextResponse } from "next/server";
import { generateMcqQuestion } from "@/lib/generateMcq";

export async function GET() {
  const question = generateMcqQuestion({
    id: "test-1",
    kanji: "頑張る",
    meaning: "to do one's best",
  });

  return NextResponse.json(question);
}
