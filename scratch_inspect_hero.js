const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find slideshow-carousel close tag and look at the next 2000 characters
const idx = html.indexOf('</slideshow-carousel>');
if (idx !== -1) {
    console.log("Found </slideshow-carousel> at index", idx);
    console.log("--- Content immediately after slideshow-carousel ---");
    console.log(html.substring(idx, idx + 2000));
} else {
    console.log("No </slideshow-carousel> found.");
}
