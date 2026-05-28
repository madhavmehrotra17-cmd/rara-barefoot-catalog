const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetStr = 'class="product-info';
const idx = content.indexOf(targetStr);
console.log('product-info class index:', idx);
if (idx !== -1) {
  // Let's print the starting tag that contains it
  const tagStart = content.lastIndexOf('<', idx);
  console.log(content.substring(tagStart, tagStart + 600));
}
