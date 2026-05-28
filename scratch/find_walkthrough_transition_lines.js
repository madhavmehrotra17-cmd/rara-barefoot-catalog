const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', '..', 'brain', '7e79a66a-32c9-440f-8de0-fa2866b0a68b', 'walkthrough.md');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const query = '# Walkthrough - Premium Boundary Gradient Transitions';
let foundIdx = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(query)) {
        foundIdx = i + 1;
        break;
    }
}

console.log(`Walkthrough starts at line: ${foundIdx}`);
for (let i = foundIdx; i <= foundIdx + 30; i++) {
    console.log(`${i}: ${lines[i-1]}`);
}
