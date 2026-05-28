const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

console.log("--- Content around 305620 ---");
console.log(content.substring(305400, 306200));
