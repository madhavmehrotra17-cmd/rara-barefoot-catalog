const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

console.log('--- FOOTER CSS LINES ---');
for (let i = 1276; i <= 1290; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}
