const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', '..');
const dirs = ['rara-true-clone', 'rara-clone', 'rarabarefoot', 'clone'];

dirs.forEach(d => {
    const indexPath = path.join(baseDir, d, 'index.html');
    if (fs.existsSync(indexPath)) {
        const stat = fs.statSync(indexPath);
        console.log(`Found index.html in directory: ${d}`);
        console.log(`  Size: ${stat.size} bytes`);
        console.log(`  Last modified: ${stat.mtime}`);
        
        // Check what header it currently contains
        const content = fs.readFileSync(indexPath, 'utf8');
        if (content.includes('logo-custom')) {
            console.log("  Header Type: Custom Header (logo-custom present)");
        } else if (content.includes('header__primary-nav')) {
            console.log("  Header Type: Native Header (header__primary-nav present)");
        } else {
            console.log("  Header Type: Unknown");
        }
    } else {
        console.log(`No index.html found in: ${d}`);
    }
});
