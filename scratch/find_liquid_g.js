const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find all occurrences of liquid_gXLmRm
let idx = 0;
while (true) {
  idx = content.indexOf('liquid_gXLmRm', idx);
  if (idx === -1) break;
  console.log(`\n--- Found liquid_gXLmRm at index ${idx} ---`);
  console.log(content.substring(idx - 100, idx + 1000));
  idx += 13;
}
