const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const xheaderIdx = html.indexOf('<x-header');
if (xheaderIdx !== -1) {
    console.log("Found <x-header at index:", xheaderIdx);
    console.log(html.substring(xheaderIdx - 200, xheaderIdx + 1500));
} else {
    console.log("Not found <x-header");
}
