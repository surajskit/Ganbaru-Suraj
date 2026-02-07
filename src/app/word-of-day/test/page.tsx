//src/app/word-of-day/weekly/page.tsx
import Link from "next/link";

export default function TestHomePage() {
  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Word of the Day – Tests</h1>

      <div className="space-y-4">
        <Link
          href="/word-of-day/test/daily"
          className="block p-4 border rounded-lg hover:bg-gray-50"
        >
          📅 Daily Test
        </Link>

        <Link
          href="/word-of-day/test/weekly"
          className="block p-4 border rounded-lg hover:bg-gray-50"
        >
          🗓 Weekly Test
        </Link>

        <Link
          href="/word-of-day/test/monthly"
          className="block p-4 border rounded-lg hover:bg-gray-50"
        >
          📆 Monthly Test
        </Link>
      </div>
    </div>
  );
}
