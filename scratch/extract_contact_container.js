const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'community.html');
const content = fs.readFileSync(filePath, 'utf8');

const query = 'class="contact-container-1"';
const index = content.indexOf(query);

if (index !== -1) {
    console.log('Found contact-container-1! Printing from 2000 chars before to 1000 chars after:');
    console.log(content.substring(index - 2000, index + 1000));
} else {
    console.log('Not found.');
}
