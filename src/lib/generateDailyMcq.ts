// src/lib/generateDailyMcq.ts
import { generateMcqQuestion } from "./generateMcq";
import { TestQuestion } from "@/data/testQuestions";

type WordOfDay = {
  id: string;
  kanji: string;
  meaning: string;
};

export function generateDailyMcqs(
  words: WordOfDay[]
): TestQuestion[] {
  return words.map((word) =>
    generateMcqQuestion({
      id: word.id,
      kanji: word.kanji,
      meaning: word.meaning,
    })
  );
}
