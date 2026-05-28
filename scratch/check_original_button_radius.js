const fs = require('fs');

const indexPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html';

if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    const lines = content.split('\n');
    
    // Find all occurrences of border-radius near button selectors
    lines.forEach((line, idx) => {
        if (line.includes('border-radius') && (line.includes('button') || line.includes('btn') || line.includes('gender-banner'))) {
            console.log(`${idx + 1}: ${line.trim()}`);
        }
    });
}
