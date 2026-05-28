const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'community.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find the footer-group block
const query = '<!-- BEGIN sections: footer-group -->';
const index = content.indexOf(query);

if (index !== -1) {
    console.log('Found footer-group! Printing the whole block up to the end:');
    console.log(content.substring(index, content.indexOf('</html>', index) + 7));
} else {
    // Search for <footer class="footer"> or id="footer" or standard <footer> tag
    const idx2 = content.lastIndexOf('<footer');
    if (idx2 !== -1) {
        console.log('Found <footer> tag! Printing up to end of html:');
        console.log(content.substring(idx2 - 100, content.indexOf('</html>', idx2) + 7));
    } else {
        console.log('No footer tags found.');
    }
}
