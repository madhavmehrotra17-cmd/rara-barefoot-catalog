const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Find all occurrences of logo-custom and check if they are in style tags
const regex = /logo-custom/g;
let match;
console.log("--- Occurrence of logo-custom in index.html ---");
while ((match = regex.exec(content)) !== null) {
    const idx = match.index;
    const isStyle = content.substring(0, idx).lastIndexOf('<style>') > content.substring(0, idx).lastIndexOf('</style>');
    console.log(`Occurrence at index ${idx}: is inside <style> tag? ${isStyle}`);
}
