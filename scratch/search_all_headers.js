const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for x-header
    let startIdx = content.indexOf('<x-header');
    let endIdx = -1;
    if (startIdx !== -1) {
        endIdx = content.indexOf('</x-header>', startIdx) + '</x-header>'.length;
        console.log(`[x-header] File: ${file} (length: ${endIdx - startIdx})`);
        console.log(content.substring(startIdx, startIdx + 300));
        console.log('--------------------------------------------------');
        return;
    }
    
    // Check for standard header
    startIdx = content.indexOf('<header');
    if (startIdx !== -1) {
        endIdx = content.indexOf('</header>', startIdx) + '</header>'.length;
        console.log(`[standard header] File: ${file} (length: ${endIdx - startIdx})`);
        console.log(content.substring(startIdx, startIdx + 300));
        console.log('--------------------------------------------------');
    }
});
