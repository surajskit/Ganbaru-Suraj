export const JLPT_LEVELS = ["n5", "n4", "n3", "n2", "n1"] as const;

export const JLPT_SECTIONS = [
  { key: "vocabulary", label: "Vocabulary", icon: "📘" },
  { key: "kanji", label: "Kanji", icon: "🈶" },
  { key: "grammar", label: "Grammar", icon: "🧩" },
  { key: "reading", label: "Reading", icon: "📖" },
  { key: "listening", label: "Listening", icon: "🎧" },
  { key: "exercise", label: "Exercise", icon: "✍️" },
  { key: "test", label: "Test", icon: "✅" },
] as const;

export function toLevelLabel(level?: string) {
  const l = (level || "n5").toLowerCase();
  return l.toUpperCase(); // n5 -> N5
}

export function safeLevel(level?: string) {
  const l = (level || "n5").toLowerCase();
  return (["n5", "n4", "n3", "n2", "n1"] as const).includes(l as any) ? l : "n5";
}
