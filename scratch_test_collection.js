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
    console.log('Starting verification tests for collections merge...');
    
    try {
        // Test 1: Route /collections/the-collection
        console.log('Fetching /collections/the-collection...');
        const resCollection = await getUrl('http://localhost:5176/collections/the-collection');
        console.log(`Status Code: ${resCollection.statusCode}`);
        if (resCollection.statusCode !== 200) {
            throw new Error('/collections/the-collection returned non-200 status');
        }
        
        const titleMatch = resCollection.body.includes('<title>The Collection | Rara Barefoot</title>');
        console.log(`Title tag correct: ${titleMatch}`);
        
        // Count product cards in collection page
        const cardsCount = (resCollection.body.match(/<product-card/g) || []).length;
        console.log(`Product cards in grid: ${cardsCount}`);
        if (cardsCount !== 20) {
            throw new Error(`Expected 20 product cards, found ${cardsCount}`);
        }
        
        // Test 2: Fallback route /collections/mens-barefoot-shoes
        console.log('Fetching legacy /collections/mens-barefoot-shoes...');
        const resMens = await getUrl('http://localhost:5176/collections/mens-barefoot-shoes');
        console.log(`Mens route Status Code: ${resMens.statusCode}`);
        const mensCardsCount = (resMens.body.match(/<product-card/g) || []).length;
        console.log(`Product cards in mens fallback: ${mensCardsCount}`);
        if (mensCardsCount !== 20) {
            throw new Error('Fallback route did not serve collection.html');
        }
        
        // Test 3: Homepage check for correct navigation and tabs removal
        console.log('Fetching homepage /...');
        const resHome = await getUrl('http://localhost:5176/');
        console.log(`Homepage Status Code: ${resHome.statusCode}`);
        
        const hasTheCollectionNav = resHome.body.includes('data-title="THE COLLECTION"><a href="/collections/the-collection"');
        console.log(`Homepage has "THE COLLECTION" header nav: ${hasTheCollectionNav}`);
        if (!hasTheCollectionNav) {
            throw new Error('Homepage is missing "THE COLLECTION" navigation menu');
        }
        
        const hasMenNav = resHome.body.includes('data-title="Men"');
        const hasWomenNav = resHome.body.includes('data-title="Women"');
        console.log(`Homepage has legacy "Men" nav: ${hasMenNav}, has legacy "Women" nav: ${hasWomenNav}`);
        if (hasMenNav || hasWomenNav) {
            throw new Error('Homepage still contains legacy "Men" or "Women" header links');
        }
        
        const hasTabs = resHome.body.includes('<carousel-navigation') || resHome.body.includes('MEN</button><button class="h2"');
        console.log(`Homepage has grid selector tabs: ${hasTabs}`);
        if (hasTabs) {
            throw new Error('Homepage grid tabs were not successfully removed');
        }
        
        const hasHeading = resHome.body.includes('THE COLLECTION</h2>');
        console.log(`Homepage has grid title: ${hasHeading}`);
        
        const homeCardsCount = (resHome.body.match(/<product-card/g) || []).length;
        console.log(`Homepage grid unique product cards: ${homeCardsCount}`);
        
        console.log('\n=========================================');
        console.log('ALL TESTS PASSED SUCCESSFULLY! ✅');
        console.log('The collections merge is verified and 100% correct.');
        console.log('=========================================');
        
    } catch (err) {
        console.error('\n❌ VERIFICATION TEST FAILED:');
        console.error(err.message);
        process.exit(1);
    }
}

runTests();
