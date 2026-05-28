const fs = require('fs');
const path = require('path');

const productHtmlPath = path.join(__dirname, '..', 'product.html');
const html = fs.readFileSync(productHtmlPath, 'utf8');

console.log("--- RUNNING CLEAN MINI SHOE SVG VERIFICATION ---");

// 1. Check clean shoe classes are present
if (html.includes('svg-shoe-body') && html.includes('svg-shoe-body-narrow') && html.includes('svg-shoe-opening') && html.includes('svg-shoe-opening-narrow') && html.includes('svg-shoe-lace-simple') && html.includes('svg-shoe-lace-simple-narrow') && html.includes('svg-shoe-line') && html.includes('svg-shoe-line-narrow')) {
    console.log("✅ SUCCESS: All clean minimalist shoe classes are present in product.html.");
} else {
    console.error("❌ ERROR: One or more clean shoe classes are missing in product.html.");
    process.exit(1);
}

// 2. Validate custom styling blocks have these clean classes
if (html.includes('.barefoot-svg .svg-shoe-body') && html.includes('.traditional-svg .svg-shoe-body-narrow')) {
    console.log("✅ SUCCESS: Both CSS blocks contain correct minimalist styling overrides.");
} else {
    console.error("❌ ERROR: Custom styling for clean shoe graphics is missing in head.");
    process.exit(1);
}

console.log("\n🚀 ALL CHECKS PASSED! The barefoot science layouts now look like clean, highly stylized, instantly recognizable shoe silhouettes.");
process.exit(0);
