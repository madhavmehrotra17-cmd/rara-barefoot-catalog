const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'collection.html'), 'utf8');
const match = html.match(/<product-card[\s\S]*?<\/product-card>/);
if (match) {
    console.log(match[0]);
} else {
    console.log("No product-card found");
}
