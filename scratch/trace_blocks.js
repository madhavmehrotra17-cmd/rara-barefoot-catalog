const fs = require('fs');

const content = fs.readFileSync('product.html', 'utf8');
const listStart = content.indexOf('<div class="product-info__block-list">');

if (listStart !== -1) {
  const safeStickyEnd = content.indexOf('</safe-sticky>', listStart);
  console.log('listStart:', listStart);
  console.log('safeStickyEnd:', safeStickyEnd);
  
  let idx = content.indexOf('<div class="product-info__block-item"', listStart);
  let count = 0;
  while (idx !== -1 && idx < safeStickyEnd) {
    count++;
    console.log(`Block #${count} at index: ${idx}`);
    console.log(content.substring(idx, content.indexOf('>', idx) + 1));
    idx = content.indexOf('<div class="product-info__block-item"', idx + 1);
  }
} else {
  console.log('List start not found');
}
