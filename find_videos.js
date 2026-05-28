const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = ['index.html', 'why-barefoot.html', 'barefoot-science.html', 'product.html'];
let output = '';

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const videoMatches = content.match(/<video[^>]*>|src="[^"]*\.mp4"|src="[^"]*\.webm"/gi);
        const sourceMatches = content.match(/<source[^>]*src="[^"]*"/gi);
        
        output += `=== Video elements in ${file} ===\n`;
        if (videoMatches) {
            videoMatches.forEach(m => output += m + '\n');
        }
        if (sourceMatches) {
            sourceMatches.forEach(m => output += m + '\n');
        }
        output += '\n';
    } else {
        output += `${file} does not exist\n\n`;
    }
});

fs.writeFileSync(path.join(dir, 'video_urls.txt'), output, 'utf8');
console.log('Done!');
