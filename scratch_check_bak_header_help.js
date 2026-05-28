const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'index.html.bak'), 'utf8');
const headerStart = content.indexOf('<x-header');
const headerEnd = content.indexOf('</x-header>', headerStart);
const headerHtml = content.substring(headerStart, headerEnd + '</x-header>'.length);

const lines = headerHtml.split('\n');
lines.forEach((line, idx) => {
    if (line.toLowerCase().includes('help') || line.toLowerCase().includes('support')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
