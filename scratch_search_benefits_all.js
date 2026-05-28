const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('below_catalogue_1.1')) {
        console.log(`File ${file} contains below_catalogue_1.1!`);
    }
});
