const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Madhav Mehrotra\\.gemini';

function searchDir(currentDir) {
    let items;
    try {
        items = fs.readdirSync(currentDir);
    } catch(e) {
        return;
    }
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
            if (item.toLowerCase().includes('xanadu') && item.toLowerCase().includes('black') && item.toLowerCase().includes('new')) {
                console.log(`Found: ${fullPath} (${stat.size} bytes)`);
            }
        }
    });
}

searchDir(baseDir);
console.log("Widest search finished.");
