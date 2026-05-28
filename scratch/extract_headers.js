const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, '..', 'collection.html');
const productPath = path.join(__dirname, '..', 'product.html');

const collectionHtml = fs.readFileSync(collectionPath, 'utf8');
const productHtml = fs.readFileSync(productPath, 'utf8');

// Find height-observer block in collection.html
const startTag = '<height-observer variable="header">';
const endTag = '</header-sidebar>';

const colStartIdx = collectionHtml.indexOf(startTag);
const colEndIdx = collectionHtml.indexOf(endTag) + endTag.length;

if (colStartIdx === -1 || colEndIdx === -1) {
  console.error('Could not find header boundaries in collection.html');
  process.exit(1);
}

const collectionHeaderContent = collectionHtml.substring(colStartIdx, colEndIdx);
console.log(`Extracted header content from collection.html (length: ${collectionHeaderContent.length})`);

// Find height-observer block in product.html
const prodStartIdx = productHtml.indexOf(startTag);
const prodEndIdx = productHtml.indexOf(endTag) + endTag.length;

if (prodStartIdx === -1 || prodEndIdx === -1) {
  console.error('Could not find header boundaries in product.html');
  process.exit(1);
}

console.log(`Product header content to replace (length: ${prodEndIdx - prodStartIdx})`);

// Replace in product.html
const updatedProductHtml = productHtml.substring(0, prodStartIdx) + collectionHeaderContent + productHtml.substring(prodEndIdx);

fs.writeFileSync(productPath, updatedProductHtml, 'utf8');
console.log('Successfully copied standardized header from collection.html to product.html!');
