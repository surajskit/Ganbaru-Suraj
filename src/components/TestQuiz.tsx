"use client";

import { useMemo, useState } from "react";

type Mcq = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type TestQuizProps = {
  title: string;
  description?: string;
  questions: Mcq[];
};

export default function TestQuiz({ title, description, questions }: TestQuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((total, q, index) => {
      return total + (answers[index] === q.correctAnswer ? 1 : 0);
    }, 0);
  }, [answers, questions, submitted]);

  const total = questions.length;

  const handleSelect = (index: number, option: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
        <p className="mt-4 text-slate-700">No questions available right now.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          {description && <p className="text-sm text-slate-600">{description}</p>}
        </div>
        {submitted && (
          <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Score: {score} / {total}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-5">
        {questions.map((q, index) => (
          <div key={`${index}-${q.question}`} className="rounded-2xl border border-slate-200 p-4">
            <div className="font-semibold text-slate-900">
              {index + 1}. {q.question}
            </div>
            <div className="mt-3 grid gap-2">
              {q.options.map((option) => {
                const isSelected = answers[index] === option;
                const isCorrect = submitted && option === q.correctAnswer;
                const isWrong = submitted && isSelected && option !== q.correctAnswer;
                const className = [
                  "w-full rounded-xl border px-4 py-2 text-left text-sm font-medium transition",
                  isCorrect
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : isWrong
                      ? "border-rose-300 bg-rose-50 text-rose-700"
                      : isSelected
                        ? "border-slate-900 bg-slate-100"
                        : "border-slate-200 hover:border-slate-300",
                ].join(" ");

                return (
                  <button
                    key={option}
                    type="button"
                    className={className}
                    onClick={() => handleSelect(index, option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {submitted && answers[index] !== q.correctAnswer && (
              <div className="mt-2 text-sm text-slate-600">
                Correct answer: <span className="font-semibold">{q.correctAnswer}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
