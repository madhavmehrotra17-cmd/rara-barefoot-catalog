const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Let's search for the main product media or layout container
const classes = ['product', 'media', 'gallery', 'info', 'grid', 'carousel'];
classes.forEach(cls => {
  const regex = new RegExp(`class="[^"]*${cls}[^"]*"`, 'gi');
  const matches = new Set();
  let match;
  let count = 0;
  while ((match = regex.exec(content)) !== null && count < 8) {
    matches.add(match[0]);
    count++;
  }
  console.log(`Related to "${cls}":`);
  matches.forEach(m => console.log('  ', m));
});
