const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// 1. Check for custom liquid section
const liquidId = 'shopify-section-sections--19195979432110__custom_liquid_r7AL7G';
if (content.includes(liquidId)) {
    console.log("WARNING: The custom liquid section ID is still present in index.html!");
} else {
    console.log("SUCCESS: The custom liquid section has been successfully removed from index.html.");
}

// 2. Check for MORE dropdown primary nav item
const moreItem = 'dropdown-nav';
const moreText = 'MORE';
if (content.includes(moreItem) && content.includes(moreText)) {
    console.log("SUCCESS: The 'MORE' dropdown markup is present in the updated header.");
    
    // Find index of MORE and show context
    const idx = content.indexOf('dropdown-nav');
    console.log('--- CONTEXT OF DROPDOWN NAV IN index.html ---');
    console.log(content.substring(idx - 200, idx + 800));
} else {
    console.log("WARNING: The 'MORE' dropdown markup was not found in index.html!");
}
