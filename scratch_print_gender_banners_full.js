const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const startIdx = html.indexOf('male final');
if (startIdx !== -1) {
    console.log(html.substring(startIdx - 200, startIdx + 1200));
}
