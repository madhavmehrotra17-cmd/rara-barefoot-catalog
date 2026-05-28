const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Find all occurrences of "shop men" case-insensitively
const regex = /shop\s*men/gi;
let match;
console.log("--- Occurrences of SHOP MEN (Case Insensitive) ---");
while ((match = regex.exec(content)) !== null) {
    const idx = match.index;
    console.log(`Found 'SHOP MEN' match at index: ${idx}`);
    console.log(content.substring(idx - 200, idx + 400));
    console.log('--------------------------------------------------');
}
