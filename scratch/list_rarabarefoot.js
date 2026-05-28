const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\OneDrive\\ドキュメント\\RARAbarefoot';
try {
    const files = fs.readdirSync(dir);
    console.log(`Files in ${dir}:`);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            console.log(`[DIR] ${file}`);
        } else {
            console.log(`[FILE] ${file} (${stat.size} bytes)`);
        }
    });
} catch (e) {
    console.error('Error reading directory:', e);
}
