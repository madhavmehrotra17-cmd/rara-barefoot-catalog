const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Let's find any text like "Shop Men", "Shop Women", "Men", "Women" that is outside <style> blocks
const queries = ['Shop Men', 'Shop Women', 'Men', 'Women', 'SHOP MEN', 'SHOP WOMEN', 'COLLECTION'];
queries.forEach(q => {
    let idx = 0;
    console.log(`--- Occurrences of '${q}' ---`);
    while ((idx = content.indexOf(q, idx)) !== -1) {
        const isStyle = content.substring(0, idx).lastIndexOf('<style>') > content.substring(0, idx).lastIndexOf('</style>');
        if (!isStyle) {
            console.log(`Found '${q}' in HTML at index: ${idx}`);
            console.log(content.substring(idx - 150, idx + 250));
            console.log('--------------------------------------------------');
        }
        idx += q.length;
    }
});
