const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find Product Specs in product.html
const startIdx = content.indexOf('<span>Product Specs</span>');
if (startIdx !== -1) {
  console.log("=== Product Specs in current product.html ===");
  console.log(content.substring(startIdx - 100, startIdx + 2000));
} else {
  console.log("[ERROR] Could not find Product Specs in current product.html!");
}
