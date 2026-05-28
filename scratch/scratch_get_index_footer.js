const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const indexPath = path.join(dir, 'index.html');

if (fs.existsSync(indexPath)) {
    const lines = fs.readFileSync(indexPath, 'utf8').split('\n');
    console.log(`index.html has ${lines.length} lines`);
    
    // Grab the last 300 lines
    const lastLines = lines.slice(-300).join('\n');
    fs.writeFileSync(path.join(dir, 'scratch', 'index_footer_extract.html'), lastLines, 'utf8');
    console.log('Saved last 300 lines of index.html to index_footer_extract.html');
} else {
    console.log('index.html not found');
}
