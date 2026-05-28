const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const idx = content.indexOf('id="product-extra-information"');
if (idx !== -1) {
  // Let's print from index to index + 6000
  console.log("=== HTML content from product-extra-information to next 6000 chars ===");
  console.log(content.substring(idx, idx + 6000));
}
