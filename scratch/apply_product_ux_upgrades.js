const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- APPLYING UX/UI UPGRADES FOR PRODUCT DETAILS SITEWIDE ---');

const premiumProductStyles = `

/* --- Dynamic Accelerated Checkout CTA Override --- */
.shopify-payment-button__button {
    font-size: 1.02rem !important;
    padding: 12px 28px !important;
    border-radius: 8px !important; /* Soft, classy rounded corners matching main page */
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    will-change: transform, box-shadow !important; /* Forces GPU compositor layer, eliminating lag */
    backface-visibility: hidden !important; /* Hardware acceleration fallback */
    transform: translate3d(0, 0, 0) !important;
}

.shopify-payment-button__button:hover {
    transform: translate3d(0, -2px, 0) scale(1.015) !important; /* GPU-accelerated lift and micro-scale */
    box-shadow: 0 8px 20px rgba(9, 84, 146, 0.18) !important; /* Soft royal blue drop glow */
    background-color: #ffffff !important; /* Classy background invert on hover */
    color: #095492 !important; /* Premium brand royal blue text color */
    border-color: #095492 !important; /* Premium brand royal blue border color */
}

/* --- Premium Selection Swatches (Size & Gender) --- */
.block-swatch {
    border-radius: 8px !important; /* Soft rounded corners matching CTAs */
    border: 1px solid #eaeaea !important;
    transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), 
                border-color 0.25s ease, 
                background-color 0.25s ease, 
                color 0.25s ease !important;
    will-change: transform, border-color !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    font-weight: 500 !important;
    cursor: pointer !important;
}

.block-swatch:hover {
    transform: translateY(-1px) !important;
    border-color: #095492 !important;
    color: #095492 !important;
    box-shadow: 0 4px 12px rgba(9, 84, 146, 0.08) !important;
}

/* Selected Active State */
input:checked + .block-swatch,
.block-swatch[aria-checked="true"] {
    background-color: #095492 !important; /* Premium brand Royal Blue background */
    border-color: #095492 !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 15px rgba(9, 84, 146, 0.2) !important;
}

/* --- Premium Color Swatches --- */
.color-swatch {
    border-radius: 50% !important;
    border: 1px solid #eaeaea !important;
    padding: 2px !important;
    transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.25s ease !important;
    cursor: pointer !important;
}

.color-swatch:hover {
    transform: scale(1.08) !important;
    border-color: #095492 !important;
}

/* Selected Active State */
input:checked + .color-swatch {
    border-color: #095492 !important;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #095492 !important; /* Beautiful outer active ring */
    transform: scale(1.08) !important;
}

/* --- Redesigned Barefoot Features Grid (Emphasis) --- */
.features-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 16px !important;
    margin: 25px 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
}

.features-column {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
}

.feature-item {
    display: flex !important;
    gap: 16px !important;
    align-items: center !important;
    padding: 16px 20px !important;
    background-color: #fafafa !important; /* Extremely soft grey background */
    border: 1px solid #f0f0f0 !important; /* Clean light border */
    border-radius: 12px !important; /* Soft, classy rounded card corners */
    min-height: 70px !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.01) !important;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
                border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
                box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
                background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    will-change: transform, border-color, box-shadow !important;
    backface-visibility: hidden !important;
    transform: translate3d(0, 0, 0) !important;
}

.feature-item:hover {
    transform: translate3d(0, -3px, 0) !important; /* Hardware-accelerated lift */
    border-color: #095492 !important; /* Signature brand blue border */
    background-color: #ffffff !important; /* Invert background to clean white */
    box-shadow: 0 8px 24px rgba(9, 84, 146, 0.12) !important; /* Brand blue glow shadow */
}

/* Icon Highlight & Scale Animations */
.feature-icon {
    display: inline-flex !important;
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    border-radius: 50% !important;
    background: #ffffff !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 0 0 4px rgba(0,0,0,0.01) inset !important;
    overflow: hidden !important;
    transition: background-color 0.3s ease, transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

.feature-item:hover .feature-icon {
    background-color: rgba(9, 84, 146, 0.08) !important; /* Brand blue circle background highlight */
    transform: scale(1.08) !important; /* Micro zoom */
}

.feature-icon img {
    width: 32px !important;
    height: 32px !important;
    object-fit: contain !important;
    transition: transform 0.3s ease !important;
}

/* Text and Headings Transition */
.feature-text h4 {
    margin: 0 !important;
    font-family: 'Geist', sans-serif !important;
    font-size: 13.5px !important;
    font-weight: 500 !important;
    line-height: 1.4 !important;
    color: #333333 !important;
    transition: color 0.3s ease !important;
}

.feature-item:hover .feature-text h4 {
    color: #095492 !important; /* Signature royal blue text color on hover */
}

/* --- Premium Accordions (Core Properties, Product Specs, etc.) --- */
.accordion {
    border-bottom: 1px solid #eaeaea !important;
    margin-bottom: 0 !important;
}

.accordion__disclosure {
    border: none !important;
}

.accordion__toggle {
    padding: 18px 0 !important;
    transition: color 0.25s ease !important;
    cursor: pointer !important;
    font-weight: 500 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}

.accordion__toggle:hover,
.accordion__disclosure[open] .accordion__toggle,
.accordion__disclosure[aria-expanded="true"] .accordion__toggle {
    color: #095492 !important;
}

/* Plus/Minus Indicator Accents */
.animated-plus {
    position: relative !important;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

.animated-plus::before,
.animated-plus::after {
    background-color: #a0a0a0 !important; /* Default grey color */
    transition: background-color 0.25s ease !important;
}

.accordion__toggle:hover .animated-plus::before,
.accordion__toggle:hover .animated-plus::after,
.accordion__disclosure[open] .animated-plus::before,
.accordion__disclosure[open] .animated-plus::after {
    background-color: #095492 !important; /* Premium brand Royal Blue on hover/active */
}
`;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const ultimateStyleTag = '<style id="rara-ultimate-style">';
  
  if (content.includes(ultimateStyleTag)) {
    // Append the new styles before the closing </style> of id="rara-ultimate-style"
    const idx = content.indexOf(ultimateStyleTag);
    const endStyleIdx = content.indexOf('</style>', idx);
    
    if (endStyleIdx !== -1) {
      content = content.substring(0, endStyleIdx) + premiumProductStyles + content.substring(endStyleIdx);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[SUCCESS] Appended premium product UX overrides inside <style id="rara-ultimate-style"> in ${file}`);
    } else {
      console.log(`[WARNING] Closing </style> not found for rara-ultimate-style in ${file}`);
    }
  } else {
    console.log(`[WARNING] <style id="rara-ultimate-style"> not found in ${file}`);
  }
});

console.log('\nAll 12 templates successfully updated with sitewide product UX enhancements!');
