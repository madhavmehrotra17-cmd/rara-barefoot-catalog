const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'collection.html');
const content = fs.readFileSync(file, 'utf8');

const term = '<product-list';
let idx = content.indexOf(term);
if (idx !== -1) {
    console.log("=== Product List Container ===");
    console.log(content.substring(idx - 200, idx + 800));
} else {
    console.log("Could not find product-list!");
}
