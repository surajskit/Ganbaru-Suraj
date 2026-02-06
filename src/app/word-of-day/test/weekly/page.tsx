import TestPage from "../components/TestPage";
import { weeklyQuestions } from "@/data/testQuestions";

export default function WeeklyTestPage() {
  return <TestPage questions={weeklyQuestions} />;
}
