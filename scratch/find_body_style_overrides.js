const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Let's find all <style> blocks in product.html
const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  const styleText = match[1];
  if (styleText.includes('color') || styleText.includes('price') || styleText.includes('sale')) {
    console.log(`Match ${++count}:`);
    console.log(match[0].substring(0, 300));
    console.log('------------------');
  }
}
