const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\community.html';
if (!fs.existsSync(filePath)) {
    console.error('community.html not found');
    process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');

// Find all image sources or custom classes in the file
console.log('Scanning community.html for image grids or interesting elements...');

const matches = [];
const regex = /<section[^>]*>[\s\S]*?<\/section>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    const sec = match[0];
    if (sec.includes('grid') || sec.includes('instagram') || sec.includes('community') || sec.includes('HkEDr0jVekaZO') || sec.includes('movement')) {
        matches.push({
            id: sec.match(/id="([^"]*)"|id='([^']*)'/)?.[1] || 'no-id',
            classes: sec.match(/class="([^"]*)"|class='([^']*)'/)?.[1] || 'no-class',
            length: sec.length,
            preview: sec.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').substring(0, 300)
        });
    }
}

console.log('Matches:');
console.log(JSON.stringify(matches, null, 2));
