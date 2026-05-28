const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetStr = '<product-gallery';
const idx = content.indexOf(targetStr);
if (idx !== -1) {
  const startIdx = Math.max(0, idx - 2000);
  console.log(content.substring(startIdx, idx));
}
