const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

let idx = 0;
let listCount = 0;
while ((idx = html.indexOf('<product-list', idx)) !== -1) {
    console.log(`Product List ${listCount++} at index ${idx}`);
    // Print the first 300 characters inside this product list
    console.log(html.substring(idx, idx + 400));
    idx += 50;
}
