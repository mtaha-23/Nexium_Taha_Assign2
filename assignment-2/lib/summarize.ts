// lib/summarize.ts

export function generateSummary(blogText: string): string {
  // Simulated static summary logic
  const sentences = blogText.split(".").filter((line) => line.trim().length > 0)
  return sentences.slice(0, 2).join(". ") + "."
}
