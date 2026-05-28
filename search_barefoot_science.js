const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = ['why-barefoot.html', 'barefoot-science.html', 'index.html'];

files.forEach(filename => {
    const filePath = path.join(dir, filename);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`\n=================== FILE: ${filename} ===================`);
        
        // Search for keywords
        const keywords = ['flexible_sole', 'wide_toe_box', 'zero_drop', '57.4%', 'barefoot-science', 'science'];
        keywords.forEach(keyword => {
            const index = content.indexOf(keyword);
            if (index !== -1) {
                console.log(`Found keyword "${keyword}" at index ${index}.`);
                // Print a snippet around it
                const start = Math.max(0, index - 100);
                const end = Math.min(content.length, index + 300);
                console.log(`Snippet:\n${content.substring(start, end)}\n`);
            }
        });
    }
});
