// lib/summarize.ts
export function generateSummary(blogText: string): string {
  if (!blogText || typeof blogText !== "string") {
    return "No content available for summarization.";
  }

  const blacklist = ["buy now", "claim your bonus", "free gift", "amazon", "audible", "target", "barnes & noble"];
  const sentences = blogText
    .split(".")
    .map(s => s.trim())
    .filter(s => s.length > 20 && !blacklist.some(term => s.toLowerCase().includes(term)));

  return sentences.slice(0, 3).join(". ") + ".";
}
