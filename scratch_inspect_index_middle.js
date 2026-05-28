const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const targetIdx = 155500;
console.log(html.substring(targetIdx, targetIdx + 2000));
