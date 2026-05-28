const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const query = 'scroll-3-video-container';
let foundIdx = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(query) && lines[i].includes('<div')) {
        foundIdx = i + 1;
        break;
    }
}

console.log(`HTML Video Container starts at line: ${foundIdx}`);
for (let i = foundIdx - 2; i <= foundIdx + 10; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}
