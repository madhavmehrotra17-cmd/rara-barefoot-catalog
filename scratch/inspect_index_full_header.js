const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const searchStr = '<header id="shopify-section-sections--19195979432110__header"';
const startIdx = content.indexOf(searchStr);
const endIdx = content.indexOf('</x-header>', startIdx) + '</x-header>'.length;

if (startIdx !== -1 && content.indexOf('</x-header>', startIdx) !== -1) {
    console.log(`Start index: ${startIdx}, End index: ${endIdx}`);
    console.log('--- OUTER HEADER BLOCK ---');
    console.log(content.substring(startIdx, startIdx + 800));
    console.log('... TRUNCATED ...');
    console.log(content.substring(endIdx - 500, endIdx));
} else {
    console.log("Could not find the shopify-section header tag in index.html");
}
