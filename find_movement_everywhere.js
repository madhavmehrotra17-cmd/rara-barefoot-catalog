const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const count = (content.match(/movement/gi) || []).length;
        if (count > 0) {
            console.log(`${file}: found "movement" ${count} times`);
            // Print some line previews
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
                if (line.toLowerCase().includes('movement') || line.toLowerCase().includes('join us')) {
                    console.log(`  Line ${idx + 1}: ${line.trim().substring(0, 120)}`);
                }
            });
        }
    }
});
