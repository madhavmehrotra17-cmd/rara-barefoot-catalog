const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- VERIFYING MULTI-COLUMN TRANSPARENCY & THINNED FONT ---');

if (!fs.existsSync(productPath)) {
  console.error('[FAIL] product.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(productPath, 'utf8');

const hasTransparentCSS = html.includes('background: transparent !important;') && html.includes('.barefoot-benefit-card img');
const hasOutfitFont = html.includes("font-family: 'Outfit', 'Geist', sans-serif !important;");

if (hasTransparentCSS && hasOutfitFont) {
  console.log('[PASS] Premium transparency and thinned font overrides verified successfully!');
} else {
  console.error('[FAIL] Some layout items are missing!');
  console.error(`  Transparent CSS present: ${hasTransparentCSS}`);
  console.error(`  Outfit Font present: ${hasOutfitFont}`);
  process.exit(1);
}
