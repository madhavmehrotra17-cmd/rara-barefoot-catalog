const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasButton = content.includes('class="gender-selection-btn"') || content.includes("class='gender-selection-btn'");
  const hasStyle = content.includes('.gender-selection-btn');
  console.log(`${file}: hasButton = ${hasButton}, hasStyle = ${hasStyle}`);
});
