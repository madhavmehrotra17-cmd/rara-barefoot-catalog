const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of "featured-collections-carousel" or sections with the product cards
let idx = 0;
let count = 0;
const term = 'featured-collections';
while ((idx = html.indexOf(term, idx)) !== -1) {
    console.log(`Match ${count++} at index ${idx}`);
    console.log(html.substring(idx - 100, idx + 500));
    idx += term.length;
}
