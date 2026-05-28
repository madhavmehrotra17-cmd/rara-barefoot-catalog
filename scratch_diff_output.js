const fs = require('fs');
const path = require('path');

const indexHeader = fs.readFileSync(path.join(__dirname, 'index_header.html'), 'utf8');
const productHeader = fs.readFileSync(path.join(__dirname, 'product_header.html'), 'utf8');

if (indexHeader === productHeader) {
    console.log("EXACTLY IDENTICAL");
} else {
    const indexLines = indexHeader.split('\n');
    const productLines = productHeader.split('\n');
    
    console.log(`Index lines: ${indexLines.length}, Product lines: ${productLines.length}`);
    
    for (let i = 0; i < Math.max(indexLines.length, productLines.length); i++) {
        const idxLine = indexLines[i] || '';
        const prdLine = productLines[i] || '';
        if (idxLine.trim() !== prdLine.trim()) {
            console.log(`Line ${i + 1} differs:`);
            console.log(`  Index  : ${idxLine.trim()}`);
            console.log(`  Product: ${prdLine.trim()}`);
        }
    }
}
