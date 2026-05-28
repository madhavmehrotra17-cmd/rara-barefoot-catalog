const fs = require('fs');
const indexHtml = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html', 'utf8');

let out = '';
// Find occurrences of background styles or linear-gradients
const styleMatches = indexHtml.match(/<style[\s\S]*?<\/style>/g) || [];
out += '--- style tags containing linear-gradient or card or grid or product ---\n';
for (const style of styleMatches) {
    if (style.includes('linear-gradient') || style.includes('card') || style.includes('product') || style.includes('catalog')) {
        out += style.slice(0, 1000) + '...\n\n';
    }
}

// Find occurrences of catalog grids or collection grids
out += '--- div or section containing class with catalog or collection ---\n';
const tagMatches = indexHtml.match(/<(section|div)[^>]*class="[^"]*(catalog|collection|grid)[^"]*"[^>]*>/gi) || [];
for (const tag of tagMatches) {
    out += tag + '\n';
}

fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\scratch\\find_catalog_output.txt', out, 'utf8');
console.log('Done writing find_catalog_output.txt');
