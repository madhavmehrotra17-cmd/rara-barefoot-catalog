const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Regex for exact <header> opening tags
const openRegex = /<header(?:\s|>)/gi;
const closeRegex = /<\/header>/gi;

const openMatches = content.match(openRegex) || [];
const closeMatches = content.match(closeRegex) || [];

console.log(`Exact <header> opening tags: ${openMatches.length}`);
console.log(`Exact </header> closing tags: ${closeMatches.length}`);

if (openMatches.length === closeMatches.length) {
    console.log("SUCCESS: Standard header tags are perfectly balanced!");
} else {
    console.log(`WARNING: Mismatch in standard header tags! Open: ${openMatches.length}, Close: ${closeMatches.length}`);
}
