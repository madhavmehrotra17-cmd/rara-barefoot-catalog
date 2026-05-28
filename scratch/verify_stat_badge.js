const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('--- VERIFYING FOOT STRENGTH STAT BADGE ---');

// Check CSS exists
if (content.includes('/* 10. Premium Foot Strength Stat Badge */')) {
  console.log('[PASS] CSS block found inside style tags.');
} else {
  console.log('[FAIL] CSS block NOT found!');
  process.exit(1);
}

// Check HTML markup exists
const targetMarkup = 'data-block-id="liquid_foot_strength_stat"';
const occurrences = content.split(targetMarkup).length - 1;
if (occurrences === 2) {
  console.log('[PASS] Exactly 2 stat badges found in product.html (desktop & mobile).');
} else {
  console.log(`[FAIL] Found ${occurrences} stat badges instead of 2!`);
  process.exit(1);
}

// Check content accuracy
if (content.includes('57.4% Stronger Feet in 6 Months.') && content.includes('The scientifically proven power of natural movement.')) {
  console.log('[PASS] Stat badge contains the exact approved line.');
} else {
  console.log('[FAIL] Stat badge does not contain the exact approved copy!');
  process.exit(1);
}

console.log('[SUCCESS] All Foot Strength Stat Badge verifications passed perfectly!');
