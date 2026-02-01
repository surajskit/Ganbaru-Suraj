import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

export default function EverydayPage({
  searchParams,
}: {
  searchParams: { topic?: string };
}) {
  const topic = searchParams.topic;

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        {/* Left */}
        <Sidebar />

        {/* Center */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          {!topic ? (
            <>
              <h1 className="text-xl font-extrabold">Everyday Life Japanese</h1>
              <p className="mt-2 text-slate-700">
                Select a topic from the left sidebar.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-extrabold">
                {topic.replaceAll("-", " ")}
              </h1>
              <p className="mt-2 text-slate-700">
                (Next) We will show phrases + vocabulary cards here.
              </p>
            </>
          )}
        </div>

        {/* Right */}
        <RightSidebar />
      </section>
    </main>
  );
}
