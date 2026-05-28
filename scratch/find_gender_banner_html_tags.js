const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const regex = /gender-banners/gi;
let match;
while ((match = regex.exec(content)) !== null) {
    const idx = match.index;
    const isStyle = content.substring(0, idx).lastIndexOf('<style>') > content.substring(0, idx).lastIndexOf('</style>');
    if (!isStyle) {
        console.log(`Found 'gender-banners' in HTML at index: ${idx}`);
        console.log(content.substring(idx - 200, idx + 600));
        console.log('--------------------------------------------------');
    }
}
