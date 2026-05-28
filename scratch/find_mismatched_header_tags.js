const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Find all occurrences of '<header' (with boundaries) and '</header>'
const regex = /<header(?:\s|>)|<\/header>/gi;
let match;
let count = 0;

console.log("--- Occurrence of header tags in index.html ---");
while ((match = regex.exec(content)) !== null) {
    count++;
    const idx = match.index;
    console.log(`[Tag ${count}] Type: ${match[0]}, Index: ${idx}`);
    console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
    console.log('--------------------------------------------------');
}
