const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Relocating Snapmint EMI card widget to sit below the Add to Cart/Buy buttons...');

// 1. Locate and extract the Snapmint block (`liquid_EBEaCB`)
const snapmintMarker = 'data-block-id="liquid_EBEaCB"';
const snapmintStartIdx = content.indexOf(snapmintMarker);

if (snapmintStartIdx === -1) {
  console.error('[ERROR] Could not find Snapmint block `liquid_EBEaCB` start marker!');
  process.exit(1);
}

// The tag starts with `<div class="product-info__block-item" data-block-id="liquid_EBEaCB"`
const tagStartIdx = content.lastIndexOf('<div', snapmintStartIdx);
if (tagStartIdx === -1) {
  console.error('[ERROR] Could not find opening div for Snapmint block!');
  process.exit(1);
}

// Find matching closing </div> for the Snapmint block item
let depth = 1;
let pos = tagStartIdx + '<div class="product-info__block-item"'.length;
while (pos < content.length && depth > 0) {
  const nextOpen = content.indexOf('<div', pos);
  const nextClose = content.indexOf('</div>', pos);
  if (nextClose === -1) break;
  if (nextOpen !== -1 && nextOpen < nextClose) {
    depth++;
    pos = nextOpen + 4;
  } else {
    depth--;
    pos = nextClose + 6;
  }
}
const tagEndIdx = pos;
const snapmintBlock = content.substring(tagStartIdx, tagEndIdx);

console.log("=== Extracted Snapmint Block ===");
console.log(snapmintBlock.substring(0, 300) + " ... " + snapmintBlock.substring(snapmintBlock.length - 200));

// Remove the block from its current position
let contentCleaned = content.substring(0, tagStartIdx) + content.substring(tagEndIdx);

// 2. Locate the buy_buttons block item in cleaned content
const buyMarker = 'data-block-id="buy_buttons"';
const buyStartIdx = contentCleaned.indexOf(buyMarker);

if (buyStartIdx === -1) {
  console.error('[ERROR] Could not find buy_buttons block start marker in cleaned content!');
  process.exit(1);
}

const buyTagStart = contentCleaned.lastIndexOf('<div', buyStartIdx);
if (buyTagStart === -1) {
  console.error('[ERROR] Could not find opening div for buy_buttons block!');
  process.exit(1);
}

// Find matching closing </div> for buy_buttons block item
depth = 1;
pos = buyTagStart + '<div class="product-info__block-item"'.length;
while (pos < contentCleaned.length && depth > 0) {
  const nextOpen = contentCleaned.indexOf('<div', pos);
  const nextClose = contentCleaned.indexOf('</div>', pos);
  if (nextClose === -1) break;
  if (nextOpen !== -1 && nextOpen < nextClose) {
    depth++;
    pos = nextOpen + 4;
  } else {
    depth--;
    pos = nextClose + 6;
  }
}
const buyTagEnd = pos;

console.log("\nSnippet after buy_buttons block before insertion:");
console.log(contentCleaned.substring(buyTagEnd - 100, buyTagEnd + 200));

// Insert the Snapmint block right after the closing </div> of buy_buttons block item
let finalContent = contentCleaned.substring(0, buyTagEnd) + "\n\n" + snapmintBlock + "\n\n" + contentCleaned.substring(buyTagEnd);

// Check if we also need to do this for the Quick Buy modal's Snapmint block
// Quick buy modal has block ID: liquid_EBEaCB but wait!
// Let's check how many occurrences of `data-block-id="liquid_EBEaCB"` exist in the final content.
let checkIdx = 0;
let occurrences = [];
while (true) {
  checkIdx = finalContent.indexOf(snapmintMarker, checkIdx);
  if (checkIdx === -1) break;
  occurrences.push(checkIdx);
  checkIdx += snapmintMarker.length;
}
console.log(`\nOccurrences of Snapmint block in final content: ${occurrences.length}`);

// If there's another occurrence in the Quick Buy modal, let's also relocate it!
if (occurrences.length > 1) {
  console.log("Relocating secondary Snapmint block inside Quick Buy modal...");
  // The second occurrence starts at occurrences[1] in finalContent
  const secondStart = occurrences[1];
  const secondTagStart = finalContent.lastIndexOf('<div', secondStart);
  
  // Find matching close
  depth = 1;
  pos = secondTagStart + '<div class="product-info__block-item"'.length;
  while (pos < finalContent.length && depth > 0) {
    const nextOpen = finalContent.indexOf('<div', pos);
    const nextClose = finalContent.indexOf('</div>', pos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  const secondTagEnd = pos;
  const secondSnapmintBlock = finalContent.substring(secondTagStart, secondTagEnd);
  
  // Remove it
  let finalCleaned = finalContent.substring(0, secondTagStart) + finalContent.substring(secondTagEnd);
  
  // Find the second buy_buttons block (inside quick buy modal)
  let buyOccurrences = [];
  let bIdx = 0;
  while (true) {
    bIdx = finalCleaned.indexOf(buyMarker, bIdx);
    if (bIdx === -1) break;
    buyOccurrences.push(bIdx);
    bIdx += buyMarker.length;
  }
  
  console.log(`Occurrences of buy_buttons in finalCleaned: ${buyOccurrences.length}`);
  if (buyOccurrences.length > 1) {
    const secondBuyStart = buyOccurrences[1];
    const secondBuyTagStart = finalCleaned.lastIndexOf('<div', secondBuyStart);
    
    depth = 1;
    pos = secondBuyTagStart + '<div class="product-info__block-item"'.length;
    while (pos < finalCleaned.length && depth > 0) {
      const nextOpen = finalCleaned.indexOf('<div', pos);
      const nextClose = finalCleaned.indexOf('</div>', pos);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 4;
      } else {
        depth--;
        pos = nextClose + 6;
      }
    }
    const secondBuyTagEnd = pos;
    
    finalContent = finalCleaned.substring(0, secondBuyTagEnd) + "\n\n" + secondSnapmintBlock + "\n\n" + finalCleaned.substring(secondBuyTagEnd);
    console.log("[PASS] Successfully relocated secondary Snapmint block in Quick Buy modal!");
  } else {
    finalContent = finalCleaned; // Fallback
  }
}

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('[SUCCESS] Successfully relocated Snapmint EMI card widget below the Buy Now buttons!');
