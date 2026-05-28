const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, '..', 'collection.html');
const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- STANDARDIZING PRODUCT DETAIL PAGE ---');

if (!fs.existsSync(collectionPath)) {
  console.error('Error: collection.html not found!');
  process.exit(1);
}
if (!fs.existsSync(productPath)) {
  console.error('Error: product.html not found! Run fetch_product_template.js first.');
  process.exit(1);
}

const collectionHtml = fs.readFileSync(collectionPath, 'utf8');
let productHtml = fs.readFileSync(productPath, 'utf8');

// 1. Extract style and script blocks from collection.html
const ultimateFixMatch = collectionHtml.match(/<style id="ultimate-fix">([\s\S]*?)<\/style>/i);
const ultimateStyleMatch = collectionHtml.match(/<style id="rara-ultimate-style">([\s\S]*?)<\/style>/i);
const ultimateScriptMatch = collectionHtml.match(/<script id="rara-ultimate-script">([\s\S]*?)<\/script>/i);

let blocksToInject = '\n';

if (ultimateFixMatch) {
  console.log('[EXTRACTED] <style id="ultimate-fix">');
  blocksToInject += ultimateFixMatch[0] + '\n';
} else {
  console.log('[WARNING] <style id="ultimate-fix"> not found in collection.html');
}

if (ultimateStyleMatch) {
  console.log('[EXTRACTED] <style id="rara-ultimate-style">');
  blocksToInject += ultimateStyleMatch[0] + '\n';
} else {
  console.log('[WARNING] <style id="rara-ultimate-style"> not found in collection.html');
}

if (ultimateScriptMatch) {
  console.log('[EXTRACTED] <script id="rara-ultimate-script">');
  blocksToInject += ultimateScriptMatch[0] + '\n';
} else {
  console.log('[WARNING] <script id="rara-ultimate-script"> not found in collection.html');
}

// 2. Inject extracted blocks right before </head> in product.html
if (productHtml.includes('</head>')) {
  productHtml = productHtml.replace('</head>', `${blocksToInject}</head>`);
  console.log('[SUCCESS] Injected custom styling and script blocks before </head>');
} else {
  console.error('Error: </head> tag not found in product.html!');
  process.exit(1);
}

// 3. Apply ACCESSORIES navigation overrides in product.html
// Desktop nav replacement
const desktopTarget = '<li class="header__primary-nav-item" data-title="THE COLLECTION">\n    <a href="/collections/the-collection" class="block h6" style="padding-right: 15px;">THE COLLECTION</a>\n  </li><li class="header__primary-nav-item" data-title="WHY BAREFOOT?"><a href="/pages/why-barefoot" class="block h6" >WHY BAREFOOT?</a></li>';
const desktopReplacement = '<li class="header__primary-nav-item" data-title="THE COLLECTION">\n    <a href="/collections/the-collection" class="block h6" style="padding-right: 15px;">THE COLLECTION</a>\n  </li><li class="header__primary-nav-item" data-title="ACCESSORIES">\n    <a href="#" class="block h6" style="padding-right: 15px;">ACCESSORIES</a>\n  </li><li class="header__primary-nav-item" data-title="WHY BAREFOOT?"><a href="/pages/why-barefoot" class="block h6" >WHY BAREFOOT?</a></li>';

// Mobile nav replacement
const mobileTarget = '<li><a href="/collections/the-collection" class="header-sidebar__linklist-button h6">THE COLLECTION</a></li><li><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-3" aria-expanded="false">WHY BAREFOOT?';
const mobileReplacement = '<li><a href="/collections/the-collection" class="header-sidebar__linklist-button h6">THE COLLECTION</a></li><li><a href="#" class="header-sidebar__linklist-button h6">ACCESSORIES</a></li><li><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-3" aria-expanded="false">WHY BAREFOOT?';

// We also support whitespace-insensitive replacements if direct string match fails
let navUpdated = false;

if (productHtml.includes(desktopTarget)) {
  productHtml = productHtml.replace(desktopTarget, desktopReplacement);
  console.log('[SUCCESS] Applied desktop ACCESSORIES navigation links');
  navUpdated = true;
} else {
  // Let's do a regex based replacement for desktop nav
  const desktopRegex = /<li[^>]*data-title="THE COLLECTION"[\s\S]*?<\/li>\s*<li[^>]*data-title="WHY BAREFOOT?"[\s\S]*?<\/li>/gi;
  if (desktopRegex.test(productHtml)) {
    const matched = productHtml.match(desktopRegex)[0];
    const updated = matched.replace('WHY BAREFOOT?', 'ACCESSORIES</a></li><li class="header__primary-nav-item" data-title="WHY BAREFOOT?"><a href="/pages/why-barefoot" class="block h6" >WHY BAREFOOT?');
    // Wait, let's make it cleaner
    const cleanReplacement = '<li class="header__primary-nav-item" data-title="THE COLLECTION">\n    <a href="/collections/the-collection" class="block h6" style="padding-right: 15px;">THE COLLECTION</a>\n  </li><li class="header__primary-nav-item" data-title="ACCESSORIES">\n    <a href="#" class="block h6" style="padding-right: 15px;">ACCESSORIES</a>\n  </li><li class="header__primary-nav-item" data-title="WHY BAREFOOT?"><a href="/pages/why-barefoot" class="block h6" >WHY BAREFOOT?</a></li>';
    productHtml = productHtml.replace(desktopRegex, cleanReplacement);
    console.log('[SUCCESS] Applied desktop ACCESSORIES navigation links via regex');
    navUpdated = true;
  } else {
    console.log('[WARNING] Desktop nav target not found in product.html');
  }
}

if (productHtml.includes(mobileTarget)) {
  productHtml = productHtml.replace(mobileTarget, mobileReplacement);
  console.log('[SUCCESS] Applied mobile ACCESSORIES navigation links');
  navUpdated = true;
} else {
  const mobileRegex = /<li><a href="\/collections\/the-collection"[^>]*>THE COLLECTION<\/a><\/li><li><button[^>]*aria-controls="header-panel-[^"]*"[^>]*>WHY BAREFOOT\?/gi;
  if (mobileRegex.test(productHtml)) {
    const matched = productHtml.match(mobileRegex)[0];
    const cleanMobileReplacement = '<li><a href="/collections/the-collection" class="header-sidebar__linklist-button h6">THE COLLECTION</a></li><li><a href="#" class="header-sidebar__linklist-button h6">ACCESSORIES</a></li><li><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-3" aria-expanded="false">WHY BAREFOOT?';
    productHtml = productHtml.replace(mobileRegex, cleanMobileReplacement);
    console.log('[SUCCESS] Applied mobile ACCESSORIES navigation links via regex');
    navUpdated = true;
  } else {
    console.log('[WARNING] Mobile nav target not found in product.html');
  }
}

// 4. Save standardized product.html
fs.writeFileSync(productPath, productHtml, 'utf8');
console.log('[SUCCESS] Saved standardized product.html successfully!');
