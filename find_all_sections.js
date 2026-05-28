const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\community.html';
const html = fs.readFileSync(filePath, 'utf8');

console.log('--- ALL SECTIONS IN community.html ---');
const regex = /<section[^>]*>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(match[0]);
}

console.log('\n--- CUSTOM LIQUID OR INSTAGRAM BLOCKS ---');
const blockRegex = /<div[^>]*id="[^"]*insta[^"]*"|<div[^>]*class="[^"]*insta[^"]*"/gi;
while ((match = blockRegex.exec(html)) !== null) {
    console.log(match[0]);
}
