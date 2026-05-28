const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- Fixing Nested Button Styles ---');

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let updated = false;

  // Pattern 1: Normal button styles
  const before1 = `.button,
.product-card__quick-add-button,
.gender-banner-button,
.all-video-buttons,
.video__button {`;
  
  const after1 = `.button,
.product-card__quick-add-button,
.gender-banner-button {`;

  if (content.includes(before1)) {
    content = content.replace(before1, after1);
    updated = true;
  } else {
    // Try variations with different spacing/newlines
    const regex1 = /\.button,\s*\.product-card__quick-add-button,\s*\.gender-banner-button,\s*\.all-video-buttons,\s*\.video__button\s*\{/gi;
    if (regex1.test(content)) {
      content = content.replace(regex1, '.button,\n.product-card__quick-add-button,\n.gender-banner-button {');
      updated = true;
    }
  }

  // Pattern 2: Hover button styles
  const before2 = `.button:hover,
.product-card__quick-add-button:hover,
.gender-banner-button:hover,
.all-video-buttons:hover,
.video__button:hover {`;

  const after2 = `.button:hover,
.product-card__quick-add-button:hover,
.gender-banner-button:hover {`;

  if (content.includes(before2)) {
    content = content.replace(before2, after2);
    updated = true;
  } else {
    const regex2 = /\.button:hover,\s*\.product-card__quick-add-button:hover,\s*\.gender-banner-button:hover,\s*\.all-video-buttons:hover,\s*\.video__button:hover\s*\{/gi;
    if (regex2.test(content)) {
      content = content.replace(regex2, '.button:hover,\n.product-card__quick-add-button:hover,\n.gender-banner-button:hover {');
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[SUCCESS] Fixed nested CTA selectors in ${file}`);
  } else {
    console.log(`[WARNING] No patterns matched in ${file}`);
  }
});

console.log('\nNested button styles fix completed.');
