const fs = require('fs');
const html = fs.readFileSync('collection.html', 'utf8');

const regex = /<product-card[^>]*handle="([^"]+)"[\s\S]*?<a[^>]*class="product-title[^"]*"[^>]*>([^<]+)<\/a>[\s\S]*?<div class="prooduct-tags">([^<]+)<\/div>/g;
let match;
console.log("--- Products and their tags ---");
while ((match = regex.exec(html)) !== null) {
    console.log(`Handle: ${match[1]}\nTitle: ${match[2].trim()}\nTags: ${match[3].trim()}\n`);
}
