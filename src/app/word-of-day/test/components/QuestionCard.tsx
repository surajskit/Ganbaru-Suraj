//src/app/word-of-day/components/QuestionCard.tsx

import { TestQuestion } from "@/data/testQuestions";

type Props = {
  question: TestQuestion;
  index: number;
  selected: number | null;
  onSelect: (value: number) => void;
};

export default function QuestionCard({
  question,
  index,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <p className="font-medium">
        {index + 1}. {question.question}
      </p>

      {question.options.map((opt, i) => (
        <label key={i} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={selected === i}
            onChange={() => onSelect(i)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
