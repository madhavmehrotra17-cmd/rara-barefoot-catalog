const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html';
if (!fs.existsSync(filePath)) {
    console.error('index.html not found');
    process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');

console.log('Searching for "BAREFOOT MOVEMENT" inside index.html...');
const idx = html.indexOf('THE BAREFOOT MOVEMENT');
if (idx !== -1) {
    console.log(`Found it in index.html at char ${idx}`);
    const start = Math.max(0, idx - 1000);
    const end = Math.min(html.length, idx + 4000);
    const chunk = html.substring(start, end);
    fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\community_index.txt', chunk, 'utf8');
    console.log('Written context to community_index.txt');
} else {
    console.log('Not found in index.html');
}
