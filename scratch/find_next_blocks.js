const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

const targetStr = 'data-block-id="price"';
const idx = content.indexOf(targetStr);

console.log('Printing blocks after price:');
console.log(content.substring(idx, idx + 2000));
