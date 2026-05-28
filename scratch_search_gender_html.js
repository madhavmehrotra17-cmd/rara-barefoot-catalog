const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'collection.html'), 'utf8');

// Find the HTML block, not the style block
const matches = [];
let index = 0;
while (true) {
    const found = html.indexOf('class="gender-selection-container"', index);
    if (found === -1) break;
    matches.push(found);
    index = found + 1;
}

console.log("Found occurrences at indices:", matches);
matches.forEach((idx, i) => {
    console.log(`\nOccurrence ${i + 1}:`);
    console.log(html.substring(idx - 100, idx + 1500));
});
