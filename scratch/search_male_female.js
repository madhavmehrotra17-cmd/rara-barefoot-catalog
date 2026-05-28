const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const queries = ['male', 'female', 'men', 'women'];
queries.forEach(q => {
    let idx = 0;
    console.log(`--- Search for '${q}' ---`);
    while ((idx = content.toLowerCase().indexOf(q.toLowerCase(), idx)) !== -1) {
        const isStyle = content.substring(0, idx).lastIndexOf('<style>') > content.substring(0, idx).lastIndexOf('</style>');
        if (!isStyle) {
            console.log(`Found '${q}' at index: ${idx}`);
            console.log(content.substring(idx - 150, idx + 250));
            console.log('--------------------------------------------------');
        }
        idx += q.length;
    }
});
