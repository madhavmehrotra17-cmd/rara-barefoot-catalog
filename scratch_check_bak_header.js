const fs = require('fs');
const path = require('path');

function getHeader(filename) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`${filename} not found!`);
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for <x-header ...> ... </x-header>
    const headerStart = content.indexOf('<x-header');
    if (headerStart === -1) {
        console.log(`${filename}: No <x-header> element found.`);
        return null;
    }
    
    // Find the matching </x-header>
    const headerEnd = content.indexOf('</x-header>', headerStart);
    if (headerEnd === -1) {
        console.log(`${filename}: No closing </x-header> found.`);
        return null;
    }
    
    const headerHtml = content.substring(headerStart, headerEnd + '</x-header>'.length);
    console.log(`${filename} x-header length: ${headerHtml.length} characters.`);
    return headerHtml;
}

const bakHeader = getHeader('index.html.bak');
if (bakHeader) {
    fs.writeFileSync(path.join(__dirname, 'bak_header.html'), bakHeader, 'utf8');
    console.log('Saved backup header to bak_header.html');
}
