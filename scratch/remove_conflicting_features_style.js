const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- STRIPPING CONFLICTING FEATURES STYLE BLOCK ---');

if (!fs.existsSync(productPath)) {
  console.error('Error: product.html not found!');
  process.exit(1);
}

let html = fs.readFileSync(productPath, 'utf8');

// The original features style block starts with .features-grid { and ends with the next </style>
const startToken = '.features-grid {';
const startIdx = html.indexOf(startToken);

if (startIdx !== -1) {
  // Find the preceding <style> tag
  const precedingStyleIdx = html.lastIndexOf('<style>', startIdx);
  // Find the succeeding </style> tag
  const closingStyleIdx = html.indexOf('</style>', startIdx);
  
  if (precedingStyleIdx !== -1 && closingStyleIdx !== -1) {
    const styleBlock = html.substring(precedingStyleIdx, closingStyleIdx + 8);
    console.log('[FOUND CONFLICTING STYLE BLOCK]');
    console.log(styleBlock.substring(0, 300) + '\n...\n' + styleBlock.substring(styleBlock.length - 150));
    
    // Remove the style block
    html = html.replace(styleBlock, '');
    fs.writeFileSync(productPath, html, 'utf8');
    console.log('[SUCCESS] Successfully removed conflicting features style block!');
  } else {
    console.error('Error: Could not find preceding <style> or succeeding </style> tag!');
  }
} else {
  console.error('Error: Could not find .features-grid styling target!');
}
