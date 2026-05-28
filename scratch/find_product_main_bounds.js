const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

// Search for the end of the main product block or container
const target = 'id="shopify-section-template--19195983724718__main"';
const idx = content.indexOf(target);
if (idx !== -1) {
  console.log('Found main section start at index ' + idx);
  // Find the closing shopify-section div
  const endIdx = content.indexOf('</div>', idx + 100000); // look far down
  console.log('Closing div index: ' + endIdx);
  console.log(content.substring(endIdx - 200, endIdx + 500).replace(/\n/g, '\\n'));
} else {
  console.log('main section not found!');
}
