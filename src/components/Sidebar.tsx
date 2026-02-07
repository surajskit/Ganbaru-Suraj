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
  if (pathname.startsWith("/test")) return "test";
  return "jlpt"; // "/" and "/levels/.."
}

function monthKeyToNumber(key: string) {
  const index = MONTHS.findIndex((m) => m.key === key);
  if (index === -1) return "01";
  return String(index + 1).padStart(2, "0");
}

function parseDateParam(dateParam: string | null) {
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
  // ✅ Word of the Day/Test Sidebar (Selected month fixed on top + month list below)
  // =========================
  const today = new Date();
  const todayMonthKey = today.toLocaleString("default", { month: "short" }).toLowerCase();
  const todayDay = today.getDate();
  const todayYear = today.getFullYear();

  const parsedDate = parseDateParam(sp.get("date"));
  const monthKeyFromQuery = (sp.get("month") || "").toLowerCase();
  const dayFromQuery = Number(sp.get("day"));

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

  const isTestMode = mode === "test";
  const basePath = isTestMode ? "/test" : "/word-of-day";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.menu}>
        <div className="mb-4">
          <Link
            href={`${basePath}?month=${currentMonth.key}&day=1`}
            className={`${styles.item} ${styles.active}`}
          >
            <span className={styles.label}>{currentMonth.label}</span>
          </Link>

          <div className="mt-2 grid grid-cols-6 gap-2 px-1">
            {Array.from({ length: currentMonth.days }, (_, i) => i + 1).map((d) => {
              const isActive = d === activeDay;
              const dayValue = String(d).padStart(2, "0");
              const dayHref = isTestMode
                ? `/test/selected?date=${year}-${monthNumber}-${dayValue}`
                : `/word-of-day?month=${currentMonth.key}&day=${d}`;

              return (
                <Link
                  key={d}
                  href={dayHref}
                  className={`text-center text-xs font-extrabold rounded-xl border px-2 py-2 ${
                    isActive
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {d}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-1">
          {MONTHS.map((m) => {
            const isActiveMonth = m.key === currentMonth.key;

            return (
              <Link
                key={m.key}
                href={`${basePath}?month=${m.key}&day=1`}
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
