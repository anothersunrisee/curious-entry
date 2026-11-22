// Entry program for make.fun bounty "make-the-ai-judge-feel-curious-20261122-2311".
//
// Contract: the judge reads a single text file from the program's output
// directory. This program copies the entry text (entry.txt, sitting next to
// this file) into $MAKEFUN_OUTPUT_DIR/entry.txt (default /output when the
// environment variable is unset), then verifies the copy landed intact by
// comparing byte sizes before exiting. Node 22, standard library only.
// The copy is deliberately read-then-write (not a one-line copy) so the
// verification step can compare what was actually written.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = join(outputDir, "entry.txt");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const text = readFileSync(sourcePath, "utf8");
writeFileSync(targetPath, text, "utf8");

const written = readFileSync(targetPath, "utf8");
if (written.length !== text.length) {
  throw new Error(
    `entry.txt copy failed: wrote ${written.length} characters, expected ${text.length}`
  );
}
