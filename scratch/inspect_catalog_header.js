const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'catalog.html'), 'utf8');

const searchStr = '<x-header';
const idx = content.indexOf(searchStr);

if (idx !== -1) {
    console.log(`Found x-header in catalog.html at index: ${idx}`);
    const endIdx = content.indexOf('</x-header>', idx) + '</x-header>'.length;
    fs.writeFileSync(path.join(__dirname, 'catalog_header_extracted.html'), content.substring(idx, endIdx), 'utf8');
    console.log("Wrote catalog.html x-header to scratch/catalog_header_extracted.html");
    
    // Check outer header styles
    const outerSearch = '<header id="shopify-section-sections--19195979432110__header"';
    const oIdx = content.indexOf(outerSearch);
    if (oIdx !== -1) {
        console.log(`Found outer header block starting at: ${oIdx}`);
        const oEnd = content.indexOf('</style>', oIdx) + '</style>'.length;
        console.log('--- OUTER HEADER STYLE BLOCK in catalog.html ---');
        console.log(content.substring(oIdx, oEnd));
    }
} else {
    console.log("Could not find x-header in catalog.html");
}
