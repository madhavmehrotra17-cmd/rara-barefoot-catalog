const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'community.html');
const content = fs.readFileSync(filePath, 'utf8');

const query = 'class="footer-section"';
const index = content.indexOf(query);

if (index !== -1) {
    console.log('Found footer-section! Printing 5000 characters from it:');
    console.log(content.substring(Math.max(0, index - 200), Math.min(content.length, index + 4800)));
} else {
    console.log('footer-section class not found. Searching for <footer or id="footer":');
    const idx2 = content.indexOf('<footer');
    if (idx2 !== -1) {
        console.log(content.substring(idx2 - 100, idx2 + 4000));
    } else {
        console.log('No footer found.');
    }
}
