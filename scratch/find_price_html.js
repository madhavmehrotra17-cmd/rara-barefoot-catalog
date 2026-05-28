const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Searching for price block matches...');

let pos = 250000;
while (true) {
  pos = content.indexOf('price', pos);
  if (pos === -1) break;
  if (content.substring(pos - 30, pos + 50).includes('block')) {
    console.log(`Match at ${pos}:\n${content.substring(pos - 150, pos + 400)}\n-----------------\n`);
  }
  pos += 5;
}
