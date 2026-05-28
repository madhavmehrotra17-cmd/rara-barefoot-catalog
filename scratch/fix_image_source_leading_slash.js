const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Fixing barefoot-illustration.png source path with a leading slash...');

// Replace barefoot-illustration.png with /barefoot-illustration.png inside visual-barefoot container
const targetStr = 'src="barefoot-illustration.png"';
const replacementStr = 'src="/barefoot-illustration.png"';

if (!content.includes(targetStr)) {
  console.error('[ERROR] Could not find the barefoot-illustration.png src attribute in product.html!');
  process.exit(1);
}

content = content.replaceAll(targetStr, replacementStr);
fs.writeFileSync(filePath, content, 'utf8');
console.log('[SUCCESS] Successfully updated product.html to use an absolute root path for barefoot-illustration.png!');
