const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Print from 153600 to 158000
console.log(html.substring(153600, 158000));
