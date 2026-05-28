const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const index1 = html.indexOf('blue.png');
const index2 = html.indexOf('yellow.png');
console.log("blue.png index:", index1);
console.log("yellow.png index:", index2);

if (index1 !== -1) {
    console.log("Snippet near blue.png:");
    console.log(html.substring(index1 - 300, index1 + 1000));
}
if (index2 !== -1) {
    console.log("Snippet near yellow.png:");
    console.log(html.substring(index2 - 300, index2 + 1000));
}
