const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('<slideshow-carousel');
const end = html.indexOf('</slideshow-carousel>');

if (start !== -1 && end !== -1) {
    console.log(html.substring(start, end + '</slideshow-carousel>'.length));
} else {
    console.log("Could not find full slideshow-carousel block");
}
