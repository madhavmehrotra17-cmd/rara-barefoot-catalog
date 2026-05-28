const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find all occurrences of `<style id="rara-ultimate-style">`
let idx = 0;
let occurrences = [];
while (true) {
  idx = content.indexOf('<style id="rara-ultimate-style">', idx);
  if (idx === -1) break;
  occurrences.push(idx);
  idx += 30;
}

console.log(`Found "<style id=\"rara-ultimate-style\">" ${occurrences.length} times:`, occurrences);
occurrences.forEach((idx, i) => {
  console.log(`\n--- Style Tag ${i} at index ${idx} ---`);
  // Let's print the first 200 chars and the last 200 chars before </style>
  const endIdx = content.indexOf('</style>', idx);
  console.log("Start snippet:");
  console.log(content.substring(idx, idx + 200));
  console.log("End snippet:");
  console.log(content.substring(endIdx - 200, endIdx + 8));
});
