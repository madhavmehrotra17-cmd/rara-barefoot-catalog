const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all `<section` occurrences and print their IDs
let idx = 0;
let matchCount = 0;
while ((idx = html.indexOf('<section', idx)) !== -1) {
    const end = html.indexOf('>', idx);
    const tag = html.substring(idx, end + 1);
    console.log(`Section ${matchCount++} at ${idx}: ${tag}`);
    idx += 8;
}
