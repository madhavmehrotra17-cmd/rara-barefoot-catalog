const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetStr = '</product-rerender>';
const idx = content.indexOf(targetStr);
console.log('</product-rerender> index:', idx);
if (idx !== -1) {
  console.log(content.substring(idx, idx + 600));
}

// Let's also check for class="shopify-section--main-product" or similar
const sectionEndStr = '</section>';
let sectionIdx = content.indexOf('shopify-section--main-product');
if (sectionIdx !== -1) {
  const nextSectionEndIdx = content.indexOf(sectionEndStr, sectionIdx);
  console.log('Main product section end index:', nextSectionEndIdx);
  console.log(content.substring(nextSectionEndIdx - 100, nextSectionEndIdx + 100));
}
