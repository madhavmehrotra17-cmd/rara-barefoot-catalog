const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const productStartIdx = content.indexOf('class="product"');
if (productStartIdx !== -1) {
  const startTagIdx = content.lastIndexOf('<div', productStartIdx);
  
  // Let's print the first 25000 characters from startTagIdx
  // to see all children tags
  console.log("=== FIRST 25000 CHARACTERS OF PRODUCT CONTAINER ===");
  const chunk = content.substring(startTagIdx, startTagIdx + 25000);
  
  // Let's print tags like <product-gallery, <safe-sticky, <product-info, and other top-level tags
  // to see what direct children are there.
  let regex = /<([a-zA-Z0-9\-]+)[^>]*>/g;
  let match;
  console.log("Listing tags inside the product container chunk:");
  while ((match = regex.exec(chunk)) !== null) {
    let tag = match[0];
    if (tag.includes('class=') || tag.includes('id=')) {
      console.log(`  ${tag.substring(0, 150)}`);
    }
  }
}
