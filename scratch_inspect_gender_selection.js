const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'collection.html'), 'utf8');

const regex = /gender-selection[\s\S]*?<\/div>\s*<\/div>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(match[0]);
    console.log("------------------------");
}
