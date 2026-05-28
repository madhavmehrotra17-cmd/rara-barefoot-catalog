const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Search for all occurrences of .details-pane in product.html
let idx = 0;
let count = 0;
while (true) {
  idx = content.indexOf('.details-pane', idx);
  if (idx === -1) break;
  count++;
  console.log(`\nMatch ${count} at index ${idx}:`);
  console.log(content.substring(idx - 100, idx + 400));
  idx += 13;
}
