const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const sectionId = 'shopify-section-sections--19195979432110__custom_liquid_r7AL7G';
const sectionIdx = indexHtml.indexOf(sectionId);
if (sectionIdx !== -1) {
    // Find the enclosing <section> tag start
    const beforeSection = indexHtml.substring(0, sectionIdx);
    const startTagIdx = beforeSection.lastIndexOf('<section');
    
    // Find the closing </section> tag
    const endTagIdx = indexHtml.indexOf('</section>', sectionIdx) + '</section>'.length;
    
    console.log(`Section start index: ${startTagIdx}, end index: ${endTagIdx}`);
    console.log('--- SECTION CONTENT ---');
    console.log(indexHtml.substring(startTagIdx, endTagIdx));
} else {
    console.log(`Could not find section with ID: ${sectionId}`);
}
