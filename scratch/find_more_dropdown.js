const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('MORE')) {
        console.log(`Found 'MORE' in file: ${file}`);
        // Let's print occurrences around MORE
        let idx = 0;
        while ((idx = content.indexOf('MORE', idx)) !== -1) {
            console.log(content.substring(idx - 100, idx + 200));
            idx += 4;
        }
        console.log('==================================================');
    }
});
