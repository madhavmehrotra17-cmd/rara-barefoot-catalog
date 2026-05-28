const fs = require('fs');
const path = require('path');

const mensPath = path.join(__dirname, 'mens.html');
const womensPath = path.join(__dirname, 'womens.html');
const outputPath = path.join(__dirname, 'collection.html');

console.log('Reading mens.html and womens.html...');
const mensHtml = fs.readFileSync(mensPath, 'utf8');
const womensHtml = fs.readFileSync(womensPath, 'utf8');

// Function to extract all product-card elements inside <product-list ...>...</product-list>
function extractProductCards(html) {
    const listStartIdx = html.indexOf('<product-list');
    if (listStartIdx === -1) {
        console.error('Could not find <product-list in html');
        return [];
    }
    const innerStart = html.indexOf('>', listStartIdx) + 1;
    const listEndIdx = html.indexOf('</product-list>', innerStart);
    if (listEndIdx === -1) {
        console.error('Could not find </product-list> in html');
        return [];
    }
    
    const listContent = html.substring(innerStart, listEndIdx);
    
    // Match product cards
    // A card starts with <product-card class="product-card" ...> and ends with </product-card>
    const regex = /<product-card[\s\S]*?<\/product-card>/g;
    const cards = [];
    let match;
    while ((match = regex.exec(listContent)) !== null) {
        cards.push(match[0]);
    }
    console.log(`Extracted ${cards.length} cards.`);
    return cards;
}

const menCards = extractProductCards(mensHtml);
const womenCards = extractProductCards(womensHtml);

// Merge them, maintaining uniqueness by product handle
const uniqueCards = new Map();

function addCardsToMap(cards) {
    cards.forEach(card => {
        const handleMatch = card.match(/handle="([^"]+)"/);
        if (handleMatch) {
            const handle = handleMatch[1];
            if (!uniqueCards.has(handle)) {
                // If it's a women's card, let's keep it, if it's a men's card we also keep it.
                uniqueCards.set(handle, card);
            }
        } else {
            // If no handle is found, use a fallback based on hash or title
            const titleMatch = card.match(/product-title[^>]*>([^<]+)/);
            const key = titleMatch ? titleMatch[1].trim() : Math.random().toString();
            if (!uniqueCards.has(key)) {
                uniqueCards.set(key, card);
            }
        }
    });
}

addCardsToMap(menCards);
addCardsToMap(womenCards);

console.log(`Merged collection unique card count: ${uniqueCards.size}`);

// Prepare the new product list content
const mergedCardsHtml = Array.from(uniqueCards.values()).join('\n');

// Clone mens.html structure and perform replacements
let collectionHtml = mensHtml;

// 1. Replace the product-list contents
const listStartIdx = collectionHtml.indexOf('<product-list');
const innerStart = collectionHtml.indexOf('>', listStartIdx) + 1;
const listEndIdx = collectionHtml.indexOf('</product-list>', innerStart);

collectionHtml = collectionHtml.substring(0, innerStart) + '\n' + mergedCardsHtml + '\n' + collectionHtml.substring(listEndIdx);

// 2. Replace title and metadata
collectionHtml = collectionHtml.replace(
    /<title>[^<]+<\/title>/,
    '<title>The Collection | Rara Barefoot</title>'
);

collectionHtml = collectionHtml.replace(
    /<meta name="description" content="[^"]+"/,
    '<meta name="description" content="Discover the ultimate Rara Barefoot Collection. Zero-drop barefoot shoes featuring wide toe boxes & flexible designs for natural strength and mobility. Free shipping in India."'
);

// 3. Replace canonical URL
collectionHtml = collectionHtml.replace(
    /href="https:\/\/www\.rarabarefoot\.in\/collections\/mens-barefoot-shoes"/,
    'href="https://www.rarabarefoot.in/collections/the-collection"'
);

// 4. Replace banner title and breadcrumbs inside collection header
collectionHtml = collectionHtml.replace(
    /<h1 class="h1" >MEN'S SHOES<\/h1>/,
    '<h1 class="h1" >THE COLLECTION<\/h1>'
);

// Write to collection.html
fs.writeFileSync(outputPath, collectionHtml, 'utf8');
console.log('Successfully created collection.html!');
