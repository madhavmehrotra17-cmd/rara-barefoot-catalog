const fs = require('fs');
const path = require('path');

const parentDir = path.dirname(__dirname); // C:\Users\Madhav Mehrotra\.gemini\antigravity\scratch

function searchDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        let stat;
        try {
            stat = fs.statSync(fullPath);
        } catch(e) {
            return;
        }
        if (stat.isDirectory()) {
            if (item !== 'node_modules' && !item.startsWith('.')) {
                searchDir(fullPath);
            }
        } else {
            if (item.toLowerCase().includes('xanadu') || item.toLowerCase().includes('black') || item.toLowerCase().includes('new')) {
                // If it contains both 'black' and 'new' or 'xanadu'
                if (item.toLowerCase().includes('black') && (item.toLowerCase().includes('new') || item.toLowerCase().includes('xanadu'))) {
                    console.log(`Found file: ${fullPath} (${stat.size} bytes)`);
                }
            }
        }
    });
}

searchDir(parentDir);
console.log("Search finished.");
