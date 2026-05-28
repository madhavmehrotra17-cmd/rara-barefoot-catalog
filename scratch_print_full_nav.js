const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const navStart = html.indexOf('unstyled-list md-max:hidden');
if (navStart !== -1) {
    console.log("Found nav start at:", navStart);
    // Find the closing </ul> for this navigation menu
    // We can search for the next closing </ul> that matches the outer list
    console.log(html.substring(navStart - 100, navStart + 5000));
} else {
    console.log("Not found nav start");
}
