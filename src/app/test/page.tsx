import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

const MONTHS = [
  { key: "jan", label: "January", days: 31 },
  { key: "feb", label: "February", days: 28 },
  { key: "mar", label: "March", days: 31 },
  { key: "apr", label: "April", days: 30 },
  { key: "may", label: "May", days: 31 },
  { key: "jun", label: "June", days: 30 },
  { key: "jul", label: "July", days: 31 },
  { key: "aug", label: "August", days: 31 },
  { key: "sep", label: "September", days: 30 },
  { key: "oct", label: "October", days: 31 },
  { key: "nov", label: "November", days: 30 },
  { key: "dec", label: "December", days: 31 },
];

function monthKeyToNumber(key: string) {
  const index = MONTHS.findIndex((m) => m.key === key);
  if (index === -1) return "01";
  return String(index + 1).padStart(2, "0");
}

function parseDateParam(dateParam?: string) {
  if (!dateParam) return null;
  const parts = dateParam.split("-");
  if (parts.length !== 3) return null;
  const [yearRaw, monthRaw, dayRaw] = parts;
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

export default async function TestHomePage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; day?: string; date?: string }>;
}) {
  const sp = await searchParams;
  const today = new Date();
  const todayMonthKey = today.toLocaleString("default", { month: "short" }).toLowerCase();
  const todayDay = today.getDate();
  const todayYear = today.getFullYear();

  const parsedDate = parseDateParam(sp.date);
  const monthKeyFromQuery = (sp.month || "").toLowerCase();
  const dayFromQuery = Number(sp.day);

  const monthKey =
    MONTHS.find((m) => m.key === monthKeyFromQuery)?.key ||
    (parsedDate ? MONTHS[parsedDate.month - 1]?.key : null) ||
    todayMonthKey;
  const activeDay = parsedDate
    ? parsedDate.day
    : Number.isFinite(dayFromQuery) && dayFromQuery > 0
      ? dayFromQuery
      : todayDay;
  const year = parsedDate ? parsedDate.year : todayYear;

  const currentMonth = MONTHS.find((m) => m.key === monthKey) || MONTHS[0];
  const monthNumber = monthKeyToNumber(currentMonth.key);

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        <Sidebar />

        <div className="space-y-4">
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

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Daily calendar</h2>
              <span className="text-xs font-semibold text-slate-500">
                {currentMonth.label} {activeDay}
              </span>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: currentMonth.days }, (_, i) => i + 1).map((d) => {
                  const isActive = d === activeDay;
                  const dayValue = String(d).padStart(2, "0");

                  return (
                    <Link
                      key={d}
                      href={`/test/daily?date=${year}-${monthNumber}-${dayValue}`}
                      className={`text-center text-xs font-extrabold rounded-xl border px-2 py-2 ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {d}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {MONTHS.map((m) => {
                const isActiveMonth = m.key === currentMonth.key;
                return (
                  <Link
                    key={m.key}
                    href={`/test?month=${m.key}&day=1`}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                      isActiveMonth
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {m.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <RightSidebar />
      </section>
    </main>
  );
}
