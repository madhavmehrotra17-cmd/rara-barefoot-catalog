const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

console.log('--- CSS LINES ---');
for (let i = 1240; i <= 1254; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}

console.log('--- HTML LINES ---');
for (let i = 1555; i <= 1569; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}
