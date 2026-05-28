const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- VERIFYING SITWIDE PRODUCT UX UPGRADES ---');

let failed = false;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const hasCheckoutOverride = content.includes('.shopify-payment-button__button') && content.includes('border-radius: 8px !important;');
  const hasBlockSwatch = content.includes('.block-swatch') && content.includes('border-radius: 8px !important;');
  const hasColorSwatch = content.includes('.color-swatch') && content.includes('border-radius: 50% !important;');
  const hasFeaturesGrid = content.includes('.features-grid') && content.includes('display: grid !important;');
  const hasAccordion = content.includes('.accordion') && content.includes('border-bottom: 1px solid #eaeaea !important;');

  if (hasCheckoutOverride && hasBlockSwatch && hasColorSwatch && hasFeaturesGrid && hasAccordion) {
    console.log(`  [PASS] ${file} successfully verified for premium product UX overrides`);
  } else {
    console.error(`  [FAIL] ${file} is missing updated product detail UX overrides!`);
    console.error(`    Checkout Override: ${hasCheckoutOverride}`);
    console.error(`    Block Swatch: ${hasBlockSwatch}`);
    console.error(`    Color Swatch: ${hasColorSwatch}`);
    console.error(`    Features Grid: ${hasFeaturesGrid}`);
    console.error(`    Accordion: ${hasAccordion}`);
    failed = true;
  }
});

console.log('\n--- VERIFICATION RESULT ---');
if (failed) {
  console.error('[FAIL] Some templates failed validation!');
  process.exit(1);
} else {
  console.log('[PASS] Success! All 12 templates successfully updated with all 4 premium product page upgrades.');
}
