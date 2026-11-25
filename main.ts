// Fridge Roast: One Line, Biggest Laugh (make.fun program/v1, node22).
// The program writes one roast line to <output>/entry.txt. The gate
// requires UTF-8 text of 1-200 characters, not only whitespace, on a
// single line with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const MAX_ENTRY_CHARS = 200;

export const ENTRY =
  "My smart fridge updated its firmware, rebooted for twenty minutes, and came back convinced my milk expired in 2019.";

/** Why `text` fails the competition gate, or null when it passes. */
export function validateEntry(text: string): string | null {
  if (typeof text !== "string") return "entry is not a string";
  const chars = [...text];
  if (chars.length < 1) return "entry is empty";
  if (chars.length > MAX_ENTRY_CHARS) {
    return `entry is ${chars.length} characters, over the 200 limit`;
  }
  if (text.trim().length === 0) return "entry is only whitespace";
  if (/[\r\n]/.test(text)) return "entry must be a single line";
  return null;
}

export function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

export function main(): void {
  const problem = validateEntry(ENTRY);
  if (problem !== null) {
    throw new Error(`invalid entry: ${problem}`);
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
}

const invokedAsScript =
  process.argv[1] !== undefined &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedAsScript) {
  main();
}
