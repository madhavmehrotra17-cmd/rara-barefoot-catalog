const fs = require('fs');
const filePath = 'collection.html';
const html = fs.readFileSync(filePath, 'utf8');

const regex = /\.gender-selection-btn\s*\{([\s\S]*?)\}/gi;
let match;
console.log('--- gender-selection-btn CSS rules ---');
while ((match = regex.exec(html)) !== null) {
  console.log('--- Match ---');
  console.log(match[0]);
}

const hoverRegex = /\.gender-selection-btn:hover\s*\{([\s\S]*?)\}/gi;
while ((match = hoverRegex.exec(html)) !== null) {
  console.log('--- Hover Match ---');
  console.log(match[0]);
}
