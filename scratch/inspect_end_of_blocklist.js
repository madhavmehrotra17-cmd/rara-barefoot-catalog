const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find `data-block-id="buy_buttons"`
const buyIdx = content.indexOf('data-block-id="buy_buttons"');
if (buyIdx !== -1) {
  console.log("=== HTML from buy_buttons onwards ===");
  // Let's print the next 15000 characters to see the end of product-info__block-list
  console.log(content.substring(buyIdx, buyIdx + 15000));
}
