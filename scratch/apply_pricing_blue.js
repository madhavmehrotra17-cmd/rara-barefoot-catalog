const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- APPLYING ROYAL BLUE PRICING ACCENTS SITEWIDE ---');

const pricingStyles = `
/* --- Premium Royal Blue Brand Accents --- */
sale-price, 
.price, 
.price-item, 
.price-list sale-price, 
.price-list .price-item,
.product-info__price .price,
.product-card__price,
.card-information .price,
.price--on-sale .price-item--sale,
[class*="ai-related-product-price"],
.search-filters__product-price--sale,
.search-filters__product-price--default,
.search-filters__search-suggestion-product-price {
    color: #095492 !important;
}

compare-at-price,
.compare-at-price,
.price-list compare-at-price,
.price__compare,
.search-filters__product-price--compare,
[class*="ai-related-product-price"] .compare-at,
[class*="compare-at-price"] {
    color: #888888 !important;
    text-decoration: line-through !important;
    font-weight: normal !important;
}
`;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const ultimateStyleTag = '<style id="rara-ultimate-style">';
  
  if (content.includes(ultimateStyleTag)) {
    // Let's strip any existing pricing blocks we added in the previous run to avoid duplicating
    const oldBlockTag = '/* --- Premium Royal Blue Brand Accents --- */';
    if (content.includes(oldBlockTag)) {
      const startOldIdx = content.indexOf(oldBlockTag);
      // We want to find the next closing style tag but wait! Let's be precise.
      // The end of the pricing block is right before the closing style tag. Let's find it.
      const endStyleIdx = content.indexOf('</style>', startOldIdx);
      if (endStyleIdx !== -1) {
        // Strip the old block
        content = content.substring(0, startOldIdx) + content.substring(endStyleIdx);
      }
    }

    // Now append the updated pricing styles before the closing </style> of rara-ultimate-style
    const idx = content.indexOf(ultimateStyleTag);
    const endStyleIdx = content.indexOf('</style>', idx);
    
    if (endStyleIdx !== -1) {
      content = content.substring(0, endStyleIdx) + pricingStyles + content.substring(endStyleIdx);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[SUCCESS] Appended/Updated premium pricing styles in ${file}`);
    } else {
      console.log(`[WARNING] Closing </style> not found for rara-ultimate-style in ${file}`);
    }
  } else {
    console.log(`[WARNING] <style id="rara-ultimate-style"> not found in ${file}`);
  }
});

console.log('\nSitewide product pricing successfully updated to Premium Royal Blue!');
