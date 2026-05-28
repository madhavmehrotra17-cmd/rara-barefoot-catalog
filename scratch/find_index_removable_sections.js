const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// 1. Search for THE COLLECTION
const collQuery = 'THE COLLECTION';
let idx = 0;
console.log("--- Occurrences of THE COLLECTION ---");
while ((idx = content.indexOf(collQuery, idx)) !== -1) {
    console.log(`Found 'THE COLLECTION' at index: ${idx}`);
    // Check if it's inside a heading tag
    console.log(content.substring(idx - 100, idx + 200));
    console.log('--------------------------------------------------');
    idx += collQuery.length;
}

// 2. Search for SHOP MEN or SHOP WOMEN
const shopMenQuery = 'SHOP MEN';
idx = 0;
console.log("--- Occurrences of SHOP MEN ---");
while ((idx = content.indexOf(shopMenQuery, idx)) !== -1) {
    console.log(`Found 'SHOP MEN' at index: ${idx}`);
    console.log(content.substring(idx - 100, idx + 200));
    console.log('--------------------------------------------------');
    idx += shopMenQuery.length;
}
