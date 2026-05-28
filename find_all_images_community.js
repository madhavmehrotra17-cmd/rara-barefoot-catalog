const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\community.html';
const html = fs.readFileSync(filePath, 'utf8');

console.log('--- IMAGES & SOURCES IN community.html ---');
const imgRegex = /<img[^>]*src="([^"]*)"|<source[^>]*srcset="([^"]*)"/gi;
let match;
let count = 0;
while ((match = imgRegex.exec(html)) !== null && count < 30) {
    const src = match[1] || match[2];
    if (src && !src.includes('analytics') && !src.includes('shopify-cfh')) {
        console.log(`${count + 1}: ${src.substring(0, 150)}`);
        count++;
    }
}

console.log('\n--- IFRAMES OR VIDEOS IN community.html ---');
const mediaRegex = /<iframe[^>]*src="([^"]*)"|<video[^>]*>|video/gi;
while ((match = mediaRegex.exec(html)) !== null) {
    console.log(match[0]);
}
