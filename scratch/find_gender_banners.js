const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('EXPLORE MEN') || content.includes('EXPLORE WOMEN')) {
    console.log(`${file} contains EXPLORE MEN or EXPLORE WOMEN`);
    
    // Print lines around the match
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('EXPLORE MEN') || line.includes('EXPLORE WOMEN')) {
        console.log(`  Line ${idx + 1}: ${line.trim()}`);
        // print a few lines before and after
        for (let i = Math.max(0, idx - 4); i <= Math.min(lines.length - 1, idx + 4); i++) {
          console.log(`    [${i + 1}] ${lines[i]}`);
        }
      }
    });
  }
});
