const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html.bak_header'), 'utf8');
const startTag = '<x-header';
const endTag = '</x-header>';

const startIdx = content.indexOf(startTag);
const endIdx = content.indexOf(endTag) + endTag.length;

if (startIdx !== -1 && content.indexOf(endTag) !== -1) {
    const headerMarkup = content.substring(startIdx, endIdx);
    fs.writeFileSync(path.join(__dirname, 'index_header_bak_extracted.html'), headerMarkup, 'utf8');
    console.log("Wrote header markup to scratch/index_header_bak_extracted.html");
} else {
    console.log("Could not find x-header in index.html.bak_header");
}
