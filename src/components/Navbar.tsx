//src/components/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "./Navbar.module.css";
import { JLPT_LEVELS, toLevelLabel } from "@/data/jlpt";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentLevel = useMemo(() => {
    const m = pathname.match(/^\/levels\/(n[1-5])\b/i);
    return m?.[1]?.toLowerCase();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-extrabold">
          <span className={styles.logo} />
          <span>Ganbaru Suraj</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 font-semibold text-slate-800">
          <Link href="/" className="hover:text-slate-950">
            Home
          </Link>

          {/* JLPT dropdown */}
          <div className="relative">
            <button
              type="button"
              className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white"
              onClick={() => setOpen((v) => !v)}
            >
              JLPT Levels{" "}
              <span className="opacity-70">
                {currentLevel ? `(${toLevelLabel(currentLevel)})` : ""}
              </span>{" "}
              ▾
            </button>

            {open && (
              <div className={styles.dropdown} onMouseLeave={() => setOpen(false)}>
                {JLPT_LEVELS.map((lvl) => (
                  <Link
                    key={lvl}
                    href={`/levels/${lvl}`}
                    onClick={() => setOpen(false)}
                    className={styles.dropItem}
                  >
                    {toLevelLabel(lvl)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/everyday" className="hover:text-slate-950">
            Everyday Life
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/word-of-day" className="hover:text-slate-950">
              Word of the Day
            </Link>

            {/* Search next to Word of the Day */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white">
              <span className="opacity-60">🔎</span>
              <input
                className="w-64 outline-none text-sm"
                placeholder="Search vocabulary, kanji, grammar..."
              />
            </div>
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
