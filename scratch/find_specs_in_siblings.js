const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(rootDir);

files.forEach(file => {
  if (file.endsWith('.html') && file !== 'product.html') {
    const fullPath = path.join(rootDir, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('product-extra-information') || content.includes('Product Specs')) {
      console.log(`Found specs in sibling HTML file: ${file}`);
      // Let's print around the match
      let idx = content.indexOf('Product Specs');
      if (idx === -1) idx = content.indexOf('product-extra-information');
      console.log(content.substring(idx - 100, idx + 2000));
    }
  }
});
