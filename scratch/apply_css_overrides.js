const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetCSSMarker = 'CINEMATIC FULL-BLEED SLIDER WITH VERTICAL THUMBNAILS';
const startIdx = content.indexOf(targetCSSMarker);

if (startIdx === -1) {
  console.error('[ERROR] Could not find Cinematic Slider CSS marker!');
  process.exit(1);
}

// Find comment block start
const commentStartIdx = content.lastIndexOf('/* ==========================================================================', startIdx);
// Find ultimate style end tag
const styleEndIdx = content.indexOf('</style>', startIdx);

if (commentStartIdx === -1 || styleEndIdx === -1) {
  console.error('[ERROR] Could not find ultimate style bounds!');
  process.exit(1);
}

console.log('Replacing CSS block from index', commentStartIdx, 'to', styleEndIdx);

const newStyleOverrides = `
/* ==========================================================================
   CINEMATIC FULL-BLEED SLIDER WITH VERTICAL THUMBNAILS & STICKY ASYMMETRIC SCROLL
   ========================================================================== */
@media screen and (min-width: 1000px) {
  #shopify-section-template--19195983724718__main {
    /* 2-Column layout: 54% Left (Product Gallery), 46% Right (All Info blocks) */
    --product-grid: "product-gallery product-info" auto / minmax(0, 0.54fr) minmax(0, 0.46fr) !important;
  }
  
  .product {
    display: grid !important;
    grid-template-columns: minmax(0, 0.54fr) minmax(0, 0.46fr) !important;
    gap: 40px !important;
    align-items: start !important;
    width: 100% !important;
  }
  
  /* Left Side: Product Gallery stays perfectly sticky/static on scroll */
  .product-gallery {
    grid-area: product-gallery !important;
    display: grid !important;
    grid-template-columns: 70px 1fr !important;
    gap: 20px !important;
    align-items: start !important;
    width: 100% !important;
    position: sticky !important;
    top: calc(var(--header-height, 80px) + 24px) !important;
    align-self: start !important;
    z-index: 3 !important;
  }

  /* Right Side: Product Info scrolls naturally */
  .product-info {
    grid-area: product-info !important;
    position: relative !important;
    top: auto !important;
    align-self: start !important;
    height: auto !important;
    z-index: 2 !important;
    display: block !important;
  }

  /* Left Side: Premium Vertical Scroller Thumbnail column */
  .product-gallery__thumbnail-list {
    display: flex !important; /* Overrides md:hidden */
    grid-column: 1 !important;
    grid-row: 1 !important;
    flex-direction: column !important;
    gap: 12px !important;
    max-height: 520px !important;
    overflow-y: auto !important;
    padding-right: 6px !important;
    scrollbar-width: thin !important;
    scrollbar-color: rgba(9, 84, 146, 0.2) transparent !important;
  }
  
  .product-gallery__thumbnail-list::-webkit-scrollbar {
    width: 4px !important;
  }
  
  .product-gallery__thumbnail-list::-webkit-scrollbar-thumb {
    background: rgba(9, 84, 146, 0.15) !important;
    border-radius: 4px !important;
  }

  product-gallery-navigation.product-gallery__thumbnail-scroller {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    width: 100% !important;
  }

  /* Thumbnails styling with spring transitions and brand blue selected outline */
  .product-gallery__thumbnail {
    width: 56px !important;
    height: 56px !important;
    border-radius: 12px !important;
    border: 1.5px solid #eaeaea !important;
    background: #fdfdfd !important;
    padding: 3px !important;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease, box-shadow 0.3s ease !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .product-gallery__thumbnail:hover {
    transform: translateY(-2px) scale(1.06) !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
  }
  
  .product-gallery__thumbnail[aria-current="true"] {
    border-color: #095492 !important; /* Premium brand blue active ring */
    box-shadow: 0 0 10px rgba(9, 84, 146, 0.22) !important;
    transform: scale(1.06) !important;
  }
  
  .product-gallery__thumbnail img {
    border-radius: 8px !important;
    object-fit: contain !important;
  }

  /* Right Side: Cinematic Active Slide Container */
  .product-gallery__image-list {
    grid-column: 2 !important;
    grid-row: 1 !important;
    width: 100% !important;
    overflow: hidden !important;
    border-radius: 20px !important;
    border: 1px solid rgba(0,0,0,0.03) !important;
    box-shadow: 0 8px 30px rgba(0,0,0,0.02) !important;
  }

  .product-gallery__carousel {
    width: 100% !important;
    aspect-ratio: 1 / 1 !important; /* Perfect square container matching shoebox shape */
    background-color: #f7f7f7 !important;
    border-radius: 20px !important;
  }

  .product-gallery__media {
    aspect-ratio: 1 / 1 !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: #f7f7f7 !important;
  }

  .product-gallery__media img {
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: contain !important; /* Clean full-bleed fitting with no cropping */
    mix-blend-mode: multiply !important; /* Seamless background blend */
    border-radius: 20px !important;
  }

  /* Slideshow Arrows styled with backdrop blurs and floating elegantly */
  .gallery-nav-arrow {
    display: flex !important;
    z-index: 5 !important;
  }
  
  .product-gallery__zoom-button {
    display: none !important; /* Hide original zoom button for premium frameless look */
  }
}

/* --- Relocated Accordions Block inside product-info Sidebar --- */
#product-extra-information {
  width: 100% !important;
  max-width: 100% !important;
  margin: 35px 0 0 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  display: block !important;
}

#product-extra-information .accordion {
  border-bottom: 1px solid #eaeaea !important;
  margin-bottom: 0 !important;
}

#product-extra-information .accordion__disclosure {
  border: none !important;
}

#product-extra-information .accordion__toggle {
  padding: 16px 0 !important;
  transition: color 0.25s ease !important;
  cursor: pointer !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  font-size: 13px !important;
  letter-spacing: 0.05em !important;
}

#product-extra-information .accordion__content {
  padding: 8px 0 20px 0 !important;
  font-size: 12.5px !important;
  line-height: 1.6 !important;
}

/* --- Premium Snapmint Widget Highlight Overrides --- */
#sm-widget-btn.snap_emi_txt_wrapper {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(9, 84, 146, 0.03)) !important;
    border: 1px dashed rgba(9, 84, 146, 0.3) !important;
    border-radius: 12px !important;
    padding: 16px 20px !important;
    margin: 24px 0 !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02) !important;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease, box-shadow 0.3s ease !important;
    cursor: pointer !important;
    display: block !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

#sm-widget-btn.snap_emi_txt_wrapper:hover {
    transform: translateY(-2.5px) scale(1.015) !important;
    border-color: #095492 !important;
    border-style: solid !important;
    box-shadow: 0 8px 25px rgba(9, 84, 146, 0.12) !important;
}

/* Make green monthly EMI indicator beautiful */
#sm-widget-btn .snap-emi-inst b:first-child,
#sm-widget-btn b.dp-class_minicart,
#sm-widget-btn .snap-emi-inst span.snap_only_font_weight {
    background-color: #2da257 !important;
    color: #ffffff !important;
    padding: 3px 8px !important;
    border-radius: 6px !important;
    font-weight: 700 !important;
    display: inline-block !important;
    box-shadow: 0 2px 6px rgba(45, 162, 87, 0.2) !important;
}

/* Highlighting "Buy on EMI" CTA button */
#sm-widget-btn .snap-widget-buyonemi,
#sm-widget-btn .snap_more_text {
    background-color: #000000 !important;
    color: #ffffff !important;
    border-radius: 8px !important;
    padding: 6px 14px !important;
    font-weight: 600 !important;
    display: inline-block !important;
    transition: background-color 0.2s ease, transform 0.2s ease !important;
}

#sm-widget-btn:hover .snap-widget-buyonemi,
#sm-widget-btn:hover .snap_more_text {
    background-color: #095492 !important;
    transform: scale(1.05) !important;
}

/* --- Barefoot-Only Simulator Visibility --- */
#visual-barefoot {
    display: flex !important;
    opacity: 1 !important;
    transform: scale(1) !important;
}
#details-barefoot {
    display: block !important;
    opacity: 1 !important;
}
`;

const updatedContent = 
  content.substring(0, commentStartIdx) +
  newStyleOverrides +
  content.substring(styleEndIdx);

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('[SUCCESS] Successfully completed all CSS sticky asymmetric scroll, accordion sidebar, and Snapmint highlight overrides!');
