const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the product card gradient completely
    content = content.replace(/background:\s*linear-gradient\(180deg,\s*#FFFFFF\s*0%,\s*rgba\(255,255,255,0\)\s*45%\)\s*!important;/g, 'background: transparent !important;');
    
    // Also remove the old custom injected block that was near the body if it conflicts, but let's just make the gradient transparent for safety.
    content = content.replace(/\.card__media::after,\s*\.product-card__media::after,\s*\.card-wrapper\s+\.media::after\s*\{[^}]*\}/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed gradient in', file);
});
