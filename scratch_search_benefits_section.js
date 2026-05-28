const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const index = html.indexOf('BENEFITS OF BAREFOOT');
if (index !== -1) {
    console.log("Found BENEFITS OF BAREFOOT at index:", index);
    console.log(html.substring(index - 100, index + 2500));
} else {
    console.log("BENEFITS OF BAREFOOT NOT found in index.html");
}
