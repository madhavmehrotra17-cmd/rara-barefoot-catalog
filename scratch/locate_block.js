const fs = require('fs');

const content = fs.readFileSync('product.html', 'utf8');
const search = 'barefoot-science-widget';
// Find the occurrence after index 250000
const idx = content.indexOf(search, 250000);

if (idx !== -1) {
  const blockStart = content.lastIndexOf('<div class="product-info__block-item"', idx);
  console.log('Block start index:', blockStart);
  console.log(content.substring(blockStart - 100, blockStart + 600));
} else {
  console.log('HTML occurrence not found');
}
