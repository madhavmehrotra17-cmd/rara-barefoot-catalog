const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\community.html';
if (!fs.existsSync(filePath)) {
    console.error('community.html not found');
    process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');

// Find occurrences of "THE BAREFOOT MOVEMENT"
console.log('Searching for "THE BAREFOOT MOVEMENT" inside community.html...');

const target = 'THE BAREFOOT MOVEMENT';
const idx = html.indexOf(target);
if (idx !== -1) {
    console.log(`Found it at character index ${idx}`);
    // Let's grab some context around it
    const start = Math.max(0, idx - 1000);
    const end = Math.min(html.length, idx + 4000);
    const chunk = html.substring(start, end);
    fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\community_section.txt', chunk, 'utf8');
    console.log('Written context to community_section.txt');
} else {
    console.log('Not found!');
}
