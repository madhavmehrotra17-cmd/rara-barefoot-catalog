const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const content = fs.readFileSync(filePath, 'utf8');

const query = '.scroll-4-btn {';
const index = content.indexOf(query);

if (index !== -1) {
    const endBlockIndex = content.indexOf('</style>', index);
    console.log('Found style block ending! Printing from 100 chars before to style tag:');
    console.log(content.substring(endBlockIndex - 300, endBlockIndex + 8));
} else {
    console.log('Not found.');
}
