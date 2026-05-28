const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('--- STARTING VERIFICATION FOR SCROLL 4 ---');

let passed = true;

// 1. Check Anton Font Import
if (content.includes('family=Anton')) {
    console.log('✓ SUCCESS: Anton Google Font is imported successfully.');
} else {
    console.error('✗ FAILURE: Anton Google Font is NOT imported.');
    passed = false;
}

// 2. Check Scroll 4 Section Markup
if (content.includes('class="scroll-4-section"') || content.includes("class='scroll-4-section'")) {
    console.log('✓ SUCCESS: .scroll-4-section markup exists.');
} else {
    console.error('✗ FAILURE: .scroll-4-section markup is missing.');
    passed = false;
}

// 3. Check Split Grid Layout
if (content.includes('class="scroll-4-grid"')) {
    console.log('✓ SUCCESS: .scroll-4-grid layout exists.');
} else {
    console.error('✗ FAILURE: .scroll-4-grid layout is missing.');
    passed = false;
}

// 4. Check Clipped Heading and Text Content
if (content.includes('THE BAREFOOT MOVEMENT')) {
    console.log('✓ SUCCESS: "THE BAREFOOT MOVEMENT" heading content exists.');
} else {
    console.error('✗ FAILURE: "THE BAREFOOT MOVEMENT" heading content is missing.');
    passed = false;
}

if (content.includes('HkEDr0jVekaZO.webp')) {
    console.log('✓ SUCCESS: Text-clipping background webp HkEDr0jVekaZO.webp is referenced.');
} else {
    console.error('✗ FAILURE: Text-clipping background webp HkEDr0jVekaZO.webp is missing.');
    passed = false;
}

// 5. Check Action Buttons
if (content.includes('JOIN US') && content.includes('EXPLORE COLLECTION')) {
    console.log('✓ SUCCESS: Action buttons ("JOIN US" and "EXPLORE COLLECTION") exist.');
} else {
    console.error('✗ FAILURE: Action buttons are missing or labeled incorrectly.');
    passed = false;
}

// 6. Check GIF collage source
if (content.includes('Untitled_design_1.gif')) {
    console.log('✓ SUCCESS: Looping community grid GIF (Untitled_design_1.gif) is referenced.');
} else {
    console.error('✗ FAILURE: Looping community grid GIF is missing.');
    passed = false;
}

// 7. Check Pitch Black Background Styling
if (content.includes('background-color: #000000; /* Pitch Black */')) {
    console.log('✓ SUCCESS: .scroll-4-section pitch black background style is set.');
} else {
    console.error('✗ FAILURE: .scroll-4-section pitch black background style is missing.');
    passed = false;
}

console.log('--- VERIFICATION RESULT ---');
if (passed) {
    console.log('🎉 ALL SCROLL 4 TESTS PASSED SUCCESSFULLY! 🎉');
} else {
    console.error('🚨 SOME SCROLL 4 TESTS FAILED. PLEASE FIX THEM. 🚨');
}
process.exit(passed ? 0 : 1);
