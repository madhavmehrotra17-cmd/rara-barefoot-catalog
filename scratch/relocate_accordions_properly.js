const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Locate the start and end of `#product-extra-information` block
const markerStart = '<!-- Relocated Accordions Block inside product-info -->';
const startIdx = content.indexOf(markerStart);

if (startIdx === -1) {
  console.error('[ERROR] Could not find `#product-extra-information` start marker!');
  process.exit(1);
}

// Find the closing tag of `#product-extra-information`.
// The block contains multiple accordions and ends with:
// `</accordion-disclosure>\n</div>` (or `</accordion-disclosure></div>`)
// Let's find `</accordion-disclosure>` after `startIdx`
const faqCloseIdx = content.indexOf('</accordion-disclosure>', startIdx + markerStart.length);
if (faqCloseIdx === -1) {
  console.error('[ERROR] Could not find closing accordion tag!');
  process.exit(1);
}

// Find the first closing `</div>` tag after `</accordion-disclosure>`
const closeDivIdx = content.indexOf('</div>', faqCloseIdx);
if (closeDivIdx === -1) {
  console.error('[ERROR] Could not find closing div for product-extra-information!');
  process.exit(1);
}

const blockEndIdx = closeDivIdx + '</div>'.length;
const extraInfoBlock = content.substring(startIdx, blockEndIdx);

console.log("=== Extracted Accordions Block ===");
console.log(extraInfoBlock.substring(0, 300) + "\n...\n" + extraInfoBlock.substring(extraInfoBlock.length - 300));

// 2. Remove the block and the two extra closing `</div>` tags that follow it
// In the original file:
// `</accordion-disclosure>\n</div>\n</div></div>\n<div class="product-info__block-item"` (or similar whitespace)
// Let's find where `<div class="product-info__block-item" data-block-id="product_variations_fVELVD"` starts after blockEndIdx
const variationsMarker = '<div class="product-info__block-item" data-block-id="product_variations_fVELVD"';
const variationsIdx = content.indexOf(variationsMarker, blockEndIdx);

if (variationsIdx === -1) {
  console.error('[ERROR] Could not find product_variations block!');
  process.exit(1);
}

console.log("Characters between blockEndIdx and variations block:", JSON.stringify(content.substring(blockEndIdx, variationsIdx)));

// Remove the block and everything between it and the variations block (which contains the extra divs)
let contentCleaned = content.substring(0, startIdx) + content.substring(variationsIdx);

// 3. Locate the end of `liquid_gXLmRm` block inside `product-info__block-list`
// The block is:
// `<div class="product-info__block-item" data-block-id="liquid_gXLmRm" data-block-type="liquid" >...</div></div>`
// Followed by `</div>\n</div>\n</div></safe-sticky>`
const gxlMarker = 'data-block-id="liquid_gXLmRm"';
const gxlIdx = contentCleaned.indexOf(gxlMarker);

if (gxlIdx === -1) {
  console.error('[ERROR] Could not find liquid_gXLmRm block in cleaned content!');
  process.exit(1);
}

// Find the first `</div>` after gxlIdx (closes .liquid)
const firstDiv = contentCleaned.indexOf('</div>', gxlIdx);
// Find the second `</div>` (closes .product-info__block-item)
const secondDiv = contentCleaned.indexOf('</div>', firstDiv + 6);

if (firstDiv === -1 || secondDiv === -1) {
  console.error('[ERROR] Could not find closing divs for liquid_gXLmRm!');
  process.exit(1);
}

const insertIdx = secondDiv + '</div>'.length;

console.log("Snippet at insertion point before insertion:");
console.log(contentCleaned.substring(insertIdx - 100, insertIdx + 200));

// Insert the accordions block at this location
let finalContent = contentCleaned.substring(0, insertIdx) + "\n\n" + extraInfoBlock + "\n\n" + contentCleaned.substring(insertIdx);

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('[SUCCESS] Relocated accordions block to the very end of `.product-info__block-list` and resolved HTML nesting!');
