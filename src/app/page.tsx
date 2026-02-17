//src/app/page.tsx

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import WordOfDayPage from "./word-of-day/page";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        {/* Left */}
        <Sidebar />

        {/* Center */}

      <div>word of the day</div>

        {/* Right */}
        <RightSidebar />
      </section>
    </main>
  );
}
