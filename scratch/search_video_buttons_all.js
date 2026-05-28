const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const count = (content.match(/class="[^"]*video__button[^"]*"/gi) || []).length;
  const countBtn = (content.match(/shopify-section--video/gi) || []).length;
  if (count > 0 || countBtn > 0) {
    console.log(`${file}: found ${count} video__button classes and ${countBtn} shopify-section--video occurrences.`);
  }
});
