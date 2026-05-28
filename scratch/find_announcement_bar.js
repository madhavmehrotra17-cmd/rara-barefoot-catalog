const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Find announcement-bar
const searchStr = 'announcement-bar';
let idx = 0;
while ((idx = content.indexOf(searchStr, idx)) !== -1) {
    console.log(`Found '${searchStr}' at index: ${idx}`);
    console.log(content.substring(idx - 100, idx + 400));
    console.log('--------------------------------------------------');
    idx += searchStr.length;
}
