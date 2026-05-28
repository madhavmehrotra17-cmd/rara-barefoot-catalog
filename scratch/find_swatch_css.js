const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find all CSS rules inside <style> tags that target variant-picker, gender-switch, block-swatch, color-swatch, size-chart
function searchCSS(query) {
  let idx = 0;
  while (true) {
    idx = content.indexOf(query, idx);
    if (idx === -1) break;
    
    // Find the enclosing <style> tag
    let styleStart = content.lastIndexOf('<style', idx);
    let styleEnd = content.indexOf('</style>', idx);
    console.log(`\n--- Found query "${query}" inside style tag ---`);
    console.log(content.substring(idx - 100, idx + 400));
    idx += query.length;
  }
}

searchCSS("gender-switch");
searchCSS("gender-btn");
searchCSS("variant-picker");
searchCSS("#product-sizes");
