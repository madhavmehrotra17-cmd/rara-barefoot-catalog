const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Searching for main block types in product.html body...');

const blocks = [
  'title',
  'rating',
  'price',
  'variant-picker',
  'buy-buttons',
  'liquid'
];

blocks.forEach(type => {
  let pos = 250000;
  const searchStr = `data-block-type="${type}"`;
  while (true) {
    pos = content.indexOf(searchStr, pos);
    if (pos === -1) break;
    console.log(`Block type "${type}" found at index ${pos}`);
    pos += searchStr.length;
  }
});
