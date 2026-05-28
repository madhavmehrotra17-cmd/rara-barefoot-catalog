const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    const html = fs.readFileSync(f, 'utf8');
    let idx = 0;
    let count = 0;
    while ((idx = html.indexOf('featured-collections', idx)) !== -1) {
        count++;
        idx += 20;
    }
    if (count > 0) {
        console.log(`File ${f} has featured-collections ${count} times.`);
    }
});
