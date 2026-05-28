const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasUltimateFix = content.includes('<style id="ultimate-fix">');
  const targetsBtn = content.includes('.gender-selection-btn {');
  console.log(`${file}: hasUltimateFix = ${hasUltimateFix}, targetsBtn = ${targetsBtn}`);
});
