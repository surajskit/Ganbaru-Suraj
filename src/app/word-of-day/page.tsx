import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import { JAN_WORDS } from "@/data/wordOfDay/jan";

type SP = {
  month?: string;
  day?: string;
};

export default async function WordOfDayPage({
  searchParams,
}: {
  searchParams: Promise<SP> | SP;
}) {
  const sp = await Promise.resolve(searchParams);

  const month = (sp.month || "jan").toLowerCase();
  const day = Number(sp.day || "1");

  let words: {
    jp: string;
    romaji: string;
    en: string;
    example: string;
    exampleEn: string;
  }[] = [];

  if (month === "jan") {
    words = JAN_WORDS[day] || [];
  }

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        {/* Left */}
        <Sidebar />

        {/* Center */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h1 className="text-xl font-extrabold">
            Word of the Day — {month.toUpperCase()} {day}
          </h1>

          {words.length === 0 ? (
            <p className="mt-4 text-slate-700">No words added for this day yet.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {words.map((word, i) => (
                <div
                  key={i}
                  className="border border-slate-200 rounded-2xl p-4 bg-slate-50"
                >
                  <div className="text-xl font-extrabold text-blue-600">
                    {i + 1}. {word.jp}
                  </div>

                  <div className="mt-1 text-slate-700">{word.romaji}</div>

                  <div className="mt-1 font-semibold">{word.en}</div>

                  <div className="mt-3 text-sm">
                    <div>{word.example}</div>
                    <div className="text-slate-500">{word.exampleEn}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <RightSidebar />
      </section>
    </main>
  );
}
