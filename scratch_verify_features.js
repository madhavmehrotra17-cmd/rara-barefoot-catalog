const http = require('http');

function getUrl(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        }).on('error', reject);
    });
}

async function runTests() {
    console.log('=== Starting Advanced Verification Tests ===');
    
    try {
        // 1. Fetch Homepage
        console.log('Fetching Homepage /...');
        const resHome = await getUrl('http://localhost:5176/');
        console.log(`Homepage loaded successfully. Status: ${resHome.statusCode}`);
        
        // Check for desktop dropdown collections title
        const hasDesktopDropdown = resHome.body.includes('data-title="Collections"');
        console.log(`- Desktop "Collections" dropdown present: ${hasDesktopDropdown}`);
        
        // Check for specific dropdown menu items
        const hasTrainingLink = resHome.body.includes('/collections/the-collection?filter=training');
        const hasRunningLink = resHome.body.includes('/collections/the-collection?filter=running');
        const hasEverydayLink = resHome.body.includes('/collections/the-collection?filter=everyday');
        console.log(`- Dropdown filters present: Training: ${hasTrainingLink}, Running: ${hasRunningLink}, Everyday: ${hasEverydayLink}`);
        
        if (!hasDesktopDropdown || !hasTrainingLink || !hasRunningLink || !hasEverydayLink) {
            throw new Error('Navigation dropdown menu links are incorrect or missing!');
        }

        // Check Homepage Product Grid cards count (deduplication check)
        // Find carousel block
        const startCarousel = resHome.body.indexOf('<featured-collections-carousel');
        const endCarousel = resHome.body.indexOf('</featured-collections-carousel>', startCarousel);
        if (startCarousel === -1 || endCarousel === -1) {
            throw new Error('Could not find featured collections carousel on homepage');
        }
        const carouselContent = resHome.body.substring(startCarousel, endCarousel);
        const cardCount = (carouselContent.match(/<product-card/g) || []).length;
        console.log(`- Homepage carousel product cards: ${cardCount} (Expected: 8)`);
        if (cardCount !== 8) {
            throw new Error(`Expected exactly 8 product cards on homepage grid, found ${cardCount}`);
        }

        // 2. Fetch Flagship Collection Page
        console.log('\nFetching Flagship Page /collections/the-collection...');
        const resCollection = await getUrl('http://localhost:5176/collections/the-collection');
        console.log(`Collection page loaded successfully. Status: ${resCollection.statusCode}`);
        
        // Check for filter bar container
        const hasFilterBar = resCollection.body.includes('class="filter-bar-container"');
        console.log(`- Dynamic Filter Bar present: ${hasFilterBar}`);
        
        const hasFilterButtons = resCollection.body.includes('data-filter="training"') && 
                                 resCollection.body.includes('data-filter="running"') && 
                                 resCollection.body.includes('data-filter="everyday"');
        console.log(`- All filter buttons present: ${hasFilterButtons}`);
        
        if (!hasFilterBar || !hasFilterButtons) {
            throw new Error('Flagship collection page is missing the filter bar or its category buttons!');
        }
        
        const collectionCardsCount = (resCollection.body.match(/<product-card/g) || []).length;
        console.log(`- Collection page product cards: ${collectionCardsCount} (Expected: 20)`);
        if (collectionCardsCount !== 20) {
            throw new Error(`Expected 20 product cards on collection page, found ${collectionCardsCount}`);
        }

        console.log('\n=============================================');
        console.log('ALL ADVANCED VERIFICATION TESTS PASSED! ✅');
        console.log('- Global Navigation Dropdown: PERFECT');
        console.log('- Homepage Grid Deduplication: PERFECT (8 Cards)');
        console.log('- Flagship Page Category Filter Bar: PERFECT');
        console.log('=============================================');
        
    } catch (err) {
        console.error('\n❌ VERIFICATION TEST FAILED:');
        console.error(err.message);
        process.exit(1);
    }
}

runTests();
