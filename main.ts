import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "Sleep takes eight hours a night and returns me just as tired. One star. I would like a refund for the dreams too.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const chars = [...REVIEW].length;
if (chars < 1 || chars > 160) {
  throw new Error(`review must be 1-160 characters, got ${chars}`);
}
if (REVIEW.trim().length === 0) {
  throw new Error("review must not be blank");
}
if (REVIEW.includes("\n")) {
  throw new Error("review must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, REVIEW, "utf8");

// Read the file back and verify it holds exactly the review, byte for byte.
const back = readFileSync(outFile, "utf8");
if (back !== REVIEW) {
  throw new Error("entry.txt does not match the review");
}
console.log(`wrote ${outFile} (${chars} code points)`);
console.log(`verified ${outFile}: ${[...back].length} code points, single line: ${!back.includes("\n")}`);
