const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/<style id="rara-ultimate-style">([\s\S]*?)<\/style>/i);
    if (match) {
        console.log(`=== ${file} ===`);
        // Find the index of "Premium Royal Blue Brand Accents" if present
        const index = match[1].indexOf('Premium Royal Blue Brand Accents');
        if (index !== -1) {
            console.log(match[1].substring(index - 5, index + 350) + '...');
        } else {
            console.log('Premium Royal Blue Brand Accents not found in style block');
        }
    } else {
        console.log(`rara-ultimate-style style block not found in ${file}`);
    }
});
