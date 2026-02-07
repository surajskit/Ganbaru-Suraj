import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";

const MONTH_TO_NUM: Record<string, string> = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  oct: "10",
  nov: "11",
  dec: "12",
};

type Word = {
  position: number;
  kanji: string;
  kana: string;
  en: string;
  exampleJa?: string | null;
  exampleEn?: string | null;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default async function WordOfDayPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; day?: string; year?: string }>;
}) {
  const sp = await searchParams;

  // Check if searchParams exist, otherwise use today's date
  const monthKey = (sp.month || new Date().toLocaleString("default", { month: "short" })).toLowerCase();
  const dayNum = Number(sp.day || new Date().getDate());
  const year = Number(sp.year || new Date().getFullYear());

  const mm = MONTH_TO_NUM[monthKey] || "01";
  const dd = pad2(dayNum);

  const date = `${year}-${mm}-${dd}`;

  let words: Word[] = [];

  try {
    const res = await fetch(`${API_BASE}/api/word-of-day?date=${date}`, {
      cache: "no-store",
    });
    const data = await res.json();
    words = data.words || [];
  } catch {
    words = [];
  }

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        <Sidebar />

        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h1 className="text-xl font-extrabold">
            Word of the Day — {monthKey.toUpperCase()} {dayNum}
            <span className="ml-2 text-xs text-slate-500">({date})</span>
          </h1>

          {words.length === 0 ? (
            <p className="mt-4 text-slate-700">No words added for this day yet.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {words.map((word) => (
                <div
                  key={word.position}
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50"
                >
                  <div className="text-xl font-extrabold text-blue-600">
                    {word.position}. {word.kanji}
                  </div>

                  <div className="mt-1 text-slate-700 font-semibold">
                    {word.kana}
                  </div>

                  <div className="mt-2 font-semibold">{word.en}</div>

                  <div className="mt-3 text-sm">
                    {word.exampleJa && <div>{word.exampleJa}</div>}
                    {word.exampleEn && (
                      <div className="text-slate-500">{word.exampleEn}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <RightSidebar />
      </section>
    </main>
  );
}
