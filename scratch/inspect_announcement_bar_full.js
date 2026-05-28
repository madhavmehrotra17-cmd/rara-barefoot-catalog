const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const searchStr = 'id="shopify-section-sections--19195979432110__announcement-bar"';
const idx = content.indexOf(searchStr);

if (idx !== -1) {
    const startTagIdx = content.substring(0, idx).lastIndexOf('<aside');
    const endTagIdx = content.indexOf('</aside>', idx) + '</aside>'.length;
    console.log(`Announcement bar start index: ${startTagIdx}, end index: ${endTagIdx}`);
    console.log('--- ANNOUNCEMENT BAR BLOCK ---');
    console.log(content.substring(startTagIdx, endTagIdx));
} else {
    console.log("Could not find announcement bar in index.html");
}
