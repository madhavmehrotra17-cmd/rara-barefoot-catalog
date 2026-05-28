const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find the end of <product-gallery ...>
const galleryIdx = content.indexOf('<product-gallery');
if (galleryIdx !== -1) {
  // Let's find the closing tag </product-gallery>
  const closeGalleryIdx = content.indexOf('</product-gallery>', galleryIdx);
  if (closeGalleryIdx !== -1) {
    console.log("=== AFTER </product-gallery> ===");
    console.log(content.substring(closeGalleryIdx, closeGalleryIdx + 2000));
  }
}
