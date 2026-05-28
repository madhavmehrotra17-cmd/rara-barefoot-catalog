const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const searchStr = '<header id="shopify-section-sections--19195979432110__header"';
const startIdx = content.indexOf(searchStr);
const endIdx = content.indexOf('</x-header>', startIdx) + '</x-header>'.length;

console.log(`Start index: ${startIdx}, End index: ${endIdx}`);
console.log('--- SURROUNDING CONTENT ---');
console.log(content.substring(startIdx, startIdx + 500));
console.log('... TRUNCATED ...');
console.log(content.substring(endIdx - 200, endIdx + 200));
