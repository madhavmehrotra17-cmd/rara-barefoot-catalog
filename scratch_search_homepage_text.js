const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const index1 = html.indexOf('Made for Miles');
const index2 = html.indexOf('Built for Your Best');

console.log("Made for Miles index:", index1);
console.log("Built for Your Best index:", index2);

if (index1 !== -1) {
    console.log("Snippet near index1:");
    console.log(html.substring(index1 - 300, index1 + 800));
}
if (index2 !== -1) {
    console.log("Snippet near index2:");
    console.log(html.substring(index2 - 300, index2 + 800));
}
