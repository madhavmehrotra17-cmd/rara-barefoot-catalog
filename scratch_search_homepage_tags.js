const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const index1 = html.indexOf('SHOP MEN');
const index2 = html.indexOf('SHOP WOMEN');

console.log("SHOP MEN index:", index1);
console.log("SHOP WOMEN index:", index2);

if (index1 !== -1) {
    console.log("Snippet near SHOP MEN:");
    console.log(html.substring(index1 - 300, index1 + 400));
}
if (index2 !== -1) {
    console.log("Snippet near SHOP WOMEN:");
    console.log(html.substring(index2 - 300, index2 + 400));
}
