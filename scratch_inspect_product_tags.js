const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'collection.html');
const content = fs.readFileSync(file, 'utf8');

// Find first <product-card
const cardIdx = content.indexOf('<product-card');
if (cardIdx !== -1) {
    console.log("=== First Product Card ===");
    console.log(content.substring(cardIdx, content.indexOf('</product-card>', cardIdx) + 15));
}

// Check what tags are in the product cards
const cardRegex = /<product-card[\s\S]*?<\/product-card>/g;
let match;
const tagsMap = new Map();
while ((match = cardRegex.exec(content)) !== null) {
    const cardHtml = match[0];
    const handleMatch = cardHtml.match(/handle="([^"]+)"/);
    const handle = handleMatch ? handleMatch[1] : 'unknown';
    
    // Find tags
    const tagsIdx = cardHtml.indexOf('class="prooduct-tags"'); // Wait, is it spelled "prooduct-tags" or "product-tags"?
    let tagsText = '';
    if (tagsIdx !== -1) {
        const startTag = cardHtml.indexOf('>', tagsIdx) + 1;
        const endTag = cardHtml.indexOf('</div>', startTag);
        tagsText = cardHtml.substring(startTag, endTag).replace(/<[^>]+>/g, '').trim();
    } else {
        // Let's search for "tags" or look at the content around the card
        const searchTags = cardHtml.match(/class="[^"]*tag[^"]*"[^>]*>([^<]+)/i);
        if (searchTags) {
            tagsText = searchTags[1].trim();
        }
    }
    tagsMap.set(handle, tagsText);
}

console.log("\n=== Product Handles and their Tags ===");
for (let [handle, tags] of tagsMap) {
    console.log(`${handle}: ${tags || 'NO TAGS FOUND'}`);
}
