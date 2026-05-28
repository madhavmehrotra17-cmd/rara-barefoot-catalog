const fs = require('fs');
const html = fs.readFileSync('collection.html', 'utf8');

// Print first 5 product cards to see their HTML structure
let idx = 0;
for (let i = 0; i < 5; i++) {
    idx = html.indexOf('<product-card', idx);
    if (idx === -1) break;
    console.log(`--- CARD ${i} ---`);
    console.log(html.substring(idx, html.indexOf('</product-card>', idx) + 15));
    idx += 100;
}
