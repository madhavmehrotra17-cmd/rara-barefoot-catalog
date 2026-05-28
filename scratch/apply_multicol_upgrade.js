const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

if (!fs.existsSync(productPath)) {
  console.error('Error: product.html not found!');
  process.exit(1);
}

let html = fs.readFileSync(productPath, 'utf8');

// 1. Benefits CSS to append in rara-ultimate-style
const benefitsStyles = `
/* --- Homepage Benefits Split Cards Sitewide Accents --- */
.barefoot-benefit-card {
  display: flex !important;
  flex-direction: column !important;
  background-color: #ffffff !important;
  border: 1px solid rgba(0,0,0,0.08) !important;
  border-radius: 8px !important;
  text-decoration: none !important;
  color: #000 !important;
  text-align: center !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
  height: 100% !important;
  overflow: hidden !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02) !important;
}
.barefoot-benefit-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important;
  border-color: rgba(0,0,0,0.15) !important;
}
.benefit-visual-container {
  position: relative !important;
  height: 300px !important;
  background-color: #ffffff !important;
  background-image: 
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px) !important;
  background-size: 20px 20px !important;
  background-position: center !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
}
.benefit-shoe-img {
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  z-index: 2 !important;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.08)) !important;
}
.benefit-visual-1 .benefit-shoe-img {
  max-width: 95% !important;
  max-height: 95% !important;
}
.benefit-visual-2 .benefit-shoe-img {
  max-width: 76% !important;
  max-height: 76% !important;
}
.benefit-visual-3 .benefit-shoe-img {
  max-width: 70% !important;
  max-height: 70% !important;
}
.barefoot-benefit-card:hover .benefit-shoe-img {
  transform: scale(1.08) !important;
}
.benefit-foot-outline {
  position: absolute !important;
  pointer-events: none !important;
  z-index: 1 !important;
}
.outline-1 {
  bottom: 50px !important;
  left: 10% !important;
  right: 10% !important;
  border-bottom: 2px dashed rgba(0,0,0,0.2) !important;
}
.outline-2 {
  bottom: 15px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 200px !important;
  height: 160px !important;
  border: 2px dashed rgba(0,0,0,0.25) !important;
  border-radius: 50% 50% 0 0 !important;
  border-bottom: none !important;
}
.outline-3 {
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 240px !important;
  height: 240px !important;
  border: 2px dashed rgba(0,0,0,0.25) !important;
  border-radius: 50% !important;
}
.benefit-text-container {
  padding: 25px 20px !important;
  background-color: #fafafa !important;
  flex-grow: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  border-top: 1px solid rgba(0,0,0,0.06) !important;
}
.benefit-title {
  font-family: 'Anton', sans-serif !important;
  font-size: 24px !important;
  font-weight: 400 !important;
  font-style: italic !important;
  letter-spacing: 0.05em !important;
  margin: 0 0 10px 0 !important;
  color: #000000 !important;
  text-transform: uppercase !important;
  line-height: 1.2 !important;
}
.benefit-description {
  font-family: 'Geist', sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  color: #555555 !important;
  margin: 0 !important;
  line-height: 1.4 !important;
  text-transform: uppercase !important;
  max-width: 90% !important;
  letter-spacing: 0.02em !important;
}
#shopify-section-template--19195983724718__multi_column_VkYVca h2.h2 {
    font-family: 'Anton', sans-serif !important;
    font-weight: 400 !important;
    font-size: 34px !important; /* Slightly thinned font size feel */
    letter-spacing: 2px !important; /* Slightly thinned letter-spacing */
    text-transform: uppercase !important;
}
@media screen and (max-width: 749px) {
  .benefit-visual-container {
    height: 180px !important;
  }
  .outline-1 {
    bottom: 30px !important;
  }
  .outline-2 {
    width: 120px !important;
    height: 95px !important;
    bottom: 10px !important;
  }
  .outline-3 {
    width: 145px !important;
    height: 145px !important;
  }
  .benefit-title {
    font-size: 18px !important;
  }
  .benefit-description {
    font-size: 10px !important;
  }
}
`;

// Append CSS inside <style id="rara-ultimate-style">
const ultimateStyleTag = '<style id="rara-ultimate-style">';
if (html.includes(ultimateStyleTag)) {
  const idx = html.indexOf(ultimateStyleTag);
  const endStyleIdx = html.indexOf('</style>', idx);
  if (endStyleIdx !== -1) {
    html = html.substring(0, endStyleIdx) + benefitsStyles + html.substring(endStyleIdx);
    console.log('[SUCCESS] Appended benefits styles inside rara-ultimate-style');
  }
}

