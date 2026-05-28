const fs = require('fs');

const indexPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html';

if (fs.existsSync(indexPath)) {
    const lines = fs.readFileSync(indexPath, 'utf8').split('\n');
    const buttonClasses = new Set();
    
    lines.forEach((line, idx) => {
        if (line.includes('class=')) {
            const matches = line.matchAll(/class=["']([^"']+)["']/g);
            for (const match of matches) {
                match[1].split(/\s+/).forEach(cls => {
                    if (cls.includes('button') || cls.includes('btn') || cls.includes('cta') || cls.includes('linklist-button')) {
                        buttonClasses.add(cls);
                    }
                });
            }
        }
    });
    
    console.log("=== ALL BUTTON/CTA CLASSES FOUND ===");
    console.log(Array.from(buttonClasses).sort());
}
