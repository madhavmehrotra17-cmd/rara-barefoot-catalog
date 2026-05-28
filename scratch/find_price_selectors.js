const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, '..', 'collection.html'), 'utf8');

// Let's find occurrences of price numbers or tags
const priceRegex = /class="[^"]*price[^"]*"/gi;
const matches = new Set();
let match;
while ((match = priceRegex.exec(fileContent)) !== null) {
  matches.add(match[0]);
}

console.log('Price-related classes found:');
matches.forEach(m => console.log('  ', m));
