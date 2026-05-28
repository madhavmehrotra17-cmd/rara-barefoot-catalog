const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'community.html');
const content = fs.readFileSync(filePath, 'utf8');

const query = 'id="shopify-section-template--19195983364270__image_with_text_BHzgBp"';
const index = content.indexOf(query);

if (index !== -1) {
    console.log('Found full section! Printing 4000 characters starting 200 chars before:');
    console.log(content.substring(Math.max(0, index - 200), Math.min(content.length, index + 3800)));
} else {
    console.log('Section ID not found. Searching for image-with-text:');
    const idx2 = content.indexOf('<image-with-text');
    if (idx2 !== -1) {
        console.log(content.substring(idx2 - 100, idx2 + 3000));
    } else {
        console.log('No image-with-text found.');
    }
}
