const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find all occurrences of product-extra-information
let idx = 0;
while (true) {
  idx = content.indexOf('product-extra-information', idx);
  if (idx === -1) break;
  console.log(`\n--- Found product-extra-information at index ${idx} ---`);
  console.log(content.substring(idx - 100, idx + 400));
  idx += 25;
}
