import TestPage from "../components/TestPage";
import { dailyQuestions } from "@/data/testQuestions";

export default function DailyTestPage() {
  return <TestPage questions={dailyQuestions} />;
}
