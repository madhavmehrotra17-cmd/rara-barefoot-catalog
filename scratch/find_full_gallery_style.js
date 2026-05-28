const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find all style tags at the top class spacing spacing--tight
const targetIdx = content.indexOf('--product-grid');
if (targetIdx !== -1) {
  const startIdx = content.lastIndexOf('<style>', targetIdx);
  const endIdx = content.indexOf('</style>', targetIdx);
  console.log(content.substring(startIdx, endIdx + 8));
} else {
  console.log('Product grid style not found');
}
