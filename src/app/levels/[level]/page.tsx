import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import Vocabulary from "@/components/sections/Vocabulary";
import Kanji from "@/components/sections/Kanji";
import Grammar from "@/components/sections/Grammar";
import { toLevelLabel, safeLevel } from "@/data/jlpt";

export default async function LevelPage({
  params,
  searchParams,
}: {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ section?: string }>;
}) {
  const { level } = await params;
  const { section } = await searchParams;

  const lv = safeLevel(level);
  const label = toLevelLabel(lv);

  function renderSection() {
    switch (section) {
      case "vocabulary":
        return <Vocabulary />;
      case "kanji":
        return <Kanji />;
      case "grammar":
        return <Grammar />;
      default:
        return (
          <div>
            <h2 className="text-xl font-extrabold">
              {label} Overview
            </h2>
            <p className="mt-2 text-slate-700">
              Select a section from the left.
            </p>
          </div>
        );
    }
  }

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        <Sidebar />

        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          {renderSection()}
        </div>

        <RightSidebar />
      </section>
    </main>
  );
}
