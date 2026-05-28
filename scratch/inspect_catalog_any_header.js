const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'catalog.html'), 'utf8');

// Find all occurrences of "<header" or class="header"
const searchStr = '<header';
let idx = 0;
while ((idx = content.indexOf(searchStr, idx)) !== -1) {
    console.log(`Found '${searchStr}' in catalog.html at index: ${idx}`);
    console.log(content.substring(idx - 100, idx + 800));
    console.log('--------------------------------------------------');
    idx += searchStr.length;
}

const navQuery = 'THE COLLECTION';
let nIdx = content.indexOf(navQuery);
if (nIdx !== -1) {
    console.log(`Found '${navQuery}' at index: ${nIdx}`);
    console.log(content.substring(nIdx - 200, nIdx + 600));
}
