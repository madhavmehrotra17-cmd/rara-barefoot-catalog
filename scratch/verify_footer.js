const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('--- STARTING PREMIUM FOOTER VERIFICATION ---');

let passed = true;

// 1. Check Footer Wrapper & Class
if (content.includes('class="premium-footer"')) {
    console.log('✓ SUCCESS: premium-footer class exists.');
} else {
    console.error('✗ FAILURE: premium-footer class is missing.');
    passed = false;
}

// 2. Check Vibe-Aligned Background Color
if (content.includes('background-color: #111111;') || content.includes('background: linear-gradient(to bottom, #000000 0%, #111111 120px, #111111 100%);')) {
    console.log('✓ SUCCESS: Vibe-aligned charcoal background-color (#111111) or color gradient transition is configured.');
} else {
    console.error('✗ FAILURE: Vibe-aligned charcoal background-color is missing.');
    passed = false;
}

// 3. Check Logo & Socials
if (content.includes('NEW_ra_LOGO_2.png') && content.includes('FOLLOW US:')) {
    console.log('✓ SUCCESS: "ra" brand logo and "FOLLOW US" label exist.');
} else {
    console.error('✗ FAILURE: Brand logo or FOLLOW US label is missing.');
    passed = false;
}

if (content.includes('x-removebg-preview.png') && 
    content.includes('insta01-removebg-preview.png') && 
    content.includes('facebook01-removebg-preview.png') && 
    content.includes('linkedin.png')) {
    console.log('✓ SUCCESS: All social icons (X, Instagram, Facebook, LinkedIn) are present.');
} else {
    console.error('✗ FAILURE: Some social icons are missing.');
    passed = false;
}

// 4. Check Link Columns (Collections, Help, Company)
if (content.includes('Collections</h4>') && content.includes('THE COLLECTION')) {
    console.log('✓ SUCCESS: Collections column exists with "THE COLLECTION" link.');
} else {
    console.error('✗ FAILURE: Collections column or link is missing.');
    passed = false;
}

if (content.includes('HELP</h4>') && 
    content.includes('Help Centre') && 
    content.includes('Why Barefoot?') && 
    content.includes('Blogs') && 
    content.includes('Barefoot Science')) {
    console.log('✓ SUCCESS: HELP column exists with all 4 required links.');
} else {
    console.error('✗ FAILURE: HELP column links are missing or incorrect.');
    passed = false;
}

if (content.includes('COMPANY</h4>') && 
    content.includes('About Us') && 
    content.includes('Grievance Redressal') && 
    content.includes('Privacy Policy') && 
    content.includes('Terms Of Use') && 
    content.includes('Refund and Return Policy')) {
    console.log('✓ SUCCESS: COMPANY column exists with all 5 required links.');
} else {
    console.error('✗ FAILURE: COMPANY column links are missing or incorrect.');
    passed = false;
}

// 5. Check Contact Info & GPS
if (content.includes('+91 81300 96761') && content.includes('whatsapp_fd17f3f8-fa57-40a1-a924-aa104eb31b77.png')) {
    console.log('✓ SUCCESS: WhatsApp contact row and number (+91 81300 96761) are present.');
} else {
    console.error('✗ FAILURE: WhatsApp contact row or number is missing.');
    passed = false;
}

if (content.includes('care@rarabarefoot.in') && content.includes('email.png')) {
    console.log('✓ SUCCESS: Email contact row and address (care@rarabarefoot.in) are present.');
} else {
    console.error('✗ FAILURE: Email contact row or address is missing.');
    passed = false;
}

if (content.includes('AP2GP Pvt. Ltd.') && 
    content.includes('INDIRANAGAR') && 
    content.includes('gps.png')) {
    console.log('✓ SUCCESS: GPS/Address contact row and corporate address are present.');
} else {
    console.error('✗ FAILURE: GPS/Address contact row or corporate address is missing.');
    passed = false;
}

// 6. Check Copyright
if (content.includes('© 2026 - <a href="/">RARABAREFOOT</a> POWERED BY SHOPIFY') || 
    content.includes('© 2026 - <a href="/">RARABAREFOOT</a> POWERED BY SHOPIFY'.replace(/"/g, "'"))) {
    console.log('✓ SUCCESS: Copyright and Shopify credentials row exist.');
} else {
    console.error('✗ FAILURE: Copyright or Shopify credentials row is missing.');
    passed = false;
}

console.log('--- PREMIUM FOOTER VERIFICATION RESULT ---');
if (passed) {
    console.log('🎉 ALL PREMIUM FOOTER TESTS PASSED SUCCESSFULLY! 🎉');
} else {
    console.error('🚨 SOME PREMIUM FOOTER TESTS FAILED. PLEASE FIX THEM. 🚨');
}
process.exit(passed ? 0 : 1);
