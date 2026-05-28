const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Replacing inline SVG with barefoot-illustration.png in product.html...');

const startMarker = '<div class="foot-graphic-wrapper active" id="visual-barefoot">';
const startIdx = content.indexOf(startMarker);
let endIdx = -1;

if (startIdx !== -1) {
  // Find the closing </div> of the foot-graphic-wrapper
  const svgCloseIdx = content.indexOf('</svg>', startIdx);
  if (svgCloseIdx !== -1) {
    const endWrapperIdx = content.indexOf('</div>', svgCloseIdx);
    if (endWrapperIdx !== -1) {
      endIdx = endWrapperIdx + '</div>'.length;
    }
  }
}

if (startIdx === -1 || endIdx === -1) {
  console.error('[ERROR] Could not find the visual-barefoot container boundaries in product.html!');
  process.exit(1);
}

const imageReplacement = `<div class="foot-graphic-wrapper active" id="visual-barefoot">
        <img src="barefoot-illustration.png" alt="Barefoot Top & Side Views" class="foot-svg barefoot-svg" style="width: 100% !important; max-width: 310px !important; height: auto !important; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); display: block; margin: 0 auto;" />
      </div>`;

const newContent = content.substring(0, startIdx) + imageReplacement + content.substring(endIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('[SUCCESS] Successfully replaced inline SVG with the custom high-fidelity barefoot-illustration.png image in product.html!');
