const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. EXTRACT & RELOCATE #product-extra-information
console.log('--- 1. Relocating #product-extra-information ---');
const startTag = '<div id="product-extra-information"';
const startIdx = content.indexOf(startTag);

if (startIdx === -1) {
  console.error('[ERROR] Could not find #product-extra-information start tag!');
  process.exit(1);
}

// Find matching closing </div>
let depth = 1;
let pos = startIdx + startTag.length;
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
const endIdx = pos;
console.log('Extracted block from index:', startIdx, 'to', endIdx);
const blockHTML = content.substring(startIdx, endIdx);

// Remove the block from its original position
content = content.substring(0, startIdx) + content.substring(endIdx);

// Find the closing </div> of .product-info__block-list
const listStartTag = '<div class="product-info__block-list">';
const listStartIdx = content.indexOf(listStartTag);
if (listStartIdx === -1) {
  console.error('[ERROR] Could not find .product-info__block-list start tag!');
  process.exit(1);
}

depth = 1;
pos = listStartIdx + listStartTag.length;
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
const listEndIdx = pos - 6;
console.log('Found list end index at:', listEndIdx);

// Insert the accordion block inside the list right before the closing </div>
content = 
  content.substring(0, listEndIdx) +
  '\n<!-- Relocated Accordions Block inside product-info -->\n' +
  blockHTML +
  '\n' +
  content.substring(listEndIdx);

console.log('[SUCCESS] Successfully relocated accordions inside product-info!');

// 2. SIMPLIFY BAREFOOT SCIENCE SIMULATOR (REMOVE TRADITIONAL SNEAKER & UPDATE COPY)
console.log('\n--- 2. Simplifying Barefoot Science Simulator ---');

// a. Remove Toggle switch container
const toggleStart = content.indexOf('<div class="science-toggle-container">');
if (toggleStart !== -1) {
  // Find matching closing </div> for toggle switch
  let toggleDepth = 1;
  let togglePos = toggleStart + '<div class="science-toggle-container">'.length;
  while (togglePos < content.length && toggleDepth > 0) {
    const nextOpen = content.indexOf('<div', togglePos);
    const nextClose = content.indexOf('</div>', togglePos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      toggleDepth++;
      togglePos = nextOpen + 4;
    } else {
      toggleDepth--;
      togglePos = nextClose + 6;
    }
  }
  console.log('Removing toggle switch container from index:', toggleStart, 'to', togglePos);
  content = content.substring(0, toggleStart) + content.substring(togglePos);
}

// b. Remove Traditional Visual Graphic
const tradVisualStart = content.indexOf('<div class="foot-graphic-wrapper" id="visual-traditional">');
if (tradVisualStart !== -1) {
  let tradVisualDepth = 1;
  let tradVisualPos = tradVisualStart + '<div class="foot-graphic-wrapper" id="visual-traditional">'.length;
  while (tradVisualPos < content.length && tradVisualDepth > 0) {
    const nextOpen = content.indexOf('<div', tradVisualPos);
    const nextClose = content.indexOf('</div>', tradVisualPos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      tradVisualDepth++;
      tradVisualPos = nextOpen + 4;
    } else {
      tradVisualDepth--;
      tradVisualPos = nextClose + 6;
    }
  }
  console.log('Removing traditional visual graphic from index:', tradVisualStart, 'to', tradVisualPos);
  content = content.substring(0, tradVisualStart) + content.substring(tradVisualPos);
}

// c. Remove Traditional Details Panel
const tradDetailsStart = content.indexOf('<div class="details-pane" id="details-traditional">');
if (tradDetailsStart !== -1) {
  let tradDetailsDepth = 1;
  let tradDetailsPos = tradDetailsStart + '<div class="details-pane" id="details-traditional">'.length;
  while (tradDetailsPos < content.length && tradDetailsDepth > 0) {
    const nextOpen = content.indexOf('<div', tradDetailsPos);
    const nextClose = content.indexOf('</div>', tradDetailsPos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      tradDetailsDepth++;
      tradDetailsPos = nextOpen + 4;
    } else {
      tradDetailsDepth--;
      tradDetailsPos = nextClose + 6;
    }
  }
  console.log('Removing traditional details panel from index:', tradDetailsStart, 'to', tradDetailsPos);
  content = content.substring(0, tradDetailsStart) + content.substring(tradDetailsPos);
}

