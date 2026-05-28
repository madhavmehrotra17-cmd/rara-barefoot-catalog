const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const targetIdx = content.indexOf('<div class="barefoot-science-widget">');
if (targetIdx !== -1) {
  // Let's print 300 characters before the tag and 300 characters after the closing tag of this widget block
  const blockStartIdx = content.lastIndexOf('<div class="product-info__block-item" data-block-id="liquid_hkYqHg"', targetIdx);
  console.log('Block wrapper start idx:', blockStartIdx);
  console.log('Context before:');
  console.log(content.substring(blockStartIdx - 200, blockStartIdx));
  
  // Find closing </div></div> of data-block-id="liquid_hkYqHg"
  const endBlockIdx = content.indexOf('</div></div>', targetIdx) + 12;
  // Let's check if the next block is there
  console.log('Block wrapper end idx:', endBlockIdx);
  console.log('Context after:');
  console.log(content.substring(endBlockIdx, endBlockIdx + 400));
}
