const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html', 'utf8');
const lines = content.split('\n');

console.log('Searching for Xanadu_black_new references:');
lines.forEach((line, idx) => {
    if (line.includes('Xanadu_black_new') || line.includes('below-catalogue') || line.includes('below_catalogue') || line.includes('benefits-of-barefoot') || line.includes('BALANCED') || line.includes('WIDE') || line.includes('FLEXIBLE')) {
        console.log(`${idx + 1}: ${line.trim()}`);
    }
});
