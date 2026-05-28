const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetStr = '<product-gallery';
const idx = content.indexOf(targetStr);
if (idx !== -1) {
  console.log(content.substring(idx, idx + 4000));
}
