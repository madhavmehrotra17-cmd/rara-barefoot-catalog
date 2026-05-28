const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

console.log('--- CSS LINES ---');
for (let i = 1250; i <= 1262; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}

console.log('--- HTML LINES ---');
for (let i = 1790; i <= 1805; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}
