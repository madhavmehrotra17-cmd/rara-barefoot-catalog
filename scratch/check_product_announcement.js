const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

if (content.includes('announcement-bar')) {
    console.log("product.html HAS the announcement-bar");
} else {
    console.log("product.html DOES NOT have the announcement-bar");
}
