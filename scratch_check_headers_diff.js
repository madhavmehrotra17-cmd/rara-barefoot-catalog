const fs = require('fs');
const path = require('path');

function getHeader(filename) {
    const filePath = path.join(__dirname, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for <x-header ...> ... </x-header>
    const headerStart = content.indexOf('<x-header');
    if (headerStart === -1) {
        console.log(`${filename}: No <x-header> element found.`);
        return null;
    }
    
    // Find the matching </x-header>
    const headerEnd = content.indexOf('</x-header>', headerStart);
    if (headerEnd === -1) {
        console.log(`${filename}: No closing </x-header> found.`);
        return null;
    }
    
    const headerHtml = content.substring(headerStart, headerEnd + '</x-header>'.length);
    console.log(`${filename} x-header length: ${headerHtml.length} characters.`);
    return headerHtml;
}

const indexHeader = getHeader('index.html');
const productHeader = getHeader('product.html');

if (indexHeader && productHeader) {
    fs.writeFileSync(path.join(__dirname, 'index_header.html'), indexHeader, 'utf8');
    fs.writeFileSync(path.join(__dirname, 'product_header.html'), productHeader, 'utf8');
    console.log('Headers saved to index_header.html and product_header.html');
    
    // Compare them
    if (indexHeader === productHeader) {
        console.log('The headers are EXACTLY identical!');
    } else {
        console.log('The headers are DIFFERENT.');
        console.log('index.html header preview (first 300 chars):');
        console.log(indexHeader.substring(0, 300));
        console.log('product.html header preview (first 300 chars):');
        console.log(productHeader.substring(0, 300));
    }
}
