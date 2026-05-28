const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const lines = content.split('\n');

for (let i = 2840; i < 2876; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
