const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const content = fs.readFileSync(filePath, 'utf8');

const query = 'class="scroll-4-section"';
const index = content.indexOf(query);

if (index !== -1) {
    const sectionEndIndex = content.indexOf('</section>', index) + 10;
    console.log('Found Scroll 4 section ending! Printing from 200 chars before to 200 chars after:');
    console.log(content.substring(sectionEndIndex - 250, sectionEndIndex + 250));
} else {
    console.log('Not found.');
}
