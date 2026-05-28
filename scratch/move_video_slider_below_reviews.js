const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Relocating "Hear What They have to Say" video slider section below the Customer Reviews widget...');

const sliderStartStr = '<div id="shopify-section-template--19195983724718__177182557127a943f6"';
const sliderEndStr = '<div id="shopify-section-template--19195983724718__blocks_eAUxzB"';
const reviewsEndStr = '<section id="shopify-section-template--19195983724718__apps_qQBXD4"';

const sliderStart = content.indexOf(sliderStartStr);
const sliderEnd = content.indexOf(sliderEndStr);
const reviewsEnd = content.indexOf(reviewsEndStr);

if (sliderStart === -1 || sliderEnd === -1 || reviewsEnd === -1) {
  console.error('[ERROR] Could not locate the section boundaries in product.html!');
  console.error('sliderStart:', sliderStart, 'sliderEnd:', sliderEnd, 'reviewsEnd:', reviewsEnd);
  process.exit(1);
}

const leftOver = content.substring(0, sliderStart);
const middle = content.substring(sliderEnd, reviewsEnd);
const sliderContent = content.substring(sliderStart, sliderEnd);
const rightOver = content.substring(reviewsEnd);

const newContent = leftOver + middle + sliderContent + rightOver;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('[SUCCESS] Successfully relocated the video slider section below the customer reviews section in product.html!');
