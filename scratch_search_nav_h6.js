const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const target = '.h6';
let index = 0;
while (true) {
    const found = html.indexOf(target, index);
    if (found === -1) break;
    console.log(`Found ${target} at index:`, found);
    console.log(html.substring(found - 200, found + 200));
    console.log("------------------------");
    index = found + 1;
}
