const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const idx = content.indexOf('product-extra-information');
if (idx !== -1) {
  // Let's print from index + 4200 to index + 8000
  console.log("=== Continuation of product-extra-information ===");
  console.log(content.substring(idx + 4200, idx + 8000));
}
