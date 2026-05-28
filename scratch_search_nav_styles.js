const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Find any occurrence of Anton or font-family in the html
const antonMatches = [];
let index = 0;
while (true) {
    const found = html.indexOf('Anton', index);
    if (found === -1) break;
    antonMatches.push(found);
    index = found + 1;
}

console.log("Anton found at indices:", antonMatches);
antonMatches.forEach((idx) => {
    console.log("Snippet around Anton:", html.substring(idx - 100, idx + 100));
});

const fontMatches = [];
index = 0;
while (true) {
    const found = html.indexOf('font-family', index);
    if (found === -1) break;
    fontMatches.push(found);
    index = found + 1;
}
console.log("\nfont-family occurrences count:", fontMatches.length);
// print first 5
fontMatches.slice(0, 5).forEach((idx) => {
    console.log("Snippet:", html.substring(idx - 50, idx + 100));
});
