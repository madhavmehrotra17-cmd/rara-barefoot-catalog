const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find the main product-info__block-list
const startIdx = content.indexOf('class="product-info__block-list"');
if (startIdx !== -1) {
  // Let's find all divs with class="product-info__block-item" inside this container
  // until the closing tag of product-info__block-list
  // We can search for data-block-id within a reasonable chunk
  const chunk = content.substring(startIdx, startIdx + 120000);
  
  // Let's match all data-block-id and data-block-type
  const regex = /<div\s+class="product-info__block-item"\s+data-block-id="([^"]*)"\s+data-block-type="([^"]*)"/g;
  let match;
  console.log("=== Main Product Info Block List Items ===");
  while ((match = regex.exec(chunk)) !== null) {
    console.log(`Block ID: ${match[1]}, Type: ${match[2]}, Index in page: ${startIdx + match.index}`);
  }
}
