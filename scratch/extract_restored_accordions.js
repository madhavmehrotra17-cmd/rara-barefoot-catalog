const fs = require('fs');
const path = require('path');

const lineJson = fs.readFileSync(path.join(__dirname, 'line_4333.json'), 'utf8');
const obj = JSON.parse(lineJson);

// The output content is in obj.content
const logOutput = obj.content;

// The output has the following structure:
// ...
// === Extracted Accordions Block ===
// [Part 1: Core Properties and Product Specs up to: <p>Upper: <br><b>Soft flyknit no-sew upper (100% recycled)</b></p>\n</div>]
// Characters between blockEndIdx and variations block: "[Part 2: CSS style, Care, Other Information, FAQS]"
// ...

// Let's find "=== Extracted Accordions Block ===\n" and the end of Part 1 (before "Characters between blockEndIdx")
const startMarker = '=== Extracted Accordions Block ===\n';
const part1Start = logOutput.indexOf(startMarker);
if (part1Start === -1) {
  console.error('[ERROR] Could not find Part 1 start in log output!');
  process.exit(1);
}

const part1ActualStart = part1Start + startMarker.length;
const part1End = logOutput.indexOf('Characters between blockEndIdx and variations block:', part1ActualStart);
if (part1End === -1) {
  console.error('[ERROR] Could not find Part 1 end!');
  process.exit(1);
}

// Extract Part 1
const part1 = logOutput.substring(part1ActualStart, part1End).trim();

// Now, extract Part 2 (which is inside the JSON-escaped string literal in the logs)
// It looks like: Characters between blockEndIdx and variations block: "..."
const part2Marker = 'Characters between blockEndIdx and variations block: "';
const part2Start = logOutput.indexOf(part2Marker, part1End);
if (part2Start === -1) {
  console.error('[ERROR] Could not find Part 2 start!');
  process.exit(1);
}

const part2ActualStart = part2Start + part2Marker.length;
// Find the closing quote of the string. Since it's inside the text, it might end with a newline or the next output statement.
// The next log statement in command output is "Snippet at insertion point before insertion:"
const part2EndMarker = '"\nSnippet at insertion point before insertion:';
const part2End = logOutput.indexOf(part2EndMarker, part2ActualStart);

if (part2End === -1) {
  console.error('[ERROR] Could not find Part 2 end!');
  process.exit(1);
}

const part2Escaped = logOutput.substring(part2ActualStart, part2End);

// Unescape Part 2.
// Let's parse it as a JSON string to perfectly resolve all \n, \", etc.
// We can wrap it in double quotes and parse it!
let part2Raw = "";
try {
  part2Raw = JSON.parse('"' + part2Escaped + '"');
} catch (e) {
  console.error('[ERROR] Failed to JSON parse Part 2:', e);
  // Fallback simple unescape
  part2Raw = part2Escaped.replace(/\\n/g, '\n').replace(/\\"/g, '"');
}

// Combine Part 1 and Part 2!
// Part 1 ends with `</div>` (which closes `<div class="product-meta-details">`)
// Part 2 starts with `\n\n<Style>\n.product-meta-details ul { ...`
// Let's combine them
const restoredHTML = part1 + part2Raw;

console.log("=== COMBINED RESTORED HTML (Length: " + restoredHTML.length + ") ===");
console.log(restoredHTML.substring(0, 400));
console.log("\n...\n");
console.log(restoredHTML.substring(restoredHTML.length - 400));

// Save to scratch/restored_accordions.html
fs.writeFileSync(path.join(__dirname, 'restored_accordions.html'), restoredHTML, 'utf8');
console.log("[SUCCESS] Saved restored accordions HTML to scratch/restored_accordions.html!");
