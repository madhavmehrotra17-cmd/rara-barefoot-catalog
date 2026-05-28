const fs = require('fs');

const content = fs.readFileSync('product.html', 'utf8');
const search = '</product-gallery>';
const idx = content.indexOf(search);

if (idx !== -1) {
  console.log(content.substring(idx, idx + 1000));
} else {
  console.log('Not found');
}
