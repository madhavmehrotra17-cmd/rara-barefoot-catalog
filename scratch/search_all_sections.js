const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Find all section tags
const regex = /<section\b[^>]*>/gi;
let match;
let count = 0;
console.log("--- All <section> tags in index.html ---");
while ((match = regex.exec(content)) !== null) {
    count++;
    console.log(`[Section ${count}] Index: ${match.index}`);
    console.log(match[0]);
    console.log('--------------------------------------------------');
}
