import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

const PLACEHOLDER_PHRASES: Record<
  string,
  { jp: string; romaji: string; en: string }[]
> = {
  shopping: [
    { jp: "これをください。", romaji: "kore o kudasai", en: "Please give me this." },
    { jp: "いくらですか。", romaji: "ikura desu ka", en: "How much is it?" },
    { jp: "これを見せてください。", romaji: "kore o misete kudasai", en: "Please show me this." },
    { jp: "もう少し安いですか。", romaji: "mou sukoshi yasui desu ka", en: "Is it a little cheaper?" },
    { jp: "カードで払えますか。", romaji: "kaado de haraemasu ka", en: "Can I pay by card?" },
    { jp: "現金です。", romaji: "genkin desu", en: "Cash, please." },
    { jp: "袋をください。", romaji: "fukuro o kudasai", en: "Please give me a bag." },
    { jp: "サイズはありますか。", romaji: "saizu wa arimasu ka", en: "Do you have a size?" },
    { jp: "これを試してもいいですか。", romaji: "kore o tameshite mo ii desu ka", en: "May I try this?" },
    { jp: "ありがとうございました。", romaji: "arigatou gozaimashita", en: "Thank you very much." },
  ],
};

function titleCaseTopic(topic: string) {
  return topic
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function EverydayPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const sp = await searchParams;
  const topic = sp.topic?.toLowerCase();
  const phrases = topic ? PLACEHOLDER_PHRASES[topic] || [] : [];

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4 items-start">
        <Sidebar />

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
              <h1 className="text-xl font-extrabold">{titleCaseTopic(topic)}</h1>
              <p className="mt-2 text-slate-700">
                {phrases.length || 10} useful phrases for this situation.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(phrases.length ? phrases : Array.from({ length: 10 })).map(
                  (p: any, i) => (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-2xl p-4 bg-slate-50"
                    >
                      <div className="text-sm font-extrabold text-slate-900">
                        {i + 1}.
                      </div>

                      <div className="mt-2 text-lg font-extrabold text-blue-600">
                        {p?.jp || "（Japanese phrase）"}
                      </div>

                      <div className="text-slate-700">{p?.romaji || "romaji"}</div>

                      <div className="text-slate-500 text-sm">
                        {p?.en || "English meaning"}
                      </div>
                    </div>
                  )
                )}
              </div>

              {phrases.length === 0 && (
                <p className="mt-4 text-sm text-slate-500">
                  No phrases added for this topic yet.
                </p>
              )}
            </>
          )}
        </div>

        <RightSidebar />
      </section>
    </main>
  );
}
