const fs = require('fs');
const path = require('path');

function searchDir(currentDir) {
    console.log(`Searching directory: ${currentDir}`);
    const items = fs.readdirSync(currentDir);
    items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (item !== 'node_modules' && !item.startsWith('.')) {
                searchDir(fullPath);
            }
        } else {
            if (item.toLowerCase().includes('xanadu') || item.toLowerCase().includes('black')) {
                console.log(`Found: ${fullPath} (${stat.size} bytes)`);
            }
        }
    });
}

// Search rara-true-clone directory
searchDir(path.join(__dirname));

// Also search parent scratch directory
const parentDir = path.dirname(__dirname);
console.log(`\nParent Directory: ${parentDir}`);
fs.readdirSync(parentDir).forEach(item => {
    const fullPath = path.join(parentDir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
        console.log(`Parent contains dir: ${item}`);
    } else {
        if (item.toLowerCase().includes('xanadu') || item.toLowerCase().includes('black')) {
            console.log(`Parent contains file: ${item}`);
        }
    }
});
