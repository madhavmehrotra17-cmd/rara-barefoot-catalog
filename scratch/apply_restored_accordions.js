const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Read the restored accordions block
const restoredPath = path.join(__dirname, 'restored_accordions.html');
let restored = fs.readFileSync(restoredPath, 'utf8');

console.log("Original Restored block length:", restored.length);

// 2. Clean the restored block:
// It ends with:
// `</accordion-disclosure>\n</div>\n</div></div>` (or variations with whitespace)
// Let's find the last `</accordion-disclosure>`
const faqCloseIdx = restored.lastIndexOf('</accordion-disclosure>');
if (faqCloseIdx === -1) {
  console.error('[ERROR] Could not find </accordion-disclosure> in restored content!');
  process.exit(1);
}

// Find the first `</div>` after it (closes `#product-extra-information`)
const closeDiv = restored.indexOf('</div>', faqCloseIdx);
if (closeDiv === -1) {
  console.error('[ERROR] Could not find closing div in restored content!');
  process.exit(1);
}

// The clean restored HTML should end right after this closing div!
const cleanRestored = restored.substring(0, closeDiv + '</div>'.length);

console.log("=== Cleaned Restored block length:", cleanRestored.length);
console.log("Ending snippet:");
console.log(cleanRestored.substring(cleanRestored.length - 200));

// 3. Find the existing `#product-extra-information` block inside `product.html`
const startMarker = '<!-- Relocated Accordions Block inside product-info -->';
const startIdx = content.indexOf(startMarker);

if (startIdx === -1) {
  console.error('[ERROR] Could not find relocated accordions block inside product.html!');
  process.exit(1);
}

// Find the closing tag of this block in product.html
// Since it's the half-baked one, it has only the first accordion. Let's find the closing `</accordion-disclosure>`
const firstClose = content.indexOf('</accordion-disclosure>', startIdx);
if (firstClose === -1) {
  console.error('[ERROR] Could not find </accordion-disclosure> inside product.html!');
  process.exit(1);
}

// Find the first `</div>` after it (closes the half-baked container)
const halfBakedCloseDiv = content.indexOf('</div>', firstClose);
if (halfBakedCloseDiv === -1) {
  console.error('[ERROR] Could not find closing div for half-baked block in product.html!');
  process.exit(1);
}

const endIdx = halfBakedCloseDiv + '</div>'.length;

console.log("\nHalf-baked block in product.html being replaced:");
console.log(content.substring(startIdx, endIdx));

// Replace the half-baked block with the complete, cleaned restored block!
const newContent = content.substring(0, startIdx) + cleanRestored + content.substring(endIdx);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('\n[SUCCESS] Successfully applied the complete restored accordions block inside product.html and resolved DOM nesting!');
