const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const content = fs.readFileSync(filePath, 'utf8');

const query = 'scroll-4-gif';
const index = content.indexOf(query);

if (index !== -1) {
    const sectionEndIndex = content.indexOf('</section>', index);
    console.log('Found Scroll 4 section ending! Printing from 100 chars before to 100 chars after:');
    console.log(content.substring(sectionEndIndex - 100, sectionEndIndex + 200));
} else {
    console.log('Not found.');
}
