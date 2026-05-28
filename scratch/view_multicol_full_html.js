const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetStr = 'shopify-section-template--19195983724718__multi_column_VkYVca';
const idx = content.indexOf(targetStr);
if (idx !== -1) {
  // Let's print the next 5000 characters
  console.log(content.substring(idx, idx + 5000));
}
