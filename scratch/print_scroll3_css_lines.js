const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

console.log('--- SCROLL 3 CSS LINES ---');
for (let i = 950; i <= 1025; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}
