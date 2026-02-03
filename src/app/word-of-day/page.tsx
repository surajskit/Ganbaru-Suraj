import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

type Word = {
  position: number;
  kanji: string;
  kana: string;
  en: string;
  exampleJa?: string | null;
  exampleEn?: string | null;
};

export default async function Home() {
  const date = todayISO();

  let words: Word[] = [];

  try {
    const res = await fetch(
      `${API_BASE}/api/word-of-day?date=${date}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    words = data.words || [];
  } catch {
    words = [];
  }

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        {/* Left */}
        <Sidebar />

        {/* Center */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            Progress
          </h2>

          <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full w-1/2 bg-blue-600 rounded-full" />
          </div>

          <button className="mt-4 w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold">
            Continue learning
          </button>

          {/* 🔑 10 Words of the Day */}
          <div className="mt-6">
            <h3 className="font-extrabold text-slate-900">
              10 Words of the Day
            </h3>

            {words.length === 0 ? (
              <p className="mt-3 text-sm text-slate-600">
                No words added for today yet.
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {words.map((w) => (
                  <div
                    key={w.position}
                    className="border border-slate-200 rounded-2xl p-3 bg-slate-50"
                  >
                    <div className="font-extrabold text-slate-900">
                      {w.position}. {w.kanji}
                    </div>

                    <div className="mt-1 text-slate-700 font-semibold">
                      {w.kana}
                    </div>

                    <div className="mt-1 text-sm font-semibold">
                      {w.en}
                    </div>

                    {(w.exampleJa || w.exampleEn) && (
                      <div className="mt-2 text-sm">
                        {w.exampleJa && <div>{w.exampleJa}</div>}
                        {w.exampleEn && (
                          <div className="text-slate-500">
                            {w.exampleEn}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <RightSidebar />
      </section>
    </main>
  );
}
