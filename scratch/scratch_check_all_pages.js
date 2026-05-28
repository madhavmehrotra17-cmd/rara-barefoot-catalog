const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(dir);

console.log('Scanning HTML files in workspace...');

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const hasFooter = content.includes('premium-footer');
        const hasInsta = content.includes('instagram-feed-section') || content.includes('insta-1.png');
        console.log(`- ${file}: Has Premium Footer = ${hasFooter}, Has Insta Feed = ${hasInsta}`);
    }
});
