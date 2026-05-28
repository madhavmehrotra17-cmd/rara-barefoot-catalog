const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of "<header" or class="header"
const searchStr = '<header';
let idx = 0;
while ((idx = html.indexOf(searchStr, idx)) !== -1) {
    console.log(`Found ${searchStr} at index:`, idx);
    console.log(html.substring(idx, idx + 1500));
    idx += searchStr.length;
}

const collIdx = html.indexOf('THE COLLECTION');
if (collIdx !== -1) {
    console.log("Found THE COLLECTION at:", collIdx);
    console.log(html.substring(collIdx - 200, collIdx + 800));
}
