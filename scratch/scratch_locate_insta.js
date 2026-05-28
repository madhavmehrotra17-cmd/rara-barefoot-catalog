const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
let results = [];

function searchDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (item !== 'node_modules' && item !== '.git') {
                searchDir(fullPath);
            }
        } else {
            if (item.toLowerCase().includes('insta')) {
                results.push({
                    name: item,
                    relPath: path.relative(baseDir, fullPath),
                    size: stat.size
                });
            }
        }
    }
}

searchDir(baseDir);

let output = 'LOCATE INSTA RESULTS:\n\n';
results.forEach(res => {
    output += `- File: ${res.name}\n  Relative Path: ${res.relPath}\n  Size: ${res.size} bytes\n\n`;
});

fs.writeFileSync(path.join(baseDir, 'scratch', 'insta_locations.txt'), output, 'utf8');
console.log('Saved to scratch/insta_locations.txt');
