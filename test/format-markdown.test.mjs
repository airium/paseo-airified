import assert from "node:assert/strict";
import { test } from "node:test";
import { formatThinkingMarkdown } from "../client/format-markdown.ts";

test("separates concatenated summary labels without stripping Markdown emphasis", () => {
  assert.equal(
    formatThinkingMarkdown("**Checking layout****Checking references****Checking layout**"),
    "**Checking layout** · **Checking references** · **Checking layout**",
  );
  assert.equal(
    formatThinkingMarkdown("**First****Second**\n**Third**"),
    "**First** · **Second** · **Third**",
  );
});

test("preserves existing separators while the next label streams", () => {
  for (const suffix of ["", "C", "Checking layout", "Checking layout*", "Checking layout**"]) {
    assert.equal(
      formatThinkingMarkdown(`**First****Second****${suffix}`),
      `**First** · **Second** · **${suffix}`,
    );
  }
  assert.equal(formatThinkingMarkdown("**First****Second***"), "**First** · **Second***");
});

test("leaves other reasoning Markdown unchanged", () => {
  const samples = [
    "",
    "A plain reasoning paragraph.",
    "**One topic**",
    "**First** **Second**",
    "**First**\n\n**Second**",
    "**First****Second** followed by ordinary prose.",
    "**First****Second**\n\nA paragraph explaining the reasoning.",
    "Before **first****second** after.",
    "# Heading\n\n**First****Second**",
    "- **First****Second**\n- Another list item",
    "****",
    "***Emphasis***",
    "`**First****Second**`",
    "```text\n**First****Second**\n```",
    "~~~text\n**First****Second**\n~~~",
    "\\*\\*First\\*\\*\\*\\*Second\\*\\*",
    "[**First****Second**](https://example.com)",
    "| First | Second |\n| --- | --- |\n| **A****B** | C |",
    "**A multiline\nlabel****Another**",
  ];

  for (const text of samples) {
    assert.equal(formatThinkingMarkdown(text), text);
  }
});
