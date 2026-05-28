const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const startTag = '<div class="barefoot-science-widget">';
const endTag = '<!-- Interactive Size & Gender Swatches';

const startIdx = content.indexOf(startTag);
console.log('Start index of barefoot-science-widget:', startIdx);

// Let's find where the simulator ends (it ends before the next sections, let's search for some text after it)
const endSearchTag = '</div></div><div class="product-info__block-item" data-block-id="liquid_hkYqHg"';
const nextTagIdx = content.indexOf('</div></div><div class="product-info__block-item" data-block-id="liquid_hkYqHg"');
console.log('Next tag index:', nextTagIdx);

if (startIdx !== -1) {
  // Let's find the closing tag of this liquid block. The block starts with:
  // <div class="product-info__block-item" data-block-id="liquid_hkYqHg" data-block-type="liquid" ><div class="liquid"><!-- Interactive Barefoot Science Simulator -->
  const blockStartStr = 'data-block-id="liquid_hkYqHg"';
  const blockStartIdx = content.lastIndexOf('<div', startIdx);
  console.log('Block wrapper start index:', blockStartIdx);
  
  // Let's find the closing </div></div> of this block item
  let blockEndIdx = content.indexOf('</div></div>', startIdx);
  if (blockEndIdx !== -1) {
    blockEndIdx += 12; // include closing tags
    console.log('Block wrapper end index:', blockEndIdx);
    console.log('Content segment:');
    console.log(content.substring(blockStartIdx, blockStartIdx + 300));
    console.log('...');
    console.log(content.substring(blockEndIdx - 300, blockEndIdx));
  }
}
