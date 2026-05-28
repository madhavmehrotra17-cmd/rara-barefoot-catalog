const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'community.html');
const content = fs.readFileSync(filePath, 'utf8');

const footerIndex = content.lastIndexOf('<footer class="footer">');
if (footerIndex !== -1) {
    console.log('Found <footer class="footer">! Printing 8000 characters from it:');
    console.log(content.substring(footerIndex, footerIndex + 8000));
} else {
    // Search for just footer
    const idx2 = content.lastIndexOf('<footer');
    if (idx2 !== -1) {
        console.log('Found <footer! Printing 8000 characters from it:');
        console.log(content.substring(idx2 - 200, idx2 + 7800));
    } else {
        console.log('No footer found.');
    }
}
