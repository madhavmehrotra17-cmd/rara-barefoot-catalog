const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Find styles referring to custom header elements
const queries = ['.dropdown-custom-wrapper', '.dropdown-menu-custom', '.header-custom-container', '.nav-link-custom'];
queries.forEach(q => {
    let idx = 0;
    while ((idx = content.indexOf(q, idx)) !== -1) {
        console.log(`Found '${q}' at index: ${idx}`);
        // Find enclosing <style> tags if any
        const startStyle = content.substring(0, idx).lastIndexOf('<style>');
        const endStyle = content.indexOf('</style>', idx);
        console.log(`Enclosing style tag start: ${startStyle}, end: ${endStyle}`);
        if (startStyle !== -1 && endStyle !== -1) {
            console.log('--- ENCLOSING STYLE BLOCK ---');
            console.log(content.substring(startStyle, endStyle + '</style>'.length));
        } else {
            console.log('No enclosing style tag found or it is far away.');
        }
        console.log('==================================================');
        break; // Only show first occurrence for each query
    }
});
