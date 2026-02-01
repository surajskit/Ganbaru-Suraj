import styles from "./RightSidebar.module.css";

export default function RightSidebar() {
  return (
    <aside className="grid gap-3 sticky top-24 h-fit">
      {/* Card 1: My Progress */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900">My Progress</h3>
          <div className={styles.ring} aria-label="50 percent progress">
            <span className={styles.ringText}>50%</span>
          </div>
        </div>

        <div className="mt-3 text-sm text-slate-700 space-y-2">
          <div className="flex justify-between">
            <span className="opacity-70">Streak</span>
            <span className="font-bold">3 days</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Words learned</span>
            <span className="font-bold">120</span>
          </div>
        </div>
      </div>

      {/* Card 2: Follow us */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <h3 className="font-extrabold text-slate-900">Follow us</h3>

        <div className="mt-3 grid grid-cols-4 gap-2">
          <button className={styles.socialBtn} title="Facebook">📘</button>
          <button className={styles.socialBtn} title="Instagram">📷</button>
          <button className={styles.socialBtn} title="TikTok">🎵</button>
          <button className={styles.socialBtn} title="YouTube">▶️</button>
        </div>
      </div>
    </aside>
  );
}
