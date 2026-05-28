const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- VERIFYING MULTI-COLUMN BENEFITS IN PRODUCT.HTML ---');

if (!fs.existsSync(productPath)) {
  console.error('[FAIL] product.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(productPath, 'utf8');

const hasFootFreedomTitle = html.includes('WHY FOOT-FREEDOM MATTERS');
const hasBlackShoe1 = html.includes('Xanadu_black_new_1.jpg');
const hasBlackShoe2 = html.includes('Xanadu_black_new_2.jpg');
const hasBlackShoe3 = html.includes('Xanadu_black_new_3.jpg');
const hasBenefitCardCSS = html.includes('.barefoot-benefit-card') && html.includes('.benefit-visual-container');

if (hasFootFreedomTitle && hasBlackShoe1 && hasBlackShoe2 && hasBlackShoe3 && hasBenefitCardCSS) {
  console.log('[PASS] Premium multi-column benefits section verified successfully!');
} else {
  console.error('[FAIL] Some benefits section items are missing!');
  console.error(`  Title present: ${hasFootFreedomTitle}`);
  console.error(`  Black shoe 1 present: ${hasBlackShoe1}`);
  console.error(`  Black shoe 2 present: ${hasBlackShoe2}`);
  console.error(`  Black shoe 3 present: ${hasBlackShoe3}`);
  console.error(`  Benefit card CSS present: ${hasBenefitCardCSS}`);
  process.exit(1);
}
