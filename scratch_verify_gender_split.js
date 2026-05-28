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
    console.log('=== Starting Split Gender Selector Verification ===');
    
    try {
        // 1. Fetch Homepage
        console.log('Fetching Homepage /...');
        const resHome = await getUrl('http://localhost:5176/');
        console.log(`Homepage loaded. Status: ${resHome.statusCode}`);
        
        // Assert: "Collections" dropdown navigation has been completely removed
        const hasCollectionsDropdown = resHome.body.includes('data-title="Collections"');
        console.log(`- "Collections" dropdown menu removed: ${!hasCollectionsDropdown}`);
        if (hasCollectionsDropdown) {
            throw new Error('Header still contains old "Collections" dropdown menu!');
        }

        // Assert: "THE COLLECTION" header is bold
        const isBoldNav = resHome.body.includes('style="font-weight: 700; padding-right: 15px;">THE COLLECTION</a>');
        console.log(`- "THE COLLECTION" header link styled explicitly bold: ${isBoldNav}`);
        if (!isBoldNav) {
            throw new Error('Header link "THE COLLECTION" is not styled with font-weight: 700!');
        }

        // Assert: Homepage banner links point to the gender-filtered collection page
        const hasMenLink = resHome.body.includes('href="/collections/the-collection?gender=men" class="gender-banner-card"');
        const hasWomenLink = resHome.body.includes('href="/collections/the-collection?gender=women" class="gender-banner-card"');
        console.log(`- Homepage Men CTA Banner links correct: ${hasMenLink}`);
        console.log(`- Homepage Women CTA Banner links correct: ${hasWomenLink}`);
        
        if (!hasMenLink || !hasWomenLink) {
            throw new Error('Homepage banner cards do not link to the correct gender-filtered collection URLs!');
        }

        // 2. Fetch Flagship Collection Page (No params)
        console.log('\nFetching Flagship page without query params /collections/the-collection...');
        const resCollection = await getUrl('http://localhost:5176/collections/the-collection');
        console.log(`Collection page loaded. Status: ${resCollection.statusCode}`);
        
        // Assert: Split-screen visual selector is present in markup
        const hasSelectionScreen = resCollection.body.includes('id="gender-selection-screen"');
        console.log(`- Markup contains Gender Split Selection Screen: ${hasSelectionScreen}`);
        
        // Assert: Gender switcher bar is present in markup
        const hasToggleBar = resCollection.body.includes('id="gender-toggle-bar"');
        console.log(`- Markup contains Gender Switcher Tab Bar: ${hasToggleBar}`);

        if (!hasSelectionScreen || !hasToggleBar) {
            throw new Error('Flagship collection page is missing the split selection screen or switcher tab bar in markup!');
        }

        console.log('\n======================================================');
        console.log('ALL SPLIT GENDER SELECTOR VERIFICATION TESTS PASSED! ✅');
        console.log('- Navigation Dropdown Removed & Single Bold Link Kept: PERFECT');
        console.log('- Homepage Gender Banners Mapped correctly: PERFECT');
        console.log('- Collection Page Split Selector Screen present: PERFECT');
        console.log('======================================================');
        
    } catch (err) {
        console.error('\n❌ VERIFICATION TEST FAILED:');
        console.error(err.message);
        process.exit(1);
    }
}

runTests();
