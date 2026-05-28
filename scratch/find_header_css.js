const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'catalog.html'), 'utf8');

const query = 'header {';
let idx = 0;
while ((idx = content.indexOf(query, idx)) !== -1) {
    console.log(`Found '${query}' at index: ${idx}`);
    console.log(content.substring(idx, idx + 400));
    console.log('--------------------------------------------------');
    idx += query.length;
}
