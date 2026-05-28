const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const queries = ['male final', 'female final', 'final.png', 'final'];
queries.forEach(q => {
    let idx = 0;
    while ((idx = content.indexOf(q, idx)) !== -1) {
        console.log(`Found '${q}' at index: ${idx}`);
        console.log(content.substring(idx - 100, idx + 400));
        console.log('--------------------------------------------------');
        idx += q.length;
    }
});
