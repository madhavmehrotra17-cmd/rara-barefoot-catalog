const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const navIndex = html.indexOf('WHY BAREFOOT?');
if (navIndex !== -1) {
    console.log("Found WHY BAREFOOT? at index:", navIndex);
    console.log(html.substring(navIndex - 400, navIndex + 400));
} else {
    console.log("WHY BAREFOOT? not found");
}
