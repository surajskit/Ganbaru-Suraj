"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Sidebar.module.css";
import { JLPT_SECTIONS, safeLevel, toLevelLabel } from "@/data/jlpt";

function getLevel(pathname: string) {
  const m = pathname.match(/^\/levels\/(n[1-5])\b/i);
  return safeLevel(m?.[1]?.toLowerCase());
}

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = (searchParams.get("section") || "").toLowerCase();

  const level = getLevel(pathname);
  const label = toLevelLabel(level);

  return (
    <aside className="bg-white border border-slate-200 rounded-2xl p-3 sticky top-24 h-fit">
      <div className="px-2 py-2 font-extrabold text-slate-900">
        {label} Learning
      </div>

      <div className="mt-2 flex flex-col gap-1">
        {JLPT_SECTIONS.map((s) => {
          const isActive = active === s.key;
          return (
            <Link
              key={s.key}
              href={`/levels/${level}?section=${s.key}`}
              className={`${styles.item} ${isActive ? styles.active : ""}`}
            >
              <span className="w-6 text-center">{s.icon}</span>
              <span>
                {label} - {s.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
