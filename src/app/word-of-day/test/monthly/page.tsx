import TestPage from "../components/TestPage";
import { monthlyQuestions } from "@/data/testQuestions";

export default function MonthlyTestPage() {
  return <TestPage questions={monthlyQuestions} />;
}
