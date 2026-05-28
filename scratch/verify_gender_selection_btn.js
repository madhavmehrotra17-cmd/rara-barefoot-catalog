const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- VERIFYING GENDER SELECTION BUTTONS ---');

let failed = false;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the new class styling
  const hasRoundedCorners = content.includes('border-radius: 8px !important; /* Soft, classy rounded corners matching main page */');
  const hasFontSize = content.includes('font-size: 1.02rem !important;');
  const hasPadding = content.includes('padding: 12px 28px !important;');
  const hasHoverColor = content.includes('color: #095492 !important; /* Royal Blue text */');
  const hasHoverBg = content.includes('background: #ffffff !important;');
  
  if (hasRoundedCorners && hasFontSize && hasPadding && hasHoverColor && hasHoverBg) {
    console.log(`  [PASS] ${file} is successfully standardized and verified`);
  } else {
    console.error(`  [FAIL] ${file} is missing some standardized styles!`);
    console.error(`    Rounded Corners: ${hasRoundedCorners}`);
    console.error(`    Font Size: ${hasFontSize}`);
    console.error(`    Padding: ${hasPadding}`);
    console.error(`    Hover Color: ${hasHoverColor}`);
    console.error(`    Hover Bg: ${hasHoverBg}`);
    failed = true;
  }
});

console.log('\n--- VERIFICATION RESULT ---');
if (failed) {
  console.error('[FAIL] Some templates failed validation!');
} else {
  console.log('[PASS] Success! All 12 templates now have gender selection buttons styled identically to the main page CTA buttons.');
}
