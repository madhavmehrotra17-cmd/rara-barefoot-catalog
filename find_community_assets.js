const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(dir);
let output = '';

files.forEach(file => {
    if (file.endsWith('.html')) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        // Let's find any URLs containing /files/ or shop/files or shopifycdn
        const matches = content.match(/https?:\/\/cdn\.shopify\.com\/s\/files\/[^\s"'`\\>]*\.(mp4|webp|png|jpg|gif|jpeg)/gi) || [];
        const matches2 = content.match(/https?:\/\/www\.rarabarefoot\.in\/cdn\/shop\/files\/[^\s"'`\\>]*\.(mp4|webp|png|jpg|gif|jpeg)/gi) || [];
        
        const allMatches = Array.from(new Set([...matches, ...matches2]));
        if (allMatches.length > 0) {
            output += `=== Assets in ${file} ===\n`;
            allMatches.forEach(m => output += m + '\n');
            output += '\n';
        }
    }
});

fs.writeFileSync(path.join(dir, 'community_assets.txt'), output, 'utf8');
console.log('Done!');
