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
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLevel = useMemo(() => {
    const m = pathname.match(/^\/levels\/(n[1-5])\b/i);
    return m?.[1]?.toLowerCase();
  }, [pathname]);

  return (
    <header className="app-nav sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className={styles.navbar}>
        {/* Logo */}
          <Link href="/" className={styles.brand}>
            <span className={styles.logo} />
            <span className={styles.brandText}>Ganbaru Daily</span>
          </Link>

        {/* Nav */}
          <nav className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>

          {/* JLPT dropdown */}
            <div className={styles.dropdownWrap}>
              <button
                type="button"
                className={styles.navPill}
                onClick={() => setOpen((v) => !v)}
              >
                JLPT Levels
                <span className={styles.navPillMeta}>
                  {currentLevel ? toLevelLabel(currentLevel) : "All"}
                </span>
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

            <Link href="/everyday" className={styles.navLink}>
              Everyday Life
            </Link>

            <Link href="/word-of-day" className={styles.navLink}>
              Word of the Day
            </Link>
          </nav>

        {/* Right actions */}
          <div className={styles.actions}>
            <div className={styles.search}>
              <span className={styles.searchIcon}>⌕</span>
              <input
                className={styles.searchInput}
                placeholder="Search vocabulary, kanji, grammar..."
              />
            </div>
            <button className="btn-primary px-4 py-2 rounded-xl">Login</button>
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
              <span className={styles.mobileBar} />
              <span className={styles.mobileBar} />
              <span className={styles.mobileBar} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileSearch}>
              <span className={styles.searchIcon}>⌕</span>
              <input
                className={styles.searchInput}
                placeholder="Search vocabulary, kanji, grammar..."
              />
            </div>

            <Link href="/" className={styles.mobileLink}>
              Home
            </Link>

            <div className={styles.mobileSection}>
              <span className={styles.mobileLabel}>JLPT Levels</span>
              <div className={styles.mobileChips}>
                {JLPT_LEVELS.map((lvl) => (
                  <Link
                    key={lvl}
                    href={`/levels/${lvl}`}
                    onClick={() => setMobileOpen(false)}
                    className={styles.mobileChip}
                  >
                    {toLevelLabel(lvl)}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/everyday" className={styles.mobileLink}>
              Everyday Life
            </Link>
            <Link href="/word-of-day" className={styles.mobileLink}>
              Word of the Day
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
