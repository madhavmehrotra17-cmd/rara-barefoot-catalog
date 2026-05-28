const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- VERIFYING PREMIUM PRODUCT SLIDESHOW ---');

if (!fs.existsSync(productPath)) {
  console.error('[FAIL] product.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(productPath, 'utf8');

const hasSlideshowScript = html.includes('id="rara-slideshow-script"');
const hasSlideshowCSS = html.includes('/* --- Premium E-Commerce Interactive Slideshow Layout --- */');

if (hasSlideshowScript && hasSlideshowCSS) {
  console.log('[PASS] Premium interactive product slideshow is successfully verified!');
} else {
  console.error('[FAIL] Some slideshow items are missing!');
  console.error(`  Script present: ${hasSlideshowScript}`);
  console.error(`  CSS present: ${hasSlideshowCSS}`);
  process.exit(1);
}
