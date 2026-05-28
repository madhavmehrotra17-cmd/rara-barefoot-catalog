const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'community.html');
const content = fs.readFileSync(filePath, 'utf8');

// Search for footer tag
const footerStart = content.indexOf('<footer');
const footerEnd = content.indexOf('</footer>', footerStart) + 9;

if (footerStart !== -1) {
    console.log('FOUND footer tag range:');
    console.log(content.substring(footerStart, footerEnd));
} else {
    // Search for deloit-footer-logo or contact-container-1
    const contactStart = content.indexOf('class="contact-container-1"');
    if (contactStart !== -1) {
        console.log('FOUND contact-container-1 range:');
        console.log(content.substring(contactStart - 1000, contactStart + 2000));
    } else {
        console.log('Nothing found.');
    }
}
