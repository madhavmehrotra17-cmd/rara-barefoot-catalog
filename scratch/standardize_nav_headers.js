const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, '..', 'collection.html');
const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- STANDARDIZING NAVIGATION MENUS ---');

const collectionHtml = fs.readFileSync(collectionPath, 'utf8');
let productHtml = fs.readFileSync(productPath, 'utf8');

// 1. Extract and replace x-header
const headerRegex = /<x-header[\s\S]*?<\/x-header>/i;
const collectionHeaderMatch = collectionHtml.match(headerRegex);

if (collectionHeaderMatch) {
  const collectionHeader = collectionHeaderMatch[0];
  if (headerRegex.test(productHtml)) {
    productHtml = productHtml.replace(headerRegex, collectionHeader);
    console.log('[SUCCESS] Replaced x-header in product.html with collection.html header');
  } else {
    console.log('[WARNING] Could not find <x-header> tag in product.html');
  }
} else {
  console.log('[WARNING] Could not find <x-header> tag in collection.html');
}

// 2. Extract and replace header-sidebar
const sidebarRegex = /<header-sidebar id="sidebar-menu"[\s\S]*?<\/header-sidebar>/i;
const collectionSidebarMatch = collectionHtml.match(sidebarRegex);

if (collectionSidebarMatch) {
  const collectionSidebar = collectionSidebarMatch[0];
  if (sidebarRegex.test(productHtml)) {
    productHtml = productHtml.replace(sidebarRegex, collectionSidebar);
    console.log('[SUCCESS] Replaced sidebar-menu in product.html with collection.html sidebar-menu');
  } else {
    console.log('[WARNING] Could not find <header-sidebar id="sidebar-menu"> tag in product.html');
  }
} else {
  console.log('[WARNING] Could not find <header-sidebar id="sidebar-menu"> tag in collection.html');
}

fs.writeFileSync(productPath, productHtml, 'utf8');
console.log('[SUCCESS] Navigation headers standardized and saved successfully!');
