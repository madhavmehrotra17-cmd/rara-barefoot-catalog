const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const cssTarget = '.scroll-4-btn {';
const htmlTarget = 'class="scroll-4-media-container"';

let cssStart = -1;
let cssEnd = -1;
let htmlStart = -1;
let htmlEnd = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(cssTarget)) {
        cssStart = i + 1; // 1-indexed
    }
    if (cssStart !== -1 && lines[i].includes('</style>') && cssEnd === -1) {
        cssEnd = i + 1;
    }
    if (lines[i].includes(htmlTarget)) {
        htmlStart = i + 1;
    }
    if (htmlStart !== -1 && lines[i].includes('<!-- JavaScript Controllers') && htmlEnd === -1) {
        htmlEnd = i + 1;
    }
}

console.log(`CSS lines: Start=${cssStart}, End=${cssEnd}`);
console.log(`HTML lines: Start=${htmlStart}, End=${htmlEnd}`);
