// src/data/testQuestions.ts

export type TestQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

/**
 * Daily Test
 * (later: generated from today's Word of the Day via backend)
 */
export const dailyQuestions: TestQuestion[] = [
  {
    id: 1,
    question: "What does 頑張る mean?",
    options: [
      "to do one's best",
      "to sleep",
      "to give up",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "How do you read 頑張る?",
    options: [
      "がんばる",
      "がんばり",
      "がんばった",
    ],
    correctIndex: 0,
  },
];

/**
 * Weekly Test
 * (later: last 7 days Word of the Day)
 */
export const weeklyQuestions: TestQuestion[] = [
  ...dailyQuestions,
];

/**
 * Monthly Test
 * (later: last 30 days Word of the Day)
 */
export const monthlyQuestions: TestQuestion[] = [
  ...dailyQuestions,
];
