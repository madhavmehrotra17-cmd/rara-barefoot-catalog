const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- VERIFYING STANDARDIZED PRODUCT DETAIL PAGE ---');

if (!fs.existsSync(productPath)) {
  console.error('[FAIL] product.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(productPath, 'utf8');

const hasUltimateFix = html.includes('id="ultimate-fix"');
const hasUltimateStyle = html.includes('id="rara-ultimate-style"');
const hasUltimateScript = html.includes('id="rara-ultimate-script"');
const hasAccessoriesNav = html.includes('data-title="ACCESSORIES"') || html.includes('ACCESSORIES</a>');

if (hasUltimateFix && hasUltimateStyle && hasUltimateScript && hasAccessoriesNav) {
  console.log('[PASS] product.html is successfully standardized and verified!');
} else {
  console.error('[FAIL] Some standardization items are missing!');
  console.error(`  ultimate-fix: ${hasUltimateFix}`);
  console.error(`  rara-ultimate-style: ${hasUltimateStyle}`);
  console.error(`  rara-ultimate-script: ${hasUltimateScript}`);
  console.error(`  Accessories Nav: ${hasAccessoriesNav}`);
  process.exit(1);
}
