const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Searching for svg-shoe-body in product.html...');
let idx = 0;
while (true) {
  idx = content.indexOf('svg-shoe-body', idx);
  if (idx === -1) break;
  console.log(`Found "svg-shoe-body" at index ${idx}:`);
  console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 400)));
  idx += 'svg-shoe-body'.length;
}
