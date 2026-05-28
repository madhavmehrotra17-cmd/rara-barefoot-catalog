const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    const html = fs.readFileSync(f, 'utf8');
    if (html.includes('data-title="Men"') || html.includes('data-title="Women"')) {
        console.log(`File ${f} STILL has Men or Women in header!`);
    } else {
        console.log(`File ${f} does not have it.`);
    }
});
