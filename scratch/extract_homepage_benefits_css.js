const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const startTag = '/* Custom Barefoot Benefits Cards & Styles */';
const startIdx = content.indexOf(startTag);
if (startIdx !== -1) {
  // Let's print from this comment up to the next closing style tag
  const endStyleIdx = content.indexOf('</style>', startIdx);
  console.log(content.substring(startIdx, endStyleIdx));
} else {
  console.log('Barefoot benefits cards CSS not found in index.html');
}
