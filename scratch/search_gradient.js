const fs = require('fs');
const indexHtml = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html', 'utf8');

let out = '';
const lines = indexHtml.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('linear-gradient') || line.includes('background: linear-gradient') || line.includes('background-image: linear-gradient')) {
        out += `${idx + 1}: ${line.trim()}\n`;
    }
});

fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\scratch\\search_gradient_output.txt', out, 'utf8');
console.log('Done!');
