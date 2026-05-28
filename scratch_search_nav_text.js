const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.gemini')) {
                results = results.concat(walk(filePath));
            }
        } else {
            if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.txt')) {
                results.push(filePath);
            }
        }
    });
    return results;
}

const allFiles = walk('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch');
console.log(`Total files to search: ${allFiles.length}`);

allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lowerContent = content.toLowerCase();
    
    // Check if it has MEN, WOMEN, WHY BAREFOOT, HELP, CART
    if (lowerContent.includes('why barefoot') && lowerContent.includes('help') && lowerContent.includes('cart')) {
        // Let's also check if it contains men and women
        if (lowerContent.includes('men') && lowerContent.includes('women')) {
            console.log(`FOUND MATCH IN: ${filePath}`);
            const idx = lowerContent.indexOf('why barefoot');
            console.log(content.substring(Math.max(0, idx - 300), Math.min(content.length, idx + 500)));
            console.log('========================================================================');
        }
    }
});
