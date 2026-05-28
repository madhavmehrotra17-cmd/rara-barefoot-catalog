const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- SAFELY REMOVING CONFLICTING FEATURES STYLE BLOCK ---');

if (!fs.existsSync(productPath)) {
  console.error('Error: product.html not found!');
  process.exit(1);
}

let html = fs.readFileSync(productPath, 'utf8');

// 1. Find the index of the HTML markup for features-grid container
const markupIndex = html.indexOf('<div class="features-grid">');

if (markupIndex !== -1) {
  console.log(`[FOUND] <div class="features-grid"> markup at index: ${markupIndex}`);
  
  // 2. Search for the next <style> tag AFTER the features markup
  const styleStartIdx = html.indexOf('<style>', markupIndex);
  
  if (styleStartIdx !== -1) {
    console.log(`[FOUND] Conflicting <style> tag in body at index: ${styleStartIdx}`);
    
    // Find the closing </style> tag succeeding this style block
    const styleEndIdx = html.indexOf('</style>', styleStartIdx);
    
    if (styleEndIdx !== -1) {
      const styleBlock = html.substring(styleStartIdx, styleEndIdx + 8);
      console.log('--- TARGET CONFLICTING STYLE BLOCK ---');
      console.log(styleBlock.substring(0, 200) + '\n...\n' + styleBlock.substring(styleBlock.length - 150));
      
      // Remove it cleanly
      html = html.replace(styleBlock, '');
      fs.writeFileSync(productPath, html, 'utf8');
      console.log('[SUCCESS] Successfully removed conflicting features style block!');
    } else {
      console.error('Error: Could not find closing </style> tag for the body style block!');
    }
  } else {
    console.error('Error: Could not find <style> tag after features-grid markup!');
  }
} else {
  console.error('Error: Could not find <div class="features-grid"> markup in product.html!');
}
