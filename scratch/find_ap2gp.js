const fs = require('fs');
const path = require('path');

const files = ['about.html', 'mens.html', 'womens.html', 'index.html', 'product.html', 'why-barefoot.html', 'community.html', 'blogs.html', 'cart.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('AP2GP') || content.includes('care@rarabarefoot.in')) {
            console.log(`FOUND in ${file}!`);
            const idx = content.indexOf('care@rarabarefoot.in');
            console.log(content.substring(idx - 1000, idx + 2000));
        }
    }
});