// 2. Define the new multi-column markup
const newMulticolMarkup = `<section id="shopify-section-template--19195983724718__multi_column_VkYVca" class="shopify-section shopify-section--multi-column"><style>
    #shopify-section-template--19195983724718__multi_column_VkYVca {
      --multi-column-gap: 1.5rem;
      --multi-column-column-width: 100%;
      --multi-column-grid: auto / repeat(auto-fit, var(--multi-column-column-width));
      --multi-column-content-alignment: safe start;
    }

    @media screen and (min-width: 700px) {
      #shopify-section-template--19195983724718__multi_column_VkYVca {
        --multi-column-columns-per-row: 2;
        --multi-column-column-width: calc(100% / var(--multi-column-columns-per-row) - var(--multi-column-gap) * ((var(--multi-column-columns-per-row) - 1) / var(--multi-column-columns-per-row)));
      }
    }

    @media screen and (min-width: 999px) {
      #shopify-section-template--19195983724718__multi_column_VkYVca {
        --multi-column-gap: 1.875rem;
        --multi-column-columns-per-row: 3;
        --multi-column-column-width: calc(100% / var(--multi-column-columns-per-row) - var(--multi-column-gap) * ((var(--multi-column-columns-per-row) - 1) / var(--multi-column-columns-per-row)));
        --multi-column-grid: auto / repeat(auto-fit, var(--multi-column-column-width));
      }
    }
  </style><div class="section-spacing color-scheme color-scheme--scheme-2 color-scheme--bg-54922f2e920ba8346f6dc0fba343d673 ">
    <div class="container">
      <div class="section-stack">
  <div class="section-header justify-self-start text-start"><div class="prose"><h2 class="h2">WHY FOOT-FREEDOM MATTERS</h2><p>Foot first engineering based on nature’s evolutionary design</p></div></div><multi-column class="multi-column "><div
              class="multi-column__item  snap-center group"
              
            ><a href="/pages/barefoot-science" class="barefoot-benefit-card"><div class="benefit-visual-container benefit-visual-1"><img src="/Xanadu_black_new_1.jpg" alt="Balanced Flat Sole" class="zoom-image group-hover:zoom benefit-shoe-img" loading="lazy" width="1080" height="1080"><div class="benefit-foot-outline outline-1"></div></div><div class="benefit-text-container"><h3 class="benefit-title">BALANCED</h3><p class="benefit-description">FLAT SOLE KEEPS THE SPINE STACKED NATURALLY, PREVENTING LOWER BACK STRAIN</p></div></a></div><div
              class="multi-column__item  snap-center group"
              
            ><a href="/pages/barefoot-science" class="barefoot-benefit-card"><div class="benefit-visual-container benefit-visual-2"><img src="/Xanadu_black_new_2.jpg" alt="Wide Toe Box" class="zoom-image group-hover:zoom benefit-shoe-img" loading="lazy" width="1080" height="1080"><div class="benefit-foot-outline outline-2"></div></div><div class="benefit-text-container"><h3 class="benefit-title">WIDE</h3><p class="benefit-description">TOES SPREAD WIDE FOR STABLE LANDING, KEEPING YOU BALANCED THROUGH UNEVEN TERRAIN NATURALLY</p></div></a></div><div
              class="multi-column__item  snap-center group"
              
            ><a href="/pages/barefoot-science" class="barefoot-benefit-card"><div class="benefit-visual-container benefit-visual-3"><img src="/Xanadu_black_new_3.jpg" alt="Flexible Sole" class="zoom-image group-hover:zoom benefit-shoe-img" loading="lazy" width="1080" height="1080"><div class="benefit-foot-outline outline-3"></div></div><div class="benefit-text-container"><h3 class="benefit-title">FLEXIBLE</h3><p class="benefit-description">COMPLETE FLEX LETS FOOT ROLL NATURALLY, CREATING A NATURAL SPRING THAT MOVES WITH YOU</p></div></a></div></multi-column>
      </div>
    </div>
  </div></section>`;

// Replace old multi-column section inside product.html
const startSectionStr = 'shopify-section-template--19195983724718__multi_column_VkYVca" class="shopify-section shopify-section--multi-column">';
const sectionStartIdx = html.indexOf(startSectionStr);

if (sectionStartIdx !== -1) {
  // Let's find the end of this section (the closing tag </section>)
  const endSectionIdx = html.indexOf('</section>', sectionStartIdx);
  if (endSectionIdx !== -1) {
    const fullTargetIdx = html.lastIndexOf('<section', sectionStartIdx);
    const targetSubstring = html.substring(fullTargetIdx, endSectionIdx + 10);
    
    html = html.replace(targetSubstring, newMulticolMarkup);
    console.log('[SUCCESS] Replaced multi-column section in product.html with Homepage layout!');
  } else {
    console.error('Error: Could not find closing </section> tag');
  }
} else {
  console.error('Error: Could not find multi-column section start in product.html');
}

fs.writeFileSync(productPath, html, 'utf8');
console.log('Successfully completed Multi-Column benefits update in product.html!');
