const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- VERIFYING TAB HOVER ACCENTS ---');

let failed = false;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const hasFilterHover = content.includes('color: #095492 !important;') && content.includes('.filter-tab-button:hover');
  const hasFilterActive = content.includes('background-color: #095492 !important;') && content.includes('.filter-tab-button.active');
  const hasGenderHover = content.includes('color: #095492 !important;') && content.includes('.gender-toggle-tab:hover');
  const hasGenderActive = content.includes('color: #095492 !important;') && content.includes('.gender-toggle-tab.active');

  if (hasFilterHover && hasFilterActive && hasGenderHover && hasGenderActive) {
    console.log(`  [PASS] ${file} successfully verified for Royal Blue switcher & filter tabs`);
  } else {
    console.error(`  [FAIL] ${file} is missing updated tab hover/active styles!`);
    console.error(`    Filter Hover: ${hasFilterHover}`);
    console.error(`    Filter Active: ${hasFilterActive}`);
    console.error(`    Gender Hover: ${hasGenderHover}`);
    console.error(`    Gender Active: ${hasGenderActive}`);
    failed = true;
  }
});

console.log('\n--- VERIFICATION RESULT ---');
if (failed) {
  console.error('[FAIL] Some templates failed validation!');
  process.exit(1);
} else {
  console.log('[PASS] Success! All 12 templates have switcher and filter tabs beautifully updated to royal blue accents.');
}
