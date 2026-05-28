const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const mainSectionIdx = content.indexOf('shopify-section--main-product');
if (mainSectionIdx !== -1) {
  // Let's search for subsequent occurrences of class="shopify-section"
  let idx = mainSectionIdx;
  let count = 0;
  while (true) {
    const nextSectionIdx = content.indexOf('class="shopify-section', idx + 20);
    if (nextSectionIdx === -1) break;
    console.log(`Section ${++count} at index ${nextSectionIdx}:`);
    console.log(content.substring(nextSectionIdx - 100, nextSectionIdx + 300));
    console.log('====================');
    idx = nextSectionIdx;
    if (count > 5) break;
  }
}
