const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const matches = [];
let index = 0;
while (true) {
    const found = html.indexOf('gender-banner', index);
    if (found === -1) break;
    matches.push(found);
    index = found + 1;
}

console.log("Found gender-banner at indices:", matches);
matches.slice(0, 5).forEach(idx => {
    console.log(html.substring(idx - 100, idx + 300));
    console.log("------------------------");
});
