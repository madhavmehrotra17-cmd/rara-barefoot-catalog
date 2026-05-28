const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Upgrading "Buy on EMI" button sizes in product.html...');

const oldCSS = `/* Highlighting "Buy on EMI" CTA button */
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
}`;

const newCSS = `/* Highlighting "Buy on EMI" CTA button image */
#shopify-section-template--19195983724718__main #sm-widget-btn .snap-widget-buyonemi {
    width: 95px !important; /* Upgraded width from 34px to make the button large and clear */
    height: auto !important;
    display: inline-block !important;
    vertical-align: middle !important;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.16)) !important;
}

#shopify-section-template--19195983724718__main #sm-widget-btn:hover .snap-widget-buyonemi {
    transform: scale(1.08) !important;
    filter: drop-shadow(0 6px 12px rgba(9, 84, 146, 0.25)) !important;
}

/* Fallback/alternative text-based button styling */
#shopify-section-template--19195983724718__main #sm-widget-btn .snap_more_text {
    background-color: #000000 !important;
    color: #ffffff !important;
    border-radius: 9999px !important;
    padding: 8px 18px !important;
    font-weight: 700 !important;
    font-size: 12.5px !important;
    letter-spacing: 0.5px !important;
    text-transform: uppercase !important;
    display: inline-block !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15) !important;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

#shopify-section-template--19195983724718__main #sm-widget-btn:hover .snap_more_text {
    background-color: #095492 !important;
    box-shadow: 0 6px 15px rgba(9, 84, 146, 0.3) !important;
    transform: translateY(-1px) scale(1.03) !important;
}`;

// Normalize line endings to avoid matching issues
const normalize = (str) => str.replace(/\r\n/g, '\n');

const normContent = normalize(content);
const normOldCSS = normalize(oldCSS);
const normNewCSS = normalize(newCSS);

if (normContent.includes(normOldCSS)) {
  const normResult = normContent.replace(normOldCSS, normNewCSS);
  // Restore CRLF line endings
  const crlfResult = normResult.replace(/\n/g, '\r\n');
  fs.writeFileSync(filePath, crlfResult, 'utf8');
  console.log('[SUCCESS] Successfully upgraded Buy on EMI button styling to make it big!');
} else {
  console.error('[ERROR] Could not find the old Snapmint button CSS block in product.html!');
  process.exit(1);
}
