const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find all css link tags
const regex = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi;
let match;
console.log("--- CSS Stylesheets linked in product.html ---");
while ((match = regex.exec(content)) !== null) {
    console.log(match[0]);
}
