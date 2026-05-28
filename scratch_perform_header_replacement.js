const fs = require('fs');
const path = require('path');

function replaceHeader() {
    const indexPath = path.join(__dirname, 'index.html');
    const productPath = path.join(__dirname, 'product.html');
    
    if (!fs.existsSync(indexPath) || !fs.existsSync(productPath)) {
        console.error('index.html or product.html not found!');
        return;
    }
    
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const productContent = fs.readFileSync(productPath, 'utf8');
    
    // Extract x-header from product.html
    const prodStart = productContent.indexOf('<x-header');
    const prodEnd = productContent.indexOf('</x-header>', prodStart);
    
    if (prodStart === -1 || prodEnd === -1) {
        console.error('Could not find x-header in product.html!');
        return;
    }
    
    const productHeaderHtml = productContent.substring(prodStart, prodEnd + '</x-header>'.length);
    console.log(`Extracted product x-header of length ${productHeaderHtml.length} characters.`);
    
    // Locate x-header in index.html
    const indexStart = indexContent.indexOf('<x-header');
    const indexEnd = indexContent.indexOf('</x-header>', indexStart);
    
    if (indexStart === -1 || indexEnd === -1) {
        console.error('Could not find x-header in index.html!');
        return;
    }
    
    const beforeHeader = indexContent.substring(0, indexStart);
    const afterHeader = indexContent.substring(indexEnd + '</x-header>'.length);
    
    const newIndexContent = beforeHeader + productHeaderHtml + afterHeader;
    
    // Make a backup just in case
    fs.writeFileSync(path.join(__dirname, 'index.html.bak_header'), indexContent, 'utf8');
    console.log('Backup of index.html saved to index.html.bak_header');
    
    // Write new index.html
    fs.writeFileSync(indexPath, newIndexContent, 'utf8');
    console.log('Successfully updated index.html header with product.html header!');
}

replaceHeader();
