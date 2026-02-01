"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Sidebar.module.css";
import { JLPT_SECTIONS, safeLevel, toLevelLabel } from "@/data/jlpt";

const EVERYDAY_TOPICS = [
  { key: "shopping", label: "Shopping" },
  { key: "restaurant", label: "Restaurant" },
  { key: "transportation", label: "Transportation" },
  { key: "hospital-pharmacy", label: "Hospital / Pharmacy" },
  { key: "city-office-paperwork", label: "City office & paperwork" },
  { key: "work-office", label: "Work / Office Japanese" },
  { key: "renting-apartment", label: "Renting / Apartment" },
  { key: "emergency", label: "Emergency situations" },
];

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

function getMode(pathname: string) {
  if (pathname.startsWith("/everyday")) return "everyday";
  if (pathname.startsWith("/word-of-day")) return "word-of-day";
  if (pathname.startsWith("/levels")) return "jlpt";
  return "home";
}

export default function Sidebar() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const mode = getMode(pathname);

  // HOME (optional: show nothing or show quick links)
  if (mode === "home") {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.title}>Quick</div>
        <Link className={styles.item} href="/levels/n5?section=vocabulary">
          JLPT N5 - Vocabulary
        </Link>
        <Link className={styles.item} href="/everyday?topic=shopping">
          Everyday - Shopping
        </Link>
        <Link className={styles.item} href="/word-of-day?month=jan&day=1">
          Word of the Day
        </Link>
      </aside>
    );
  }

  // JLPT
  if (mode === "jlpt") {
    const level = safeLevel(pathname.split("/")[2]);
    const label = toLevelLabel(level);
    const active = (sp.get("section") || "").toLowerCase();

    return (
      <aside className={styles.sidebar}>
        <div className={styles.title}>{label} Learning</div>

        {JLPT_SECTIONS.map((s) => (
          <Link
            key={s.key}
            href={`/levels/${level}?section=${s.key}`}
            className={`${styles.item} ${active === s.key ? styles.active : ""}`}
          >
            {label} - {s.label}
          </Link>
        ))}
      </aside>
    );
  }

  // EVERYDAY
  if (mode === "everyday") {
    const active = (sp.get("topic") || "").toLowerCase();

    return (
      <aside className={styles.sidebar}>
        <div className={styles.title}>Everyday Life</div>

        {EVERYDAY_TOPICS.map((t) => (
          <Link
            key={t.key}
            href={`/everyday?topic=${t.key}`}
            className={`${styles.item} ${active === t.key ? styles.active : ""}`}
          >
            {t.label}
          </Link>
        ))}
      </aside>
    );
  }

  // WORD OF DAY
  const month = (sp.get("month") || "jan").toLowerCase();
  const day = Number(sp.get("day") || "1");

  const currentMonth = MONTHS.find((m) => m.key === month) || MONTHS[0];
  const daysArray = Array.from({ length: currentMonth.days }, (_, i) => i + 1);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>Word of the Day</div>

      {/* Month list */}
      <div className="grid grid-cols-2 gap-2">
        {MONTHS.map((m) => {
          const isActive = m.key === currentMonth.key;
          return (
            <Link
              key={m.key}
              href={`/word-of-day?month=${m.key}&day=1`}
              className={`${styles.item} ${isActive ? styles.active : ""}`}
            >
              {m.label}
            </Link>
          );
        })}
      </div>

      {/* Days grid (5x6 느낌) */}
      <div className="mt-3 grid grid-cols-6 gap-2">
        {daysArray.map((d) => {
          const isActiveDay = d === day;
          return (
            <Link
              key={d}
              href={`/word-of-day?month=${currentMonth.key}&day=${d}`}
              className={`text-center text-sm font-bold rounded-xl border px-2 py-2 ${
                isActiveDay
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              {d}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
