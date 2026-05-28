const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'collection.html');
const content = fs.readFileSync(file, 'utf8');

const term = 'THE COLLECTION';
let idx = 0;
while ((idx = content.indexOf(term, idx)) !== -1) {
    console.log(`\n=== Match at index ${idx} ===`);
    console.log(content.substring(idx - 150, idx + 1000));
    idx += term.length;
}
