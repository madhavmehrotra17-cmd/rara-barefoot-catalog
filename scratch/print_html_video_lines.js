const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

console.log('--- HTML VIDEO LINES ---');
for (let i = 1740; i <= 1756; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}
