// Weirdest Job Title: Blind Judge Showdown — program/v1 entry.
//
// Writes exactly one job title, 60 characters at most and nothing else,
// to /output/entry.txt. A blind AI judge compares titles two at a time
// and picks the weirder, funnier one, so the title has to sound like a
// real job with one gloriously specific twist.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TITLE = "Senior Vice President of Apologizing to the Printer";

// Gate: the sealed scorer only accepts UTF-8 text of 1 to 60 characters,
// not only white space. Refuse to write anything that fails it.
if (TITLE.length < 1 || TITLE.length > 60 || TITLE.trim().length === 0) {
  throw new Error(`entry title must be 1-60 non-blank characters, got ${TITLE.length}`);
}

const OUT = "/output/entry.txt";
mkdirSync(dirname(OUT), { recursive: true });
// No trailing newline: the gate counts every character in the file.
writeFileSync(OUT, TITLE, "utf8");

// Read back what was written and re-check the gate against the file
// itself, so a bad write can never slip through silently.
const written = readFileSync(OUT, "utf8");
if (written !== TITLE) {
  throw new Error("entry.txt content does not match the title");
}
console.log(`Wrote ${TITLE.length} characters to ${OUT}`);
