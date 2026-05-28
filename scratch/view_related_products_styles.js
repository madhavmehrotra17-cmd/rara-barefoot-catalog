const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetStr = '.ai-related-products-aewdlmjbqvdnmognynaigenblocke27433bjbpxly';
const idx = content.indexOf(targetStr);
if (idx !== -1) {
  // Let's find the start of the <style block containing this
  const styleStartIdx = content.lastIndexOf('<style', idx);
  const styleEndIdx = content.indexOf('</style>', idx);
  console.log(content.substring(styleStartIdx, styleEndIdx + 8));
} else {
  console.log('Target style not found');
}
