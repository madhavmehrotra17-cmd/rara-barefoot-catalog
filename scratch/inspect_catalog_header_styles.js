const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'catalog.html'), 'utf8');

// Find all css rules in <style> block that reference header, nav, or actions
const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
console.log("--- Header Styles in catalog.html ---");
while ((match = regex.exec(content)) !== null) {
    const css = match[1];
    if (css.includes('header-nav') || css.includes('header-logo') || css.includes('header-actions')) {
        console.log(css);
        console.log('==================================================');
    }
}
