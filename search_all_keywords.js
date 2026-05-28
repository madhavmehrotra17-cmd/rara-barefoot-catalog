const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const keywords = ['flexible_sole', 'wide_toe_box', 'zero_drop', 'factory', 'silent', 'gif-1', 'gif-2', 'gif-3', 'gif-4', 'gif-5'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    keywords.forEach(kw => {
        if (content.toLowerCase().includes(kw.toLowerCase())) {
            console.log(`File: ${file} contains "${kw}"`);
            const idx = content.toLowerCase().indexOf(kw.toLowerCase());
            console.log(`Snippet around "${kw}":\n${content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 300))}\n`);
        }
    });
});
