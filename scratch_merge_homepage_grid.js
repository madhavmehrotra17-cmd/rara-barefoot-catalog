const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexFile, 'utf8');

console.log('Merging homepage featured collections carousel panels in index.html...');

// 1. Extract carousel items
// The carousel block is inside <featured-collections-carousel ...>...</featured-collections-carousel>
const carouselStart = content.indexOf('<featured-collections-carousel');
if (carouselStart === -1) {
    console.error('Could not find featured-collections-carousel');
    process.exit(1);
}
const carouselInnerStart = content.indexOf('>', carouselStart) + 1;
const carouselEnd = content.indexOf('</featured-collections-carousel>', carouselInnerStart);
if (carouselEnd === -1) {
    console.error('Could not find </featured-collections-carousel>');
    process.exit(1);
}

const carouselContent = content.substring(carouselInnerStart, carouselEnd);

// Find the panels: <featured-collections-carousel__item ...> ... </div>
// There are two panels
const panels = [];
const itemRegex = /<div\s+class="featured-collections-carousel__item[^>]*>([\s\S]*?)<\/featured-collections-carousel>/g; // Wait, let's match class="featured-collections-carousel__item"
// Let's do a simpler index search since it's exactly two items
const firstItemIdx = carouselContent.indexOf('class="featured-collections-carousel__item');
const secondItemIdx = carouselContent.indexOf('class="featured-collections-carousel__item', firstItemIdx + 40);

if (firstItemIdx === -1 || secondItemIdx === -1) {
    console.error('Could not find two carousel items on homepage');
    process.exit(1);
}

// Let's extract all <product-card> elements from the whole carouselContent
const cardRegex = /<product-card[\s\S]*?<\/product-card>/g;
const uniqueCards = new Map();
let cardMatch;
let totalExtracted = 0;

while ((cardMatch = cardRegex.exec(carouselContent)) !== null) {
    const cardHtml = cardMatch[0];
    totalExtracted++;
    const handleMatch = cardHtml.match(/handle="([^"]+)"/);
    if (handleMatch) {
        const handle = handleMatch[1];
        if (!uniqueCards.has(handle)) {
            uniqueCards.set(handle, cardHtml);
        }
    } else {
        const key = Math.random().toString();
        uniqueCards.set(key, cardHtml);
    }
}

console.log(`Extracted total ${totalExtracted} cards, unique count: ${uniqueCards.size}`);

// Create a single unified product-list grid
const mergedCardsHtml = Array.from(uniqueCards.values()).join('\n');

// 2. Build the new carousel markup (just a single panel containing all cards)
const firstItemTagEnd = carouselContent.indexOf('>', firstItemIdx) + 1;
const firstProductListStart = carouselContent.indexOf('<product-list', firstItemTagEnd);
const firstProductListTagEnd = carouselContent.indexOf('>', firstProductListStart) + 1;

const newCarouselInner = `
<div class="featured-collections-carousel__item is-selected">
  <product-list class="product-list justify-center">
    ${mergedCardsHtml}
  </product-list>
</div>
`;

// Re-assemble the index.html content
const beforeCarousel = content.substring(0, carouselInnerStart);
const afterCarousel = content.substring(carouselEnd);
content = beforeCarousel + newCarouselInner + afterCarousel;

// 3. Replace the carousel-navigation tabs with a beautiful unified header
const navStart = content.indexOf('<carousel-navigation');
if (navStart !== -1) {
    const navEnd = content.indexOf('</carousel-navigation>', navStart) + 22; // length of closing tag
    const beforeNav = content.substring(0, navStart);
    const afterNav = content.substring(navEnd);
    const newHeader = '<h2 class="h2" style="font-family: \'Anton\'; letter-spacing: 3px; font-size: 36px; text-transform: uppercase;">THE COLLECTION</h2>';
    content = beforeNav + newHeader + afterNav;
    console.log('Homepage tabs replaced with "THE COLLECTION" header.');
}

fs.writeFileSync(indexFile, content, 'utf8');
console.log('Successfully completed homepage carousel merge inside index.html!');
