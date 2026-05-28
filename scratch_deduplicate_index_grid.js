const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexFile, 'utf8');

// Find the carousel block
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

// Find all product card matches
const cardRegex = /<product-card[\s\S]*?<\/product-card>/g;
const cards = [];
let match;
while ((match = cardRegex.exec(carouselContent)) !== null) {
    cards.push(match[0]);
}

console.log(`Found ${cards.length} product cards in index.html carousel.`);

// Filter for only men's handles (our 8 unique styles)
const allowedHandles = [
    'uruk-black-men',
    'zanzibar-blue-barefoot-shoes-men',
    'uruk-blue-barefoot-shoes-men',
    'xanadu-grey-men',
    'xanadu-black-barefoot-shoes-men',
    'uruk-neon-barefoot-shoes-men',
    'uruk-white-barefoot-shoes-men',
    'zanzibar-grey-men'
];

const filteredCards = cards.filter(cardHtml => {
    const handleMatch = cardHtml.match(/handle="([^"]+)"/);
    if (!handleMatch) return false;
    const handle = handleMatch[1];
    return allowedHandles.includes(handle);
});

console.log(`Filtered down to ${filteredCards.length} product cards.`);

// Build the new clean grid inner content
const newGridInner = `
<div class="featured-collections-carousel__item is-selected">
  <product-list class="product-list justify-center">
    ${filteredCards.join('\n    ')}
  </product-list>
</div>
`;

// Replace in the file
const beforeCarousel = content.substring(0, carouselInnerStart);
const afterCarousel = content.substring(carouselEnd);
content = beforeCarousel + newGridInner + afterCarousel;

fs.writeFileSync(indexFile, content, 'utf8');
console.log('Successfully deduplicated the homepage featured grid inside index.html!');
