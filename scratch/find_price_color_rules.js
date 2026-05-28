const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Let's search for occurrences of sale-price in CSS style blocks or elements
const regex = /[^}]*sale-price[^}]*\{[^}]*\}/gi;
const matches = content.match(regex);
console.log('Matches for sale-price styling:');
if (matches) {
  matches.forEach(m => console.log(m.trim()));
} else {
  console.log('No direct matches found');
}
