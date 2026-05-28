const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const query = 'SHOP MEN';
let idx = 0;
while (true) {
    idx = html.indexOf(query, idx);
    if (idx === -1) break;
    // Print 300 characters before and after to get a clear picture of the parent container
    console.log(`\n--- Match at index ${idx} ---`);
    console.log(html.substring(idx - 200, idx + 400));
    idx += query.length;
}
