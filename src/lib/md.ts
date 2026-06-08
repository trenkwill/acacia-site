import { marked } from "marked";

marked.setOptions({
  breaks: false,
  gfm: true,
});

/** Render a Markdown string to HTML (block-level). */
export function mdHtml(input: string | undefined | null): string {
  if (!input) return "";
  return marked.parse(input, { async: false }) as string;
}
