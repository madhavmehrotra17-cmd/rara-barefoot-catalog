const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find styles containing .product-gallery
const regex = /[^\n]*\.product-gallery[^\n]*/gi;
let match;
let count = 0;
console.log('Product gallery styles:');
while ((match = regex.exec(content)) !== null && count < 20) {
  console.log(match[0].trim());
  count++;
}
