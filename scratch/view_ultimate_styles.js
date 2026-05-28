const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const ultimateStyleTag = '<style id="rara-ultimate-style">';
const idx = content.indexOf(ultimateStyleTag);
if (idx !== -1) {
  const endStyleIdx = content.indexOf('</style>', idx);
  console.log(content.substring(idx, endStyleIdx + 8));
} else {
  console.log('rara-ultimate-style not found');
}
