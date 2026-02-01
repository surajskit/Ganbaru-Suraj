import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import { toLevelLabel, safeLevel } from "@/data/jlpt";

export default async function LevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const lv = safeLevel(level);
  const label = toLevelLabel(lv);

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        <Sidebar />

        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <h1 className="text-xl font-extrabold">{label} Dashboard</h1>
          <p className="mt-2 text-slate-700">
            Sidebar will automatically show: <b>{label} - Vocabulary / Kanji / Grammar...</b>
          </p>

          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="font-extrabold">Next step:</div>
            <div className="mt-1 text-slate-700">
              Show content based on <code>?section=</code> (Vocabulary, Kanji, etc.)
            </div>
          </div>
        </div>

        <RightSidebar />
      </section>
    </main>
  );
}
