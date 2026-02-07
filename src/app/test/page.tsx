import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

export default function TestHomePage() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        <Sidebar />

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h1 className="text-2xl font-extrabold text-slate-900">Tests</h1>
          <p className="mt-2 text-slate-600">
            Pick a test type to start your MCQ practice.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/test/daily"
              className="rounded-2xl border border-slate-200 p-4 hover:border-slate-400"
            >
              <div className="text-lg font-semibold text-slate-900">Daily</div>
              <div className="mt-2 text-sm text-slate-600">
                Practice with today&#39;s words.
              </div>
            </Link>

            <Link
              href="/test/weekly"
              className="rounded-2xl border border-slate-200 p-4 hover:border-slate-400"
            >
              <div className="text-lg font-semibold text-slate-900">Weekly</div>
              <div className="mt-2 text-sm text-slate-600">
                Review the week&#39;s vocabulary.
              </div>
            </Link>

            <Link
              href="/test/monthly"
              className="rounded-2xl border border-slate-200 p-4 hover:border-slate-400"
            >
              <div className="text-lg font-semibold text-slate-900">Monthly</div>
              <div className="mt-2 text-sm text-slate-600">
                Challenge yourself with the month&#39;s set.
              </div>
            </Link>
          </div>
        </div>

        <RightSidebar />
      </section>
    </main>
  );
}
