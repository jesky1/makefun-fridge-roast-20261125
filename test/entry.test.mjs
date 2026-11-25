import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { ENTRY, MAX_ENTRY_CHARS, validateEntry } from "../main.ts";

const repoRoot = join(fileURLToPath(import.meta.url), "..", "..");
const mainPath = join(repoRoot, "main.ts");

function runProgram(outDir) {
  return spawnSync(process.execPath, [mainPath], {
    cwd: repoRoot,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    encoding: "utf8",
  });
}

test("entry passes the gate: 1-200 chars, single line, not whitespace-only", () => {
  assert.equal(validateEntry(ENTRY), null);
  const chars = [...ENTRY].length;
  assert.ok(chars >= 1 && chars <= MAX_ENTRY_CHARS, `length ${chars}`);
  assert.equal(ENTRY.trim().length > 0, true);
  assert.equal(/[\r\n]/.test(ENTRY), false);
});

test("program writes entry.txt with the exact entry and no trailing newline", () => {
  const out = mkdtempSync(join(tmpdir(), "fridge-roast-"));
  try {
    const run = runProgram(out);
    assert.equal(run.status, 0, run.stderr);
    const bytes = readFileSync(join(out, "entry.txt"));
    assert.equal(bytes.toString("utf8"), ENTRY);
    assert.equal(bytes[bytes.length - 1], 0x2e); // ends with ".", not "\n"
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

test("program is deterministic: two runs produce identical bytes", () => {
  const outA = mkdtempSync(join(tmpdir(), "fridge-roast-a-"));
  const outB = mkdtempSync(join(tmpdir(), "fridge-roast-b-"));
  try {
    assert.equal(runProgram(outA).status, 0);
    assert.equal(runProgram(outB).status, 0);
    const a = readFileSync(join(outA, "entry.txt"));
    const b = readFileSync(join(outB, "entry.txt"));
    assert.ok(a.equals(b));
  } finally {
    rmSync(outA, { recursive: true, force: true });
    rmSync(outB, { recursive: true, force: true });
  }
});
