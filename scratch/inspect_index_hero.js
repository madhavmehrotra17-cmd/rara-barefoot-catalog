const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const bodyIndex = html.indexOf('<body');
if (bodyIndex !== -1) {
    const lines = html.substring(bodyIndex, bodyIndex + 25000).split('\n');
    console.log(lines.slice(0, 150).join('\n'));
} else {
    console.log("No <body> tag found");
}
