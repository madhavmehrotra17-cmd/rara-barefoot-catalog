const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const query = 'gender=';
let idx = 0;
console.log("--- Search for 'gender=' in index.html ---");
while ((idx = content.indexOf(query, idx)) !== -1) {
    console.log(`Found '${query}' at index: ${idx}`);
    console.log(content.substring(idx - 200, idx + 400));
    console.log('--------------------------------------------------');
    idx += query.length;
}
