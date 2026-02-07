// src/lib/generateMcq.ts
import { mcqPool } from "@/data/mcqPool";
import type { McqWord } from "@/data/types";
import type { TestQuestion } from "@/data/testQuestions";

type GenerateMcqInput = {
  id: string;
  kanji: string;
  meaning: string;
};

/**
 * Generate one MCQ question for a word
 */
export function generateMcqQuestion(
  word: GenerateMcqInput,
  optionCount = 4
): TestQuestion {
  // 1. Remove correct answer from pool (safety)
  const wrongPool = mcqPool.filter(
    (w) => w.meaning !== word.meaning
  );

  if (wrongPool.length < optionCount - 1) {
    throw new Error("MCQ pool does not have enough wrong options");
  }

  // 2. Shuffle wrong pool
  const shuffledWrong = [...wrongPool].sort(
    () => Math.random() - 0.5
  );

  // 3. Pick N - 1 wrong meanings
  const wrongOptions = shuffledWrong
    .slice(0, optionCount - 1)
    .map((w) => w.meaning);

  // 4. Combine + shuffle options
  const options = [...wrongOptions, word.meaning].sort(
    () => Math.random() - 0.5
  );

  // 5. Resolve correct index
  const correctIndex = options.indexOf(word.meaning);

  return {
    id: `q-${word.id}`,
    question: `What is the meaning of ${word.kanji}?`,
    options,
    correctIndex,
  };
}
