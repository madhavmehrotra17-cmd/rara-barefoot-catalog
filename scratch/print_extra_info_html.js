const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find index of `id="product-extra-information"`
const idx = content.indexOf('id="product-extra-information"');
if (idx !== -1) {
  console.log("=== HTML around product-extra-information ===");
  console.log(content.substring(idx - 100, idx + 4500));
}