// d. Update Barefoot Details copy
console.log('Updating barefoot details text...');

// Target 1: Wide Toe Box paragraph
const toeBoxTarget = '<h5>Wide Toe Box</h5>\n            <p>Toes spread naturally, dramatically improving balance and foot arch stability.</p>';
const toeBoxReplacement = '<h5>Wide Toe Box</h5>\n            <p>Toes spread naturally, improving balance, stability, and overall foot strength.</p>';
if (content.includes(toeBoxTarget)) {
  content = content.replace(toeBoxTarget, toeBoxReplacement);
  console.log('[PASS] Updated Wide Toe Box copy.');
} else {
  // Let's try flexible search
  const alternativeTarget = 'Toes spread naturally, dramatically improving balance and foot arch stability.';
  if (content.includes(alternativeTarget)) {
    content = content.replace(alternativeTarget, 'Toes spread naturally, improving balance, stability, and overall foot strength.');
    console.log('[PASS] Updated Wide Toe Box copy (fallback).');
  } else {
    console.log('[WARN] Wide Toe Box copy match not found!');
  }
}

// Target 2: Flexible Sole
const soleTarget = '<h5>Flexible 5 mm Sole</h5>\n            <p>High ground sensory feedback wakes up lazy foot nerves and builds muscle strength.</p>';
const soleReplacement = '<h5>Flexible Sole</h5>\n            <p>Moves naturally with your feet, activating muscles and improving ground connection.</p>';
if (content.includes(soleTarget)) {
  content = content.replace(soleTarget, soleReplacement);
  console.log('[PASS] Updated Flexible Sole copy.');
} else {
  const alternativeTarget = 'High ground sensory feedback wakes up lazy foot nerves and builds muscle strength.';
  if (content.includes(alternativeTarget)) {
    content = content.replace(alternativeTarget, 'Moves naturally with your feet, activating muscles and improving ground connection.');
    // Let's also change the header if we find it
    content = content.replace('<h5>Flexible 5 mm Sole</h5>', '<h5>Flexible Sole</h5>');
    console.log('[PASS] Updated Flexible Sole copy (fallback).');
  } else {
    console.log('[WARN] Flexible Sole copy match not found!');
  }
}

// Target 3: Natural Zero Drop
const dropTarget = '<h5>Natural Zero Drop</h5>\n            <p>Zero heel-slant aligns your ankles, knees, hips, and spine to correct body posture.</p>';
const dropReplacement = '<h5>Natural Zero Drop</h5>\n            <p>Keeps posture naturally aligned, reducing strain on knees, hips, and spine.</p>';
if (content.includes(dropTarget)) {
  content = content.replace(dropTarget, dropReplacement);
  console.log('[PASS] Updated Natural Zero Drop copy.');
} else {
  const alternativeTarget = 'Zero heel-slant aligns your ankles, knees, hips, and spine to correct body posture.';
  if (content.includes(alternativeTarget)) {
    content = content.replace(alternativeTarget, 'Keeps posture naturally aligned, reducing strain on knees, hips, and spine.');
    console.log('[PASS] Updated Natural Zero Drop copy (fallback).');
  } else {
    console.log('[WARN] Natural Zero Drop copy match not found!');
  }
}

// e. Update interactive switch intro text
content = content.replace(
  '<p class="science-intro">Traditional sneakers squeeze your toes and elevate your heel. Rara Barefoot lets your feet move, splay, and balance naturally.</p>',
  '<p class="science-intro">Rara Barefoot lets your feet move, splay, and balance naturally with standard anatomical parameters.</p>'
);

// f. Remove inline toggle click script
const scriptStart = content.indexOf('document.addEventListener(\'DOMContentLoaded\', function() {\n  const toggleBtns = document.querySelectorAll(\'.science-toggle-btn\');');
if (scriptStart !== -1) {
  const scriptEnd = content.indexOf('</script>', scriptStart);
  if (scriptEnd !== -1) {
    console.log('Simplifying inline click toggle script...');
    content = content.substring(0, scriptStart) + '\n  // Click toggling removed for barefoot-only focus\n' + content.substring(scriptEnd);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('[SUCCESS] Successfully completed all HTML structural relocation and focus focus barefoot edits!');
