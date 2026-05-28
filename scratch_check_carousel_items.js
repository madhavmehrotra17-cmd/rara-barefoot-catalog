const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const carouselStart = html.indexOf('<featured-collections-carousel');
const carouselEnd = html.indexOf('</featured-collections-carousel>', carouselStart);
const carouselContent = html.substring(carouselStart, carouselEnd);

// Find all `<div class="featured-collections-carousel__item`
let idx = 0;
let itemsCount = 0;
while ((idx = carouselContent.indexOf('featured-collections-carousel__item', idx)) !== -1) {
    console.log(`Item ${itemsCount++} at offset ${idx}`);
    console.log(carouselContent.substring(idx - 10, idx + 200));
    idx += 50;
}

// Find all `<product-list` inside the carousel
idx = 0;
let listCount = 0;
while ((idx = carouselContent.indexOf('<product-list', idx)) !== -1) {
    console.log(`Product List ${listCount++} at offset ${idx}`);
    idx += 50;
}

// Check the number of `<product-card` inside the carousel
const cards = [];
idx = 0;
while ((idx = carouselContent.indexOf('<product-card', idx)) !== -1) {
    const handleMatch = carouselContent.substring(idx).match(/handle="([^"]+)"/);
    const handle = handleMatch ? handleMatch[1] : 'unknown';
    cards.push(handle);
    idx += 50;
}
console.log(`Total product cards in carousel: ${cards.length}`);
console.log("Card handles:", cards);
