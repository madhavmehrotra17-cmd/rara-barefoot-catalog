const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

const targetStr = 'data-block-type="price"';
const idx = content.indexOf(targetStr);

console.log('Index:', idx);
if (idx !== -1) {
  console.log(content.substring(idx - 100, idx + 800));
}
