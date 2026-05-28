const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let matchCount = 0;

console.log("--- Style Blocks containing custom header classes ---");
while ((match = regex.exec(content)) !== null) {
    const blockContent = match[1];
    if (blockContent.includes('logo-custom') || blockContent.includes('dropdown-custom-wrapper') || blockContent.includes('nav-center-custom')) {
        matchCount++;
        const startIdx = match.index;
        const endIdx = match.index + match[0].length;
        console.log(`[Block ${matchCount}] Index range: ${startIdx} to ${endIdx} (length: ${match[0].length})`);
        console.log(blockContent.substring(0, 300) + '\n... TRUNCATED ...\n' + blockContent.substring(blockContent.length - 200));
        console.log('==================================================');
    }
}
