const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'product.html'), 'utf8');
const lines = content.split('\n');

let headerStartLine = -1;
let headerEndLine = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<x-header')) {
        headerStartLine = i + 1;
    }
    if (lines[i].includes('</x-header>') && headerStartLine !== -1 && headerEndLine === -1) {
        headerEndLine = i + 1;
        break;
    }
}

console.log(`x-header in product.html starts at line ${headerStartLine} and ends at line ${headerEndLine}`);
console.log('--- FIRST 50 LINES ---');
for (let i = headerStartLine - 1; i < Math.min(headerEndLine, headerStartLine + 50); i++) {
    console.log(`${i + 1}: ${lines[i]}`);
}
