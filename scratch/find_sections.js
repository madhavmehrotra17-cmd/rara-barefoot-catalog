const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all occurrences of class="shopify-section"
const regex = /<div id="shopify-section-template--19195983724718__[^"]*" class="shopify-section[^"]*">/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Found section at index ${match.index}:`);
  console.log(match[0]);
  console.log('---');
}
