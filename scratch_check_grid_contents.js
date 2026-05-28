const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all start and end of `<featured-collections-carousel`
let startIdx = 0;
while ((startIdx = html.indexOf('<featured-collections-carousel', startIdx)) !== -1) {
    const endIdx = html.indexOf('</featured-collections-carousel>', startIdx);
    console.log(`Carousel Start: ${startIdx}, End: ${endIdx}, Content Length: ${endIdx - startIdx}`);
    startIdx += 100;
}
