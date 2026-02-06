import { TestQuestion } from "@/data/testQuestions";
import Link from "next/link";

type Props = {
  questions: TestQuestion[];
  answers: (number | null)[];
  score: number;
  onRetry: () => void;
};

export default function ResultScreen({
  questions,
  answers,
  score,
  onRetry,
}: Props) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">
        Score: {score} / {questions.length}
      </h2>

      {questions.map((q, i) => (
        <div key={q.id} className="p-4 border rounded-lg">
          <p className="font-medium">{q.question}</p>

          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.correctIndex;
            const isSelected = answers[i] === idx;

            return (
              <p
                key={idx}
                className={`ml-4 ${
                  isCorrect
                    ? "text-green-600"
                    : isSelected
                    ? "text-red-600"
                    : ""
                }`}
              >
                {opt}
              </p>
            );
          })}
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Retry
        </button>

        <Link
          href="/word-of-day"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Word of the Day
        </Link>
      </div>
    </div>
  );
}
