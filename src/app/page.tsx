import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

const WORDS = [
  { jp: "たべもの", romaji: "tabemono", en: "Food" },
  { jp: "いきます", romaji: "ikimasu", en: "To go" },
  { jp: "みる", romaji: "miru", en: "To see/watch" },
  { jp: "はなす", romaji: "hanasu", en: "To speak/talk" },
  { jp: "かう", romaji: "kau", en: "To buy" },
  { jp: "のむ", romaji: "nomu", en: "To drink" },
  { jp: "きく", romaji: "kiku", en: "To listen/ask" },
  { jp: "よむ", romaji: "yomu", en: "To read" },
  { jp: "かく", romaji: "kaku", en: "To write" },
  { jp: "する", romaji: "suru", en: "To do" },
];

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        {/* Left */}
        <Sidebar />

        {/* Center */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h2 className="text-lg font-extrabold text-slate-900">Progress</h2>

          <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full w-1/2 bg-blue-600 rounded-full" />
          </div>

          <button className="mt-4 w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold">
            Continue learning
          </button>

          <div className="mt-6">
            <h3 className="font-extrabold text-slate-900">10 Words of the Day</h3>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {WORDS.map((w, i) => (
                <div
                  key={w.jp}
                  className="border border-slate-200 rounded-2xl p-3 bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-slate-900">
                      {i + 1}. {w.jp}
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-white border border-slate-200">
                      N5
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-slate-700">
                    <div className="opacity-80">{w.romaji}</div>
                    <div className="font-semibold">{w.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <RightSidebar />
      </section>
    </main>
  );
}
