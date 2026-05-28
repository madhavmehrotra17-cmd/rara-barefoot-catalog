const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('header__primary-nav-item')) {
        console.log(`Checking primary nav items in: ${file}`);
        const regex = /<li class="header__primary-nav-item"[^>]*>([\s\S]*?)<\/li>/gi;
        let match;
        while ((match = regex.exec(content)) !== null) {
            if (match[1].toLowerCase().includes('help')) {
                console.log(`  Found HELP primary nav item: ${match[0].trim()}`);
            }
        }
    }
});
