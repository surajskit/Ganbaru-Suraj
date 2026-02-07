import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import Sidebar from "@/components/Sidebar";
import TestQuiz from "@/components/TestQuiz";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";

type Mcq = {
  question: string;
  options: string[];
  correctAnswer: string;
};

async function fetchWeeklyMcqs(): Promise<Mcq[]> {
  try {
    const res = await fetch(`${API_BASE}/api/test/weekly`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function WeeklyTestPage() {
  const mcqs = await fetchWeeklyMcqs();

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        <Sidebar />

        <div className="space-y-4">
          <TestQuiz
            title="Weekly Test"
            description="Questions from this week."
            questions={mcqs}
          />
        </div>

        <RightSidebar />
      </section>
    </main>
  );
}
