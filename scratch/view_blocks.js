const fs = require('fs');

const content = fs.readFileSync('product.html', 'utf8');

const idx = content.indexOf('liquid_MkeXDn');
if (idx !== -1) {
  console.log('--- BLOCK 5 (liquid_MkeXDn) ---');
  console.log(content.substring(idx - 100, idx + 500));
}

const idx2 = content.indexOf('liquid_EBEaCB');
if (idx2 !== -1) {
  console.log('--- BLOCK 6 (liquid_EBEaCB) ---');
  console.log(content.substring(idx2 - 100, idx2 + 500));
}
