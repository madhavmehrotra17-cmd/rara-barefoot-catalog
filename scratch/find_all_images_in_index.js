const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Find all image references in index.html
const regex = /["']([^"']+\.(?:png|jpg|jpeg|gif|svg)[^"']*)["']/gi;
let match;
let count = 0;
console.log("--- Images in index.html ---");
while ((match = regex.exec(content)) !== null) {
    const url = match[1];
    if (url.includes('final') || url.includes('banner') || url.includes('model') || url.includes('men') || url.includes('women')) {
        count++;
        console.log(`[Image ${count}] Index: ${match.index}`);
        console.log(`  URL: ${url}`);
        console.log('--------------------------------------------------');
    }
}
