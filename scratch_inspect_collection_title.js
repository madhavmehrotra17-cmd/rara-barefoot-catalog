const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of "THE COLLECTION" in index.html and print their surrounding tags and content
const term = 'THE COLLECTION';
let idx = 0;
let matchCount = 0;
while ((idx = html.indexOf(term, idx)) !== -1) {
    console.log(`\n=== Match ${matchCount++} at index ${idx} ===`);
    console.log(html.substring(idx - 300, idx + 1000));
    idx += term.length;
}
