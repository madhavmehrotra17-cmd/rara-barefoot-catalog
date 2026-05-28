const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

if (!fs.existsSync(productPath)) {
  console.error('Error: product.html not found!');
  process.exit(1);
}

let html = fs.readFileSync(productPath, 'utf8');

// We want to replace the styling of the multi-column h2 in rara-ultimate-style
// Let's find:
// #shopify-section-template--19195983724718__multi_column_VkYVca h2.h2 {
//     font-family: 'Anton', sans-serif !important;
//     font-weight: 400 !important;
//     font-size: 34px !important; /* Slightly thinned font size feel */
//     letter-spacing: 2px !important; /* Slightly thinned letter-spacing */
//     text-transform: uppercase !important;
// }

const targetCSS = `#shopify-section-template--19195983724718__multi_column_VkYVca h2.h2 {
    font-family: 'Anton', sans-serif !important;
    font-weight: 400 !important;
    font-size: 34px !important; /* Slightly thinned font size feel */
    letter-spacing: 2px !important; /* Slightly thinned letter-spacing */
    text-transform: uppercase !important;
}`;

const replacementCSS = `#shopify-section-template--19195983724718__multi_column_VkYVca h2.h2 {
    font-family: 'Outfit', 'Geist', sans-serif !important;
    font-weight: 400 !important; /* Thinned and extremely readable */
    font-size: 32px !important;
    letter-spacing: 0.5px !important;
    text-transform: uppercase !important;
    color: #000000 !important;
}

/* Force image transparency inside benefits cards to match main page */
.barefoot-benefit-card img,
.barefoot-benefit-card .zoom-image,
.barefoot-benefit-card .benefit-shoe-img {
    background: transparent !important;
    background-color: transparent !important;
}`;

if (html.includes(targetCSS)) {
  html = html.replace(targetCSS, replacementCSS);
  console.log('[SUCCESS] Replaced heading CSS and added image transparency overrides');
} else {
  // If exact string match fails, let's append it to rara-ultimate-style
  console.log('[WARNING] Exact target CSS not found, appending overrides to rara-ultimate-style');
  const ultimateStyleTag = '<style id="rara-ultimate-style">';
  if (html.includes(ultimateStyleTag)) {
    const idx = html.indexOf(ultimateStyleTag);
    const endStyleIdx = html.indexOf('</style>', idx);
    if (endStyleIdx !== -1) {
      html = html.substring(0, endStyleIdx) + replacementCSS + html.substring(endStyleIdx);
      console.log('[SUCCESS] Appended custom transparency and heading overrides inside rara-ultimate-style');
    }
  }
}

fs.writeFileSync(productPath, html, 'utf8');
console.log('Successfully completed Multi-Column Transparency & Thinned Font Upgrade!');
