const fs = require('fs');
const path = require('path');

const productContent = fs.readFileSync(path.join(__dirname, 'product.html'), 'utf8');
const headerStart = productContent.indexOf('<x-header');
const headerEnd = productContent.indexOf('</x-header>', headerStart);
const headerHtml = productContent.substring(headerStart, headerEnd + '</x-header>'.length);

console.log('LINKS IN PRODUCT HEADER:');
const linkRegex = /<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
let match;
while ((match = linkRegex.exec(headerHtml)) !== null) {
    console.log(`Href: ${match[1]}, Text: ${match[2].trim().replace(/\s+/g, ' ')}`);
}
