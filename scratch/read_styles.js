const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html', 'utf8');
const lines = content.split('\n');

for (let idx = 2961; idx <= 3200; idx++) {
    console.log(`${idx}: ${lines[idx - 1]}`);
}
