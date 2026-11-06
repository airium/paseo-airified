// Codex can concatenate bold summary labels without separators. Restrict cleanup to
// label-only content; ordinary Markdown (including prose and code) passes through.
// An unfinished final label is allowed so separators stay stable during streaming.
const TOPIC_LABELS = /^\s*(?:\*\*[^*\r\n]+\*\*\s*)+(?:\*\*[^*\r\n]*\*?|\*)?\s*$/u;

export function formatThinkingMarkdown(text: string): string {
  if (!text.includes("****") || !TOPIC_LABELS.test(text)) return text;

  return text.replace(/\*\*\s*\*\*/g, "** · **");
}
