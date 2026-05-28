const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

const styleEndIdx = content.indexOf('</style>', content.indexOf('id="rara-ultimate-style"'));
if (styleEndIdx === -1) {
  console.error('Failed to find rara-ultimate-style closing tag!');
  process.exit(1);
}

const customCSS = `
/* --- Premium Accordions Placement & Margins (Alignment Fix) --- */
#product-extra-information {
  max-width: 1360px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

@media screen and (min-width: 768px) {
  #product-extra-information {
    padding-left: 40px !important;
    padding-right: 40px !important;
  }
}

@media screen and (min-width: 1200px) {
  #product-extra-information {
    padding-left: 60px !important;
    padding-right: 60px !important;
  }
}
`;

const updatedContent = 
  content.substring(0, styleEndIdx) +
  customCSS +
  content.substring(styleEndIdx);

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully aligned premium accordion sections to the page-width container grid!');
