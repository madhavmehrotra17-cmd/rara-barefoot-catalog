const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const productFile = path.join(dir, 'product.html');

if (fs.existsSync(productFile)) {
    const content = fs.readFileSync(productFile, 'utf8');
    console.log('Size of product.html:', content.length, 'bytes');
    
    // Find all sections or big blocks
    const sectionRegex = /<section[\s\S]*?<\/section>/gi;
    let m;
    let count = 0;
    while ((m = sectionRegex.exec(content)) !== null) {
        count++;
        const text = m[0];
        console.log(`\n=================== product.html: SECTION ${count} ===================`);
        console.log('ID:', text.match(/id="([^"]+)"/) ? text.match(/id="([^"]+)"/)[1] : 'No ID');
        console.log('Class:', text.match(/class="([^"]+)"/) ? text.match(/class="([^"]+)"/)[1] : 'No Class');
        console.log('Length:', text.length, 'characters');
        console.log('Preview:', text.substring(0, 300) + '...\n');
    }
} else {
    console.log('product.html not found');
}
