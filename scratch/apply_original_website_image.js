const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Switching image tag to original website.png in product.html...');

const targetStr = 'src="/barefoot-illustration.png"';
const replacementStr = 'src="/website.png"';

if (!content.includes(targetStr)) {
  console.error('[ERROR] Could not find the barefoot-illustration.png src attribute in product.html!');
  process.exit(1);
}

content = content.replaceAll(targetStr, replacementStr);
fs.writeFileSync(filePath, content, 'utf8');
console.log('[SUCCESS] Successfully updated product.html to render /website.png as the main science simulator illustration!');
