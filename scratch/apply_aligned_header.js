const fs = require('fs');
const path = require('path');

function run() {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const productPath = path.join(__dirname, '..', 'product.html');

    if (!fs.existsSync(indexPath) || !fs.existsSync(productPath)) {
        console.error("Error: index.html or product.html does not exist!");
        return;
    }

    const indexHtml = fs.readFileSync(indexPath, 'utf8');
    const productHtml = fs.readFileSync(productPath, 'utf8');

    // 1. Locate custom liquid section in index.html to remove
    const liquidId = 'shopify-section-sections--19195979432110__custom_liquid_r7AL7G';
    const liquidIdx = indexHtml.indexOf(liquidId);
    let liquidStart = -1;
    let liquidEnd = -1;

    if (liquidIdx !== -1) {
        liquidStart = indexHtml.substring(0, liquidIdx).lastIndexOf('<section');
        liquidEnd = indexHtml.indexOf('</section>', liquidIdx) + '</section>'.length;
        console.log(`Found custom liquid section from index ${liquidStart} to ${liquidEnd}`);
    } else {
        console.log("Custom liquid section not found. Proceeding without deleting it.");
    }

    // 2. Locate header section in index.html to replace
    const headerSearch = '<header id="shopify-section-sections--19195979432110__header"';
    const indexHeaderStart = indexHtml.indexOf(headerSearch);
    let indexHeaderEnd = -1;
    if (indexHeaderStart !== -1) {
        indexHeaderEnd = indexHtml.indexOf('</x-header>', indexHeaderStart) + '</x-header>'.length;
        console.log(`Found old index header from index ${indexHeaderStart} to ${indexHeaderEnd}`);
    } else {
        console.error("Error: Could not find header section in index.html!");
        return;
    }

    // 3. Extract the native header section from product.html
    const prodHeaderStart = productHtml.indexOf(headerSearch);
    let prodHeaderEnd = -1;
    if (prodHeaderStart !== -1) {
        prodHeaderEnd = productHtml.indexOf('</x-header>', prodHeaderStart) + '</x-header>'.length;
    } else {
        console.error("Error: Could not find header section in product.html!");
        return;
    }

    let extractedHeader = productHtml.substring(prodHeaderStart, prodHeaderEnd);
    console.log(`Extracted native header from product.html (${extractedHeader.length} characters)`);

    // 4. Inject the MORE dropdown into primary nav block
    const oldPrimaryNav = '<li class="header__primary-nav-item" data-title="WHY BAREFOOT?"><a href="/pages/why-barefoot" class="block h6" >WHY BAREFOOT?</a></li></ul>';
    
    // We will style the MORE trigger link nicely as inline-flex with chevron and identical fonts, and support the dropdown styles
    const newPrimaryNav = `<li class="header__primary-nav-item" data-title="WHY BAREFOOT?"><a href="/pages/why-barefoot" class="block h6" style="padding-right: 15px;">WHY BAREFOOT?</a></li>
              <li class="header__primary-nav-item dropdown-nav" data-title="MORE">
                <a href="#" class="block h6 dropdown-trigger" style="cursor: default; display: inline-flex; align-items: center;">MORE <span class="chevron-down-custom">▼</span></a>
                <ul class="dropdown-menu-custom">
                  <li><a href="/pages/help" class="dropdown-link-custom">Help</a></li>
                  <li><a href="/pages/barefoot-science" class="dropdown-link-custom">Barefoot science</a></li>
                  <li><a href="/pages/blogs" class="dropdown-link-custom">Blog</a></li>
                </ul>
              </li></ul>`;

    if (extractedHeader.includes(oldPrimaryNav)) {
        extractedHeader = extractedHeader.replace(oldPrimaryNav, newPrimaryNav);
        console.log("Successfully injected MORE dropdown markup into primary nav.");
    } else {
        // Fallback search with slightly different whitespaces if any
        const fallbackTarget = 'WHY BAREFOOT?</a></li></ul>';
        if (extractedHeader.includes(fallbackTarget)) {
            const replacement = `WHY BAREFOOT?</a></li>
              <li class="header__primary-nav-item dropdown-nav" data-title="MORE">
                <a href="#" class="block h6 dropdown-trigger" style="cursor: default; display: inline-flex; align-items: center;">MORE <span class="chevron-down-custom">▼</span></a>
                <ul class="dropdown-menu-custom">
                  <li><a href="/pages/help" class="dropdown-link-custom">Help</a></li>
                  <li><a href="/pages/barefoot-science" class="dropdown-link-custom">Barefoot science</a></li>
                  <li><a href="/pages/blogs" class="dropdown-link-custom">Blog</a></li>
                </ul>
              </li></ul>`;
            extractedHeader = extractedHeader.replace(fallbackTarget, replacement);
            console.log("Injected MORE dropdown using fallback replacement.");
        } else {
            console.error("Error: Could not find target nav items to inject MORE dropdown!");
            return;
        }
    }

    // 5. Inject CSS styles into the header's <style> tag
    const styleEndTag = '</style>';
    const firstStyleEnd = extractedHeader.indexOf(styleEndTag);
    if (firstStyleEnd !== -1) {
        const dropdownCSS = `
    /* --- MORE Dropdown Custom CSS for perfect alignment and smooth transitions --- */
    .dropdown-nav {
      position: relative !important;
    }

    .dropdown-trigger {
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
    }

    .dropdown-menu-custom {
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      background-color: #ffffff !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
      border-radius: 8px !important;
      padding: 12px 0 !important;
      margin: 12px 0 0 0 !important;
      list-style: none !important;
      min-width: 180px !important;
      z-index: 100000 !important;
      opacity: 0 !important;
      visibility: hidden !important;
      transform: translateY(12px) !important;
      transition: opacity 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), 
                  transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), 
                  visibility 0.25s !important;
    }

    /* Invisible hover bridge to close the gap between trigger and menu */
    .dropdown-nav::after {
      content: '' !important;
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      width: 100% !important;
      height: 15px !important;
    }

    .dropdown-nav:hover .dropdown-menu-custom {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
    }

    .dropdown-link-custom {
      display: block !important;
      padding: 10px 20px !important;
      font-family: inherit !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      color: #333333 !important;
      text-decoration: none !important;
      text-align: left !important;
      text-transform: none !important;
      transition: background-color 0.2s ease, color 0.2s ease !important;
    }

    .dropdown-link-custom:hover {
      background-color: #f5f5f5 !important;
      color: #095492 !important; /* Premium brand blue highlight */
    }

    .chevron-down-custom {
      font-size: 7px !important;
      margin-left: 6px !important;
      display: inline-block !important;
      transition: transform 0.25s ease !important;
      vertical-align: middle !important;
    }

    .dropdown-nav:hover .chevron-down-custom {
      transform: rotate(180deg) !important;
    }
    `;

        const beforeStyleClose = extractedHeader.substring(0, firstStyleEnd);
        const afterStyleClose = extractedHeader.substring(firstStyleEnd);
        extractedHeader = beforeStyleClose + dropdownCSS + afterStyleClose;
        console.log("Successfully injected custom dropdown styles into header style tag.");
    } else {
        console.error("Error: Could not find style closing tag to inject custom CSS!");
        return;
    }

    // 6. Build final html content
    let finalHtml = "";
    if (liquidStart !== -1) {
        // If we found the custom liquid section, replace from liquidStart to indexHeaderEnd
        const beforeBlock = indexHtml.substring(0, liquidStart);
        const afterBlock = indexHtml.substring(indexHeaderEnd);
        finalHtml = beforeBlock + extractedHeader + afterBlock;
    } else {
        // Otherwise just replace the header
        const beforeBlock = indexHtml.substring(0, indexHeaderStart);
        const afterBlock = indexHtml.substring(indexHeaderEnd);
        finalHtml = beforeBlock + extractedHeader + afterBlock;
    }

    // Back up index.html first
    fs.writeFileSync(path.join(__dirname, '..', 'index.html.bak_dropdown'), indexHtml, 'utf8');
    console.log("Backup of index.html written to index.html.bak_dropdown");

    // Write final content
    fs.writeFileSync(indexPath, finalHtml, 'utf8');
    console.log("Successfully aligned header and implemented MORE dropdown in index.html!");
}

run();
