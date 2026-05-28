const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find product-gallery tag
const galleryIdx = content.indexOf('<product-gallery');
console.log('product-gallery element index:', galleryIdx);
if (galleryIdx !== -1) {
  console.log(content.substring(galleryIdx, galleryIdx + 600));
}

// Find product-info tag
const infoIdx = content.indexOf('<product-info');
console.log('product-info element index:', infoIdx);
if (infoIdx !== -1) {
  console.log(content.substring(infoIdx, infoIdx + 600));
}
