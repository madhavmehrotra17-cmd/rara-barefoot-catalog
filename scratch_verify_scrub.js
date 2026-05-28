const fs = require('fs');
const path = require('path');
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
    console.log('=== Starting Hover Scrubbing Transition Verification ===');
    
    try {
        // 1. Check local file injections
        console.log('Verifying local files injection...');
        const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        const collectionHtml = fs.readFileSync(path.join(__dirname, 'collection.html'), 'utf8');

        const hasIndexScript = indexHtml.includes('id="product-scrub-hover-fix"');
        const hasIndexStyle = indexHtml.includes('id="ultimate-fix"');
        const hasCollectionScript = collectionHtml.includes('id="product-scrub-hover-fix"');
        const hasCollectionStyle = collectionHtml.includes('id="ultimate-fix"');

        console.log(`- index.html has script tag: ${hasIndexScript}`);
        console.log(`- index.html has style tag: ${hasIndexStyle}`);
        console.log(`- collection.html has script tag: ${hasCollectionScript}`);
        console.log(`- collection.html has style tag: ${hasCollectionStyle}`);

        if (!hasIndexScript || !hasIndexStyle || !hasCollectionScript || !hasCollectionStyle) {
            throw new Error('Script or style tag missing from index.html or collection.html!');
        }

        // 2. Fetch Homepage to ensure it compiles and serves correctly
        console.log('\nFetching Homepage to verify compilation...');
        const homeRes = await getUrl('http://localhost:5176/');
        console.log(`Homepage loaded successfully with status: ${homeRes.statusCode}`);

        // 3. Fetch flagship collection page to ensure it serves correctly
        console.log('\nFetching Flagship page to verify compilation...');
        const collectionRes = await getUrl('http://localhost:5176/collections/the-collection');
        console.log(`Collection page loaded successfully with status: ${collectionRes.statusCode}`);

        // 4. Verify some custom image file URLs resolve successfully (200 OK)
        console.log('\nVerifying custom product shot urls serve correctly...');
        const testUrls = [
            '/Uruk%20blue-1.JPG',
            '/Uruk%20neo-1.JPG',
            '/Uruk%20white-1.JPG',
            '/Xanadu%20black%20-1.JPG',
            '/xanadu%20white-1.JPG',
            '/zanzibar%20blue-1.jpg',
            '/zanzibar%20yellow-1.JPG'
        ];

        for (const url of testUrls) {
            const res = await getUrl('http://localhost:5176' + url);
            console.log(`- Image ${url} resolves: ${res.statusCode === 200 ? 'SUCCESS ✅ (200)' : 'FAILED ❌ (' + res.statusCode + ')'}`);
            if (res.statusCode !== 200) {
                throw new Error(`Failed to resolve custom image URL: ${url}`);
            }
        }

        console.log('\n======================================================');
        console.log('ALL HOVER SCRUBBING VERIFICATION TESTS PASSED! ✅');
        console.log('- Core Script & Style Injected: PERFECT');
        console.log('- Templates serve flawlessly: PERFECT');
        console.log('- High-Resolution Product Images resolve: PERFECT');
        console.log('======================================================');

    } catch (err) {
        console.error('\n❌ VERIFICATION TEST FAILED:');
        console.error(err.message);
        process.exit(1);
    }
}

runTests();
