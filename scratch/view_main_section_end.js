const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetIdx = content.indexOf('</product-rerender>');
if (targetIdx !== -1) {
  console.log(content.substring(targetIdx, targetIdx + 1200));
}
