const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const queries = ['slideshow', 'hero', 'banner', 'slideshow-carousel', 'slideshow__slide'];
queries.forEach(q => {
    let idx = 0;
    const matches = [];
    while (true) {
        idx = html.indexOf(q, idx);
        if (idx === -1) break;
        matches.push(idx);
        idx += q.length;
    }
    console.log(`Query "${q}" has ${matches.length} matches.`);
    if (matches.length > 0) {
        console.log(`First match context for "${q}":`);
        const first = matches[0];
        console.log(html.substring(Math.max(0, first - 100), Math.min(html.length, first + 300)));
    }
});
