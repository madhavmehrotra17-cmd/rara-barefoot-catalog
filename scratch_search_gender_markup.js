const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'collection.html'), 'utf8');

const index = html.indexOf('gender-selection-container');
if (index !== -1) {
    console.log("Found gender-selection-container at index:", index);
    console.log(html.substring(index - 200, index + 1500));
} else {
    console.log("gender-selection-container NOT found in collection.html");
}
