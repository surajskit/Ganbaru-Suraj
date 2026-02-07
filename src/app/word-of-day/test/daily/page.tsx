//src/app/word-of-day/daily/page.tsx


import TestPage from "../components/TestPage";
import { generateDailyMcqs } from "@/lib/generateDailyMcq";
import { dailyWords } from "@/data/dailyWords";

const questions = generateDailyMcqs(dailyWords);

export default function DailyTestPage() {
  return <TestPage questions={questions} />;
}
