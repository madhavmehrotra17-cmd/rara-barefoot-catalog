const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');
const startTag = '<x-header';
const endTag = '</x-header>';

const startIdx = content.indexOf(startTag);
const endIdx = content.indexOf(endTag) + endTag.length;

if (startIdx !== -1 && content.indexOf(endTag) !== -1) {
    const headerMarkup = content.substring(startIdx, endIdx);
    fs.writeFileSync(path.join(__dirname, 'product_header_extracted.html'), headerMarkup, 'utf8');
    console.log("Wrote header markup to scratch/product_header_extracted.html");
} else {
    console.log("Could not find x-header in product.html");
}
