const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all matches for "male final" or "female final" or "gender-banner"
let idx = 0;
let count = 0;
const term = 'male final';
while ((idx = html.indexOf(term, idx)) !== -1) {
    console.log(`Match ${count++} at index ${idx}`);
    console.log(html.substring(idx - 100, idx + 300));
    idx += term.length;
}
