const fs = require('fs');
const path = require('path');

const parentDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch';
console.log("Readdir of parentDir:", parentDir);
try {
    const items = fs.readdirSync(parentDir);
    items.forEach(item => {
        const fullPath = path.join(parentDir, item);
        const stat = fs.statSync(fullPath);
        console.log(`- ${item} (${stat.isDirectory() ? 'DIR' : 'FILE'})`);
        if (stat.isDirectory()) {
            // list contents of this dir up to 1 level
            try {
                const subItems = fs.readdirSync(fullPath);
                subItems.forEach(sub => {
                    if (sub.toLowerCase().includes('black') || sub.toLowerCase().includes('xanadu') || sub.toLowerCase().includes('new')) {
                        console.log(`  * ${sub}`);
                    }
                });
            } catch(e) {}
        }
    });
} catch(e) {
    console.error(e);
}
