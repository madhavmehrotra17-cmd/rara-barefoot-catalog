const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');
const headEnd = content.indexOf('</head>');
const headContent = content.substring(0, headEnd);

// Find any links containing .css
const regex = /<link[^>]*href="([^"]+\.css[^"]*)"/gi;
let match;
console.log("--- All CSS links in product.html head ---");
while ((match = regex.exec(headContent)) !== null) {
    console.log(match[1]);
}
