const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

function findText(text) {
  let idx = content.toLowerCase().indexOf(text.toLowerCase());
  if (idx !== -1) {
    console.log(`Found "${text}" at index ${idx}:`);
    console.log(content.substring(idx - 100, idx + 500));
  } else {
    console.log(`Could not find "${text}"`);
  }
}

findText("Product Specs");
findText("product-extra-information");
findText("Brand Name");
