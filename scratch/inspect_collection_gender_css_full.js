const fs = require('fs');
const filePath = 'collection.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('gender-selection-btn')) {
    console.log(`\n=== Line ${i + 1} references gender-selection-btn ===`);
    for (let j = Math.max(0, i - 15); j <= Math.min(lines.length - 1, i + 15); j++) {
      console.log(`${j + 1}: ${lines[j]}`);
    }
  }
}
