const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';

function searchJS(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        searchJS(fullPath);
      }
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('product-extra-information') || content.includes('Product Specs')) {
        console.log(`Found match in JS file: ${fullPath}`);
        // Let's print the length and a snippet
        console.log(`  Length: ${content.length}`);
        let idx = content.indexOf('product-extra-information');
        if (idx !== -1) {
          console.log(content.substring(idx - 100, idx + 800));
        }
      }
    }
  });
}

searchJS(rootDir);
