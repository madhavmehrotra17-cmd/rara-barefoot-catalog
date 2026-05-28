const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('gender-selection-btn')) {
    console.log(`${file} contains gender-selection-btn`);
  }
});
