const fs = require('fs');

const html = fs.readFileSync('product.html', 'utf8');

console.log('ultimate-fix present:', html.includes('id="ultimate-fix"'));
console.log('rara-ultimate-style present:', html.includes('id="rara-ultimate-style"'));
console.log('ultimate-script present:', html.includes('id="rara-ultimate-script"'));
