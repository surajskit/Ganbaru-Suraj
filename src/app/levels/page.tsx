import Link from "next/link";
import Navbar from "@/components/Navbar";
import { JLPT_LEVELS, toLevelLabel } from "@/data/jlpt";

export default function LevelsPage() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-2xl font-extrabold text-slate-900">JLPT Levels</h1>

        <div className="mt-4 flex flex-wrap gap-3">
          {JLPT_LEVELS.map((lvl) => (
            <Link
              key={lvl}
              href={`/levels/${lvl}`}
              className="px-4 py-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 font-extrabold"
            >
              {toLevelLabel(lvl)}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
