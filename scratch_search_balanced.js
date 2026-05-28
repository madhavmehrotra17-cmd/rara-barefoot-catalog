const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const index = html.indexOf('BALANCED');
if (index !== -1) {
    console.log("Found BALANCED at index:", index);
    console.log(html.substring(index - 200, index + 1200));
} else {
    console.log("BALANCED not found in index.html");
}
