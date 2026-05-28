const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find occurrences of "class=" followed by "product"
let idx = 0;
while (true) {
  idx = content.indexOf('class=', idx);
  if (idx === -1) break;
  let quote = content[idx + 6];
  let classVal = content.substring(idx + 7, content.indexOf(quote, idx + 7));
  if (classVal.split(' ').includes('product')) {
    console.log(`Found product class at index ${idx}:`);
    console.log(content.substring(idx - 100, idx + 200));
  }
  idx += 6;
}
