const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find `<safe-sticky class="product-info ">`
const infoIdx = content.indexOf('<safe-sticky class="product-info ">');
console.log('product-info safe-sticky index:', infoIdx);

if (infoIdx !== -1) {
  // Let's count open elements from infoIdx onwards
  let currentIdx = infoIdx;
  let openElements = 0;
  
  // We want to track the nesting level of tags to see where they close
  // Let's search for tags and print their open/close state
  const limit = 120000;
  const chunk = content.substring(infoIdx, infoIdx + limit);
  
  let regex = /<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*)?>/g;
  let match;
  let nesting = 0;
  
  console.log("=== Nesting analysis starting from <safe-sticky class=\"product-info \"> ===");
  while ((match = regex.exec(chunk)) !== null) {
    let fullTag = match[0];
    let tagName = match[1];
    let isClosing = fullTag.startsWith('</');
    
    // Ignore self-closing tags and specific tag types that don't change nesting
    let isSelfClosing = fullTag.endsWith('/>') || /^(img|br|hr|input|meta|link|style|noscript|script)$/i.test(tagName);
    
    if (!isSelfClosing) {
      if (isClosing) {
        nesting--;
      } else {
        nesting++;
      }
    }
    
    // Let's print whenever we see key divs, variant pickers or the end of product-info
    if (fullTag.includes('data-block-id') || fullTag.includes('variant-picker') || fullTag.includes('product-extra-information') || tagName === 'safe-sticky') {
      console.log(`Nesting Level: ${nesting} | Tag: ${fullTag.substring(0, 100)}...`);
    }
    
    if (tagName === 'safe-sticky' && isClosing && nesting <= 0) {
      console.log(`\n>>> DETECTED </safe-sticky> at Nesting Level: ${nesting}!`);
      console.log(content.substring(infoIdx + match.index - 100, infoIdx + match.index + 200));
      break;
    }
  }
}
