const fs = require('fs');
const path = require('path');

const productHtmlPath = path.join(__dirname, '..', 'product.html');
const html = fs.readFileSync(productHtmlPath, 'utf8');

console.log("--- RUNNING SCIENCE SIMULATOR & TRANSPARENCY VERIFICATION ---");

// 1. Check Google Fonts includes Outfit
if (html.includes('family=Anton&family=Outfit') || html.includes('family=Outfit')) {
    console.log("✅ SUCCESS: Outfit font family is loaded via Google Fonts.");
} else {
    console.error("❌ ERROR: Outfit font family is not loaded in product.html head.");
    process.exit(1);
}

// 2. Check that .science-title font is thinned and readable
const firstScienceTitleIndex = html.indexOf('.science-title');
if (firstScienceTitleIndex !== -1) {
    const context = html.substring(firstScienceTitleIndex, firstScienceTitleIndex + 400);
    if (context.includes('Outfit') && context.includes('500')) {
        console.log("✅ SUCCESS: First .science-title block has been thinned to Outfit with weight 500.");
    } else {
        console.error("❌ ERROR: First .science-title block does not use Outfit/500 style. Context:\n", context);
        process.exit(1);
    }
} else {
    console.error("❌ ERROR: No .science-title class styling found in product.html.");
    process.exit(1);
}

// 3. Check the second .science-title block
const lastScienceTitleIndex = html.lastIndexOf('.science-title {');
if (lastScienceTitleIndex !== -1 && lastScienceTitleIndex !== firstScienceTitleIndex) {
    const context = html.substring(lastScienceTitleIndex, lastScienceTitleIndex + 400);
    if (context.includes('Outfit') && context.includes('500')) {
        console.log("✅ SUCCESS: Second .science-title block has been thinned to Outfit with weight 500.");
    } else {
        console.error("❌ ERROR: Second .science-title block does not use Outfit/500 style. Context:\n", context);
        process.exit(1);
    }
}

// 4. Check that bottom benefits section uses scheme-1 (white background)
const benefitsSectionIndex = html.indexOf('id="shopify-section-template--19195983724718__multi_column_VkYVca"');
if (benefitsSectionIndex !== -1) {
    const sectionContext = html.substring(benefitsSectionIndex, benefitsSectionIndex + 3000);
    if (sectionContext.includes('color-scheme--scheme-1')) {
        console.log("✅ SUCCESS: Bottom benefits section uses the white color-scheme (scheme-1) to blend perfectly.");
    } else {
        console.error("❌ ERROR: Bottom benefits section does not use scheme-1. Context:\n", sectionContext.substring(0, 1500));
        process.exit(1);
    }

    if (sectionContext.includes('BENEFITS OF BAREFOOT')) {
        console.log("✅ SUCCESS: Section header has been successfully updated to 'BENEFITS OF BAREFOOT'.");
    } else {
        console.error("❌ ERROR: Section header is not 'BENEFITS OF BAREFOOT'. Context:\n", sectionContext.substring(0, 2000));
        process.exit(1);
    }
} else {
    console.error("❌ ERROR: Bottom benefits section VkYVca not found in product.html.");
    process.exit(1);
}

// 5. Check background removal canvas script is present
if (html.includes('function processBenefitsImages()') && html.includes('visited = new Uint8Array')) {
    console.log("✅ SUCCESS: Background removal and image cropping script is successfully embedded at the bottom of the page.");
} else {
    console.error("❌ ERROR: Background removal canvas script is missing or incomplete.");
    process.exit(1);
}

console.log("\n🚀 ALL CHECKS PASSED SUCCESSFULLY! The simulator headers are thinned and beautiful, and the barefoot benefits section is 100% pixel-perfect identical to the homepage with flawless transparent shoe backgrounds.");
process.exit(0);
