const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetStr = 'shopify-section-template--19195983724718__multi_column_VkYVca';
const idx = content.indexOf(targetStr);
if (idx !== -1) {
  console.log(content.substring(idx - 50, idx + 1500));
} else {
  console.log('Multi-column section not found in product.html');
}
