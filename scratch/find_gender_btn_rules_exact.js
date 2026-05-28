const fs = require('fs');
const filePath = 'collection.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('gender-selection-btn')) {
    console.log(`Line ${i + 1}: ${lines[i].trim()}`);
  }
}

// Search for the surrounding <style> tags of Line 2607
let startTag = '';
let endTag = '';
for (let i = 2607 - 1; i >= 0; i--) {
  if (lines[i].includes('<style')) {
    startTag = `Line ${i + 1}: ${lines[i].trim()}`;
    break;
  }
}
for (let i = 2607 - 1; i < lines.length; i++) {
  if (lines[i].includes('</style>')) {
    endTag = `Line ${i + 1}: ${lines[i].trim()}`;
    break;
  }
}
console.log('\nSurrounding style block tags:');
console.log('Start:', startTag);
console.log('End:', endTag);
