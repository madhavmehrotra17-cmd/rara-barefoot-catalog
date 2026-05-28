const fs = require('fs');
const path = require('path');

function run() {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const backupPath = path.join(__dirname, '..', 'index.html.bak_norda');

    if (!fs.existsSync(backupPath)) {
        console.error("Backup index.html.bak_norda not found!");
        return;
    }

    // Revert to backup first for a clean state
    let indexHtml = fs.readFileSync(backupPath, 'utf8');
    console.log("Successfully reverted index.html to backup state.");

    // 1. Locate `<x-header` and `</x-header>` inside the backup
    const startSearch = '<x-header';
    const startIdx = indexHtml.indexOf(startSearch);
    let endIdx = -1;
    if (startIdx !== -1) {
        endIdx = indexHtml.indexOf('</x-header>', startIdx) + '</x-header>'.length;
        console.log(`Inner header boundaries - start: ${startIdx}, end: ${endIdx}`);
    } else {
        console.error("Could not find inner x-header in index.html!");
        return;
    }

    // 2. Build the new Norda-style inner header HTML
    const nordaHeaderHtml = `<header class="norda-header">
      <!-- Left: Logo -->
      <div class="header-logo">
        <a href="/">
          <img src="https://www.rarabarefoot.in/cdn/shop/files/2_-_Copy_2.png?v=1747044324&width=375" alt="Rara Barefoot Logo">
        </a>
      </div>

      <!-- Center: Navigation -->
      <nav class="header-nav">
        <a href="/collections/the-collection?gender=men">Men</a>
        <a href="/collections/the-collection?gender=women">Women</a>
        <a href="/pages/why-barefoot">Why Barefoot</a>
      </nav>

      <!-- Right: Secondary Navigation -->
      <div class="header-actions">
        <!-- More Dropdown Wrapper -->
        <div class="dropdown-custom-wrapper">
          <a href="#" class="dropdown-trigger-custom" onclick="return false;">MORE <span class="chevron-down-custom">▼</span></a>
          <ul class="dropdown-menu-custom">
            <li><a href="/pages/help" class="dropdown-link-custom">Help</a></li>
            <li><a href="/pages/barefoot-science" class="dropdown-link-custom">Barefoot science</a></li>
            <li><a href="/pages/blogs" class="dropdown-link-custom">Blog</a></li>
          </ul>
        </div>
        <a href="/cart" aria-controls="cart-drawer" data-no-instant>Cart</a>
      </div>
    </header>`;

    // 3. Inject CSS styles into the outer `<style>` tag
    // The style tag is located right inside `<header id="shopify-section-sections--19195979432110__header"`
    const outerHeaderId = 'id="shopify-section-sections--19195979432110__header"';
    const outerHeaderIdx = indexHtml.indexOf(outerHeaderId);
    if (outerHeaderIdx === -1) {
        console.error("Could not find outer header container!");
        return;
    }

    const styleEndIdx = indexHtml.indexOf('</style>', outerHeaderIdx);
    if (styleEndIdx === -1) {
        console.error("Could not find closing style tag of outer header container!");
        return;
    }

    const dropdownCSS = `
    /* --- MORE Dropdown Custom CSS for Layout B --- */
    .dropdown-custom-wrapper {
      position: relative !important;
      display: inline-block !important;
    }

    .dropdown-trigger-custom {
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
      text-decoration: none !important;
      color: #000000 !important;
      font-size: 13.5px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.08em !important;
      transition: color 0.25s ease, opacity 0.25s ease !important;
      font-family: "Geist", sans-serif !important;
    }

    .dropdown-trigger-custom:hover {
      color: #095492 !important;
      opacity: 0.8 !important;
    }

    .dropdown-menu-custom {
      position: absolute !important;
      top: 100% !important;
      right: 0 !important;
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

    /* Top invisible bridge to prevent dropdown from closing on hover gap */
    .dropdown-custom-wrapper::after {
      content: '' !important;
      position: absolute !important;
      top: 100% !important;
      left: 0 !important;
      width: 100% !important;
      height: 15px !important;
    }

    .dropdown-custom-wrapper:hover .dropdown-menu-custom {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateY(0) !important;
    }

    .dropdown-link-custom {
      display: block !important;
      padding: 10px 20px !important;
      font-family: "Geist", sans-serif !important;
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
      color: #095492 !important;
    }

    .chevron-down-custom {
      font-size: 7px !important;
      margin-left: 6px !important;
      display: inline-block !important;
      transition: transform 0.25s ease !important;
      vertical-align: middle !important;
    }

    .dropdown-custom-wrapper:hover .chevron-down-custom {
      transform: rotate(180deg) !important;
    }

    /* Norda-style Premium Header scoping */
    .norda-header {
      background-color: #f1f1f1 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 0 6% !important;
      height: 80px !important;
      box-sizing: border-box !important;
      border-bottom: 1px solid #e0e0e0 !important;
      width: 100% !important;
    }

    .norda-header .header-logo {
      display: flex !important;
      align-items: center !important;
      flex: 1 !important;
      justify-content: flex-start !important;
    }

    .norda-header .header-logo img {
      height: 48px !important;
      width: auto !important;
      object-fit: contain !important;
      display: block !important;
    }

    .norda-header .header-nav {
      display: flex !important;
      gap: 36px !important;
      align-items: center !important;
      justify-content: center !important;
      flex: 2 !important;
    }

    .norda-header .header-nav a {
      text-decoration: none !important;
      color: #000000 !important;
      font-size: 13.5px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.08em !important;
      transition: color 0.25s ease, opacity 0.25s ease !important;
      font-family: "Geist", sans-serif !important;
    }

    .norda-header .header-nav a:hover {
      color: #095492 !important;
      opacity: 0.8 !important;
    }

    .norda-header .header-actions {
      display: flex !important;
      gap: 32px !important;
      align-items: center !important;
      justify-content: flex-end !important;
      flex: 1 !important;
    }

    .norda-header .header-actions > a {
      text-decoration: none !important;
      color: #000000 !important;
      font-size: 13.5px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.08em !important;
      transition: color 0.25s ease, opacity 0.25s ease !important;
      font-family: "Geist", sans-serif !important;
    }

    .norda-header .header-actions > a:hover {
      color: #095492 !important;
      opacity: 0.8 !important;
    }

    /* Mobile Responsive Adaptation */
    @media screen and (max-width: 768px) {
      .norda-header {
        height: 80px !important;
        padding: 0 5% !important;
      }
      .norda-header .header-nav {
        display: none !important;
      }
      .norda-header .header-logo {
        flex: 1 !important;
      }
      .norda-header .header-actions {
        flex: 1 !important;
        gap: 20px !important;
      }
    }
    `;

    // 4. Inject styles and perform inner tag replacement
    const beforeStyle = indexHtml.substring(0, styleEndIdx);
    const afterStyle = indexHtml.substring(styleEndIdx);
    let updatedIndexHtml = beforeStyle + dropdownCSS + afterStyle;

    // The startIdx and endIdx will have shifted slightly due to style injection, so locate them again in updatedIndexHtml
    const newStartIdx = updatedIndexHtml.indexOf(startSearch);
    const newEndIdx = updatedIndexHtml.indexOf('</x-header>', newStartIdx) + '</x-header>'.length;

    const beforeHeader = updatedIndexHtml.substring(0, newStartIdx);
    const afterHeader = updatedIndexHtml.substring(newEndIdx);

    const finalHtml = beforeHeader + nordaHeaderHtml + afterHeader;

    fs.writeFileSync(indexPath, finalHtml, 'utf8');
    console.log("Successfully implemented perfectly balanced Norda-style Layout B with MORE dropdown!");
}

run();
