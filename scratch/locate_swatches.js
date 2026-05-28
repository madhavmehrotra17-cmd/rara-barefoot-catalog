const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find all occurrences of "COLOR:" or "FOR:" or "SIZE" in product.html
function searchContext(text, length = 1000) {
  let idx = 0;
  while (true) {
    idx = content.indexOf(text, idx);
    if (idx === -1) break;
    console.log(`\n--- Found "${text}" at index ${idx} ---`);
    console.log(content.substring(idx - 100, idx + length));
    idx += text.length;
  }
}

console.log("Searching for 'COLOR:'...");
searchContext("COLOR:", 500);

console.log("\nSearching for 'FOR:'...");
searchContext("FOR:", 500);

console.log("\nSearching for 'MENS SIZE' or 'SIZE' swatch labels...");
searchContext("MENS SIZE", 500);
searchContext("WOMENS SIZE", 500);
