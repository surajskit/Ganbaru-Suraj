"use client";  // This line marks the component as a client-side component

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";  // These hooks require a client-side component
import styles from "./Sidebar.module.css";
import { safeLevel, toLevelLabel } from "@/data/jlpt";
import {
  FiBookOpen,
  FiGrid,
  FiEdit3,
  FiFileText,
  FiHeadphones,
  FiCheckSquare,
  FiAward,
} from "react-icons/fi";

const JLPT_SECTIONS_UI = [
  { key: "vocabulary", label: "Vocabulary", Icon: FiBookOpen },
  { key: "kanji", label: "Kanji", Icon: FiGrid },
  { key: "grammar", label: "Grammar", Icon: FiEdit3 },
  { key: "reading", label: "Reading", Icon: FiFileText },
  { key: "listening", label: "Listening", Icon: FiHeadphones },
  { key: "exercise", label: "Exercise", Icon: FiCheckSquare },
  { key: "test", label: "Test", Icon: FiAward },
];

const EVERYDAY_TOPICS = [
  { key: "shopping", label: "Shopping" },
  { key: "restaurant", label: "Restaurant" },
  { key: "transportation", label: "Transportation" },
  { key: "hospital-pharmacy", label: "Hospital / Pharmacy" },
  { key: "city-office-paperwork", label: "City office & paperwork" },
  { key: "work-office", label: "Work / Office Japanese" },
  { key: "renting-apartment", label: "Renting / Apartment" },
  { key: "emergency-situations", label: "Emergency situations" },
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
  return "jlpt"; // "/" and "/levels/.."
}

export default function Sidebar() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const mode = getMode(pathname);

  // =========================
  // ✅ JLPT Sidebar (Home + /levels)
  // =========================
  if (mode === "jlpt") {
    const levelFromUrl = pathname.startsWith("/levels")
      ? pathname.split("/")[2]
      : "n5"; // Home default

    const level = safeLevel(levelFromUrl);
    const levelLabel = toLevelLabel(level);

    const active = (sp.get("section") || "vocabulary").toLowerCase();

    return (
      <aside className={styles.sidebar}>
        <div className={styles.menu}>
          {JLPT_SECTIONS_UI.map(({ key, label, Icon }) => (
            <Link
              key={key}
              href={`/levels/${level}?section=${key}`}
              className={`${styles.item} ${active === key ? styles.active : ""}`}
            >
              <span className={styles.iconWrap}>
                <Icon className={styles.icon} />
              </span>
              <span className={styles.label}>
                {levelLabel} - {label}
              </span>
            </Link>
          ))}
        </div>
      </aside>
    );
  }

  // =========================
  // ✅ Everyday Life Sidebar
  // =========================
  if (mode === "everyday") {
    const active = (sp.get("topic") || "").toLowerCase();

    return (
      <aside className={styles.sidebar}>
        <div className={styles.menu}>
          {EVERYDAY_TOPICS.map((t) => (
            <Link
              key={t.key}
              href={`/everyday?topic=${t.key}`}
              className={`${styles.item} ${active === t.key ? styles.active : ""}`}
            >
              <span className={styles.label}>{t.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    );
  }

  // =========================
  // ✅ Word of the Day Sidebar (Selected month fixed on top + month list below)
  // =========================
  // Get today's date to default to the current month and day
  const today = new Date();
  const todayMonthKey = today.toLocaleString("default", { month: "short" }).toLowerCase();
  const todayDay = today.getDate();

  const monthKey = (sp.get("month") || todayMonthKey).toLowerCase();
  const activeDay = Number(sp.get("day") || todayDay);

  const currentMonth = MONTHS.find((m) => m.key === monthKey) || MONTHS[0];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.menu}>
        {/* ✅ Top fixed: selected month + day grid */}
        <div className="mb-4">
          <Link
            href={`/word-of-day?month=${currentMonth.key}&day=1`}
            className={`${styles.item} ${styles.active}`}
          >
            <span className={styles.label}>{currentMonth.label}</span>
          </Link>

          <div className="mt-2 grid grid-cols-6 gap-2 px-1">
            {Array.from({ length: currentMonth.days }, (_, i) => i + 1).map((d) => {
              const isActive = d === activeDay;

              return (
                <Link
                  key={d}
                  href={`/word-of-day?month=${currentMonth.key}&day=${d}`}
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

        {/* ✅ Month list below (no grid here) */}
        <div className="space-y-1">
          {MONTHS.map((m) => {
            const isActiveMonth = m.key === currentMonth.key;

            return (
              <Link
                key={m.key}
                href={`/word-of-day?month=${m.key}&day=1`}
                className={`${styles.item} ${isActiveMonth ? styles.active : ""}`}
              >
                <span className={styles.label}>{m.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
