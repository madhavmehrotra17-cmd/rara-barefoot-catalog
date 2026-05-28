const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = ['about.html', 'why-barefoot.html'];

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const start = content.indexOf('<slideshow-carousel');
        const end = content.indexOf('</slideshow-carousel>');
        if (start !== -1 && end !== -1) {
            console.log(`=== ${file} slideshow ===`);
            const sub = content.substring(start, end + '</slideshow-carousel>'.length);
            const buttonGroupIndex = sub.indexOf('button-group');
            if (buttonGroupIndex !== -1) {
                console.log(sub.substring(buttonGroupIndex - 100, buttonGroupIndex + 400));
            } else {
                console.log("No button-group found");
            }
        }
    }
});
