const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');
const searchStr = '<header id="shopify-section-sections--19195979432110__header"';
const startIdx = content.indexOf(searchStr);

if (startIdx !== -1) {
    // Print 1000 characters from startIdx
    console.log(content.substring(startIdx, startIdx + 2000));
} else {
    console.log("Could not find the shopify-section header tag in product.html");
}
