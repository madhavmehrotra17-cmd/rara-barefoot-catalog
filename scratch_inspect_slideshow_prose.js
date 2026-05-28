const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const query = 'SHOP MEN';
const idx = html.indexOf(query);
if (idx !== -1) {
    console.log("Context before SHOP MEN:");
    console.log(html.substring(idx - 600, idx + 200));
}
