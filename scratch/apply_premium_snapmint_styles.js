const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Injecting premium Snapmint CSS styles into product.html...');

const startMarker = '/* --- Premium Snapmint Widget Highlight Overrides --- */';
const endMarker = '/* --- Barefoot-Only Simulator Visibility --- */';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('[ERROR] Could not find the Snapmint styling boundaries inside product.html!');
  process.exit(1);
}

const upgradedCSS = `/* --- Premium Snapmint Widget Highlight Overrides --- */
#shopify-section-template--19195983724718__main #sm-widget-btn.snap_emi_txt_wrapper {
    background: linear-gradient(135deg, #FFFFFF 0%, #F1F6FB 100%) !important;
    border: 2px dashed #095492 !important;
    border-radius: 14px !important;
    padding: 18px 22px !important;
    margin: 28px 0 !important;
    box-shadow: 0 4px 20px rgba(9, 84, 146, 0.06) !important;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease, box-shadow 0.3s ease !important;
    cursor: pointer !important;
    display: block !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

#shopify-section-template--19195983724718__main #sm-widget-btn.snap_emi_txt_wrapper:hover {
    transform: translateY(-3.5px) scale(1.018) !important;
    border-style: solid !important;
    border-color: #095492 !important;
    box-shadow: 0 10px 30px rgba(9, 84, 146, 0.16) !important;
}

#shopify-section-template--19195983724718__main #sm-widget-btn .snap-emi-inst {
    font-size: 13.5px !important;
    font-weight: 700 !important;
    line-height: 20px !important;
    color: #111827 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
}

#shopify-section-template--19195983724718__main #sm-widget-btn .snap-emi-slogan {
    margin-top: 8px !important;
    font-size: 12.5px !important;
    font-weight: 600 !important;
    letter-spacing: 0.2px !important;
    color: #4b5563 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
}

/* Make green monthly EMI indicator beautiful */
#shopify-section-template--19195983724718__main #sm-widget-btn .snap-emi-inst b:first-child,
#shopify-section-template--19195983724718__main #sm-widget-btn b.dp-class,
#shopify-section-template--19195983724718__main #sm-widget-btn b.dp-class_minicart,
#shopify-section-template--19195983724718__main #sm-widget-btn .snap-emi-inst span.snap_only_font_weight {
    background-color: #10B981 !important;
    color: #ffffff !important;
    padding: 4px 10px !important;
    border-radius: 8px !important;
    font-weight: 800 !important;
    font-size: 14.5px !important;
    display: inline-block !important;
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25) !important;
    margin: 0 4px !important;
}

/* Highlighting "Buy on EMI" CTA button */
#shopify-section-template--19195983724718__main #sm-widget-btn .snap-widget-buyonemi,
#shopify-section-template--19195983724718__main #sm-widget-btn .snap_more_text {
    background-color: #000000 !important;
    color: #ffffff !important;
    border-radius: 9999px !important;
    padding: 8px 18px !important;
    font-weight: 700 !important;
    font-size: 12px !important;
    letter-spacing: 0.5px !important;
    text-transform: uppercase !important;
    display: inline-block !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15) !important;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

#shopify-section-template--19195983724718__main #sm-widget-btn:hover .snap-widget-buyonemi,
#shopify-section-template--19195983724718__main #sm-widget-btn:hover .snap_more_text {
    background-color: #095492 !important;
    box-shadow: 0 6px 15px rgba(9, 84, 146, 0.3) !important;
    transform: translateY(-1px) scale(1.03) !important;
}

`;

const newContent = content.substring(0, startIdx) + upgradedCSS + content.substring(endIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('[SUCCESS] Successfully injected premium highlighted Snapmint CSS styles!');
