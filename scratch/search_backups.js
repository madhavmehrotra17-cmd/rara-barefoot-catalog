const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';

function findBackups(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        findBackups(fullPath);
      }
    } else {
      if (file.toLowerCase().includes('product') && file.endsWith('.bak') || file.endsWith('.orig') || file.endsWith('.old')) {
        console.log(`Found backup file: ${fullPath}`);
      }
    }
  });
}

findBackups(rootDir);
