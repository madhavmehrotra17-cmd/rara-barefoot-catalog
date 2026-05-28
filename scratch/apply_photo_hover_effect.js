const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Adding premium GPU hardware-accelerated hovering effect to the photo section in product.html...');

const oldCSS = `.foot-svg {
    width: 100% !important;
    max-width: 310px !important;
    height: auto !important;
    filter: drop-shadow(0 4px 15px rgba(0,0,0,0.02)) !important;
}`;

const newCSS = `.foot-svg {
    width: 100% !important;
    max-width: 310px !important;
    height: auto !important;
    filter: drop-shadow(0 4px 15px rgba(0,0,0,0.02)) !important;
    transition: transform 0.45s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.45s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
    will-change: transform, filter !important;
}

.foot-svg:hover {
    transform: scale(1.04) translate3d(0, -4px, 0) !important;
    filter: drop-shadow(0 15px 35px rgba(9, 84, 146, 0.16)) !important;
    cursor: zoom-in !important;
}`;

// Make sure we replace all instances in the CSS styles blocks
if (!content.includes(oldCSS)) {
  // Try Unix line endings
  const oldCSSUnix = oldCSS.replaceAll('\r\n', '\n');
  const newCSSUnix = newCSS.replaceAll('\r\n', '\n');
  if (content.includes(oldCSSUnix)) {
    content = content.replaceAll(oldCSSUnix, newCSSUnix);
    console.log('[SUCCESS] Replaced Unix style blocks!');
  } else {
    // Try generic replace
    content = content.replaceAll('filter: drop-shadow(0 4px 15px rgba(0,0,0,0.02)) !important;', 'filter: drop-shadow(0 4px 15px rgba(0,0,0,0.02)) !important;\n    transition: transform 0.45s cubic-bezier(0.165, 0.84, 0.44, 1), filter 0.45s cubic-bezier(0.165, 0.84, 0.44, 1) !important;\n    will-change: transform, filter !important;\n}\n.foot-svg:hover {\n    transform: scale(1.04) translate3d(0, -4px, 0) !important;\n    filter: drop-shadow(0 15px 35px rgba(9, 84, 146, 0.16)) !important;\n    cursor: zoom-in !important;');
    console.log('[SUCCESS] Replaced generic style blocks!');
  }
} else {
  content = content.replaceAll(oldCSS, newCSS);
  console.log('[SUCCESS] Replaced CRLF style blocks!');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('[SUCCESS] Deployed interactive hardware-accelerated zoom hover effect on the barefoot illustration card!');
