import { mcqPool } from "@/data/mcqPool";
import type { McqWord } from "@/data/types";

export type TestQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

/**
 * Generate one MCQ question for a word
 */
export function generateMcqQuestion(
  word: { id: string; kanji: string; meaning: string },
  optionCount = 4
): TestQuestion {
  // 1. Filter out correct word from pool (safety)
  const wrongPool = mcqPool.filter(
    (w) => w.meaning !== word.meaning
  );

  // 2. Shuffle wrong options
  const shuffledWrong = [...wrongPool].sort(() => 0.5 - Math.random());

  // 3. Pick N - 1 wrong meanings
  const wrongOptions = shuffledWrong
    .slice(0, optionCount - 1)
    .map((w) => w.meaning);

  // 4. Combine and shuffle options
  const options = [...wrongOptions, word.meaning].sort(
    () => 0.5 - Math.random()
  );

  // 5. Find correct index
  const correctIndex = options.indexOf(word.meaning);

  return {
    id: `q-${word.id}`,
    question: `What is the meaning of ${word.kanji}?`,
    options,
    correctIndex,
  };
}
