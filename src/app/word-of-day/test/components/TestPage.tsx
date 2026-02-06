"use client";

import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ResultScreen from "./ResultScreen";
import { TestQuestion } from "@/data/testQuestions";

type Props = {
  questions: TestQuestion[];
};

export default function TestPage({ questions }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const score = answers.reduce<number>((acc, answer, index) => {
    if (answer !== null && answer === questions[index].correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (submitted) {
    return (
      <ResultScreen
        questions={questions}
        answers={answers}
        score={score}
        onRetry={() => {
          setAnswers(Array(questions.length).fill(null));
          setSubmitted(false);
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          index={index}
          selected={answers[index]}
          onSelect={(value) => {
            const nextAnswers = [...answers];
            nextAnswers[index] = value;
            setAnswers(nextAnswers);
          }}
        />
      ))}

      <button
        disabled={answers.includes(null)}
        onClick={() => setSubmitted(true)}
        className="px-6 py-3 rounded-lg bg-blue-600 text-white disabled:opacity-50"
      >
        Submit Test
      </button>
    </div>
  );
}
