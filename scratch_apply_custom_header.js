const fs = require('fs');
const path = require('path');

function applyCustomHeader() {
    const indexPath = path.join(__dirname, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        console.error('index.html not found!');
        return;
    }
    
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Find <x-header ... > ... </x-header>
    const headerStart = indexContent.indexOf('<x-header');
    const headerEnd = indexContent.indexOf('</x-header>', headerStart);
    
    if (headerStart === -1 || headerEnd === -1) {
        console.error('Could not find x-header in index.html!');
        return;
    }
    
    const customHeaderHtml = `
  <x-header class="header color-scheme color-scheme--scheme-2" style="padding: 0 !important; background-color: #f1f1f1 !important; border-bottom: 1px solid #e0e0e0 !important;">
    <div class="header-custom-container">
      <!-- Left: Logo -->
      <div class="logo-custom">
        <a href="/">
          <img src="https://www.rarabarefoot.in/cdn/shop/files/2_-_Copy_2.png?v=1747044324&width=1500" alt="rarabarefoot" class="header__logo-image-custom">
        </a>
      </div>

      <!-- Center: Navigation -->
      <div class="nav-center-custom">
        <a href="/collections/the-collection?gender=men" class="nav-link-custom">MEN</a>
        <a href="/collections/the-collection?gender=women" class="nav-link-custom">WOMEN</a>
        <a href="/pages/why-barefoot" class="nav-link-custom">WHY BAREFOOT</a>
      </div>

      <!-- Right: Secondary Navigation -->
      <div class="nav-right-custom">
        <!-- More Dropdown Wrapper -->
        <div class="dropdown-custom-wrapper">
          <a href="#" class="nav-link-custom dropdown-trigger-custom" onclick="return false;">MORE <span class="chevron-down-custom">▼</span></a>
          <ul class="dropdown-menu-custom">
            <li><a href="/pages/help" class="dropdown-link-custom">Help</a></li>
            <li><a href="/pages/barefoot-science" class="dropdown-link-custom">Barefoot Science</a></li>
            <li><a href="/pages/blogs" class="dropdown-link-custom">Blog</a></li>
          </ul>
        </div>
        <a href="/cart" aria-controls="cart-drawer" data-no-instant class="nav-link-custom">CART</a>
      </div>
    </div>
  </x-header>
  
  <style>
    /* Premium Clean Header Style matching screenshot exactly */
    .header-custom-container {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 18px 6% !important; /* Perfect luxury breathing padding */
      background-color: #f1f1f1 !important; /* Exact light gray color matching screenshot */
      box-sizing: border-box !important;
      min-height: 80px !important;
    }

    .logo-custom {
      display: flex !important;
      align-items: center !important;
      flex: 1 !important;
      justify-content: flex-start !important;
    }

    .header__logo-image-custom {
      height: 48px !important; /* Clean premium size matching screenshot */
      width: auto !important;
      display: block !important;
    }

    .nav-center-custom {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      flex: 2 !important;
      gap: 36px !important; /* Generous spacing as seen in the screenshot */
    }

    .nav-right-custom {
      display: flex !important;
      justify-content: flex-end !important;
      align-items: center !important;
      flex: 1 !important;
      gap: 32px !important;
    }

    .nav-link-custom {
      font-family: "Geist", sans-serif !important; /* Exact sans-serif geometric font */
      font-size: 13.5px !important; /* Clean elegant sizing */
      font-weight: 700 !important; /* Bold font weight matching screenshot */
      text-transform: uppercase !important;
      color: #000000 !important;
      letter-spacing: 0.08em !important; /* Clean tracking */
      text-decoration: none !important;
      transition: opacity 0.25s ease, color 0.25s ease !important;
    }

    .nav-link-custom:hover {
      color: #095492 !important; /* Touch of premium brand blue on hover */
      opacity: 0.8 !important;
    }

    /* --- MORE Dropdown Custom CSS --- */
    .dropdown-custom-wrapper {
      position: relative !important;
      display: inline-block !important;
    }

    .dropdown-trigger-custom {
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
    }

    .dropdown-menu-custom {
      position: absolute !important;
      top: 100% !important;
      right: 0 !important; /* Align dropdown to the right of More link */
      background-color: #ffffff !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
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
      text-transform: none !important; /* Classy casing */
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

    .dropdown-custom-wrapper:hover .chevron-down-custom {
      transform: rotate(180deg) !important;
    }

    /* Announcement Bar Color Matching Screenshot (Deep Purple / Indigo Charcoal) */
    #shopify-section-sections--19195979432110__announcement-bar .announcement-bar {
      background-color: #311c3c !important; /* Deep dark purple matching screenshot bar */
      color: #ffffff !important;
      padding: 8px 0 !important;
      font-size: 12px !important;
      letter-spacing: 0.08em !important;
    }

    /* Mobile Responsive Adaptation */
    @media screen and (max-width: 1024px) {
      .header-custom-container {
        padding: 14px 4% !important;
      }
      .nav-center-custom {
        gap: 20px !important;
      }
      .nav-right-custom {
        gap: 20px !important;
      }
    }

    @media screen and (max-width: 768px) {
      .nav-center-custom {
        display: none !important; /* Hide center menu on small mobile viewports, or keep a clean list */
      }
      .logo-custom {
        flex: 1 !important;
      }
      .nav-right-custom {
        flex: 1 !important;
        gap: 20px !important;
      }
      .header__logo-image-custom {
        height: 38px !important;
      }
    }
  </style>
`;
    
    const beforeHeader = indexContent.substring(0, headerStart);
    const afterHeader = indexContent.substring(headerEnd + '</x-header>'.length);
    
    const newIndexContent = beforeHeader + customHeaderHtml + afterHeader;
    
    fs.writeFileSync(indexPath, newIndexContent, 'utf8');
    console.log('Successfully applied EXACT screenshot-matching header design with MORE dropdown to index.html!');
}

applyCustomHeader();
