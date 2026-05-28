const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const searchStr = '<section id="shopify-section-sections--19195979366574__custom_liquid_nFqdke"';
const idx = content.indexOf(searchStr);

if (idx !== -1) {
    console.log(`Found Section 18 at index: ${idx}`);
    // Print 3000 characters from start to inspect its HTML markup
    console.log(content.substring(idx, idx + 3000));
} else {
    console.log("Could not find Section 18 in index.html");
}
