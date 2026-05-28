const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('slideshow-carousel')) {
        console.log(`[FOUND] slideshow-carousel in ${file}`);
    }
});
