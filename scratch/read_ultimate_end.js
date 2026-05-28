const fs = require('fs');

const indexPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html';

if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    const styleMatch = content.match(/<style id="rara-ultimate-style">([\s\S]*?)<\/style>/i);
    if (styleMatch) {
        const text = styleMatch[1];
        console.log("TOTAL LENGTH OF STYLE TAG: " + text.length);
        const lines = text.split('\n');
        console.log("LAST 60 LINES OF STYLE TAG:");
        console.log(lines.slice(lines.length - 60).join('\n'));
    }
}
