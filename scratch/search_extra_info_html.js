const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

let idx = 0;
let count = 0;
while (true) {
  idx = content.indexOf('product-extra-information', idx);
  if (idx === -1) break;
  count++;
  console.log(`Match ${count} at index ${idx}:`);
  console.log(content.substring(idx - 100, idx + 400));
  idx += 25;
}
