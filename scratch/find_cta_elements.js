const fs = require('fs');

const indexPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html';

if (fs.existsSync(indexPath)) {
    const lines = fs.readFileSync(indexPath, 'utf8').split('\n');
    const buttonClasses = new Set();
    const buttonLines = [];
    
    lines.forEach((line, idx) => {
        if (line.includes('class=') && (line.includes('button') || line.includes('btn') || line.includes('cta'))) {
            buttonLines.push(`${idx + 1}: ${line.trim()}`);
            
            // Extract classes
            const match = line.match(/class=["']([^"']+)["']/);
            if (match) {
                match[1].split(' ').forEach(cls => {
                    if (cls.includes('button') || cls.includes('btn') || cls.includes('cta')) {
                        buttonClasses.add(cls);
                    }
                });
            }
        }
    });
    
    console.log("=== BUTTON CLASSES FOUND ===");
    console.log(Array.from(buttonClasses));
    console.log("\n=== EXAMPLE MARKUP LINES ===");
    console.log(buttonLines.slice(0, 30).join('\n'));
}
