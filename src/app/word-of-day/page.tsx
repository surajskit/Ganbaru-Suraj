import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

type SP = { month?: string; day?: string };

const MONTH_NUM: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

async function getWordOfDay(dateStr: string) {
  const base = process.env.API_BASE_URL || "http://localhost:3005";
  const res = await fetch(`${base}/api/word-of-day?date=${dateStr}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    item: null | {
      kanji: string;
      kana: string;
      en: string;
      exampleJa?: string | null;
      exampleEn?: string | null;
    };
  };

  return data.item;
}

export default async function WordOfDayPage({
  searchParams,
}: {
  searchParams: Promise<SP> | SP;
}) {
  const sp = await Promise.resolve(searchParams);

  const monthKey = (sp.month || "jan").toLowerCase();
  const day = Number(sp.day || "1");

  const monthNum = MONTH_NUM[monthKey] ?? 1;

  // Use current year (you can change later if you add year param)
  const year = new Date().getFullYear();

  const dateStr = `${year}-${pad2(monthNum)}-${pad2(day)}`;

  const item = await getWordOfDay(dateStr);

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        {/* Left */}
        <Sidebar />

        {/* Center */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h1 className="text-xl font-extrabold">
            Word of the Day — {monthKey.toUpperCase()} {day}
          </h1>

          {!item ? (
            <p className="mt-4 text-slate-700">No words added for this day yet.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <div className="text-xl font-extrabold text-blue-600">
                  1. {item.kanji}
                </div>

                <div className="mt-1 text-slate-700 font-semibold">
                  {item.kana}
                </div>

                <div className="mt-2 font-semibold">{item.en}</div>

                <div className="mt-3 text-sm">
                  {item.exampleJa && <div>{item.exampleJa}</div>}
                  {item.exampleEn && (
                    <div className="text-slate-500">{item.exampleEn}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <RightSidebar />
      </section>
    </main>
  );
}
