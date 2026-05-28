const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- VERIFYING ROYAL BLUE SITEWIDE PRICING ACCENTS (INCLUDING RELATED PRODUCTS) ---');

let allPassed = true;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const hasUltimateStyle = content.includes('id="rara-ultimate-style"');
  if (!hasUltimateStyle) {
    console.error(`[FAIL] ${file} is missing rara-ultimate-style block!`);
    allPassed = false;
    return;
  }

  // Find start and end of style block
  const startIdx = content.indexOf('id="rara-ultimate-style"');
  const endIdx = content.indexOf('</style>', startIdx);
  const styleContent = content.substring(startIdx, endIdx);

  const hasBluePrice = styleContent.includes('color: #095492 !important;') && styleContent.includes('sale-price');
  const hasRelatedPrice = styleContent.includes('[class*="ai-related-product-price"]');
  
  if (hasBluePrice && hasRelatedPrice) {
    console.log(`  [PASS] ${file} verified successfully with Royal Blue catalog and related product prices`);
  } else {
    console.error(`  [FAIL] ${file} does not contain active Royal Blue related product prices!`);
    allPassed = false;
  }
});

console.log('\n--- VERIFICATION RESULT ---');
if (allPassed) {
  console.log('[PASS] Success! All HTML templates beautifully styled with premium Royal Blue catalog and related product prices.');
} else {
  console.error('[FAIL] Some files failed verification. Please inspect the errors above.');
  process.exit(1);
}
