const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetStart = '<div class="details-pane active" id="details-barefoot">';
const targetEnd = '<!-- Traditional Details list -->';

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('[ERROR] Could not find details-barefoot bounds in product.html!');
  process.exit(1);
}

const beforeBlock = content.substring(0, startIndex);
const afterBlock = content.substring(endIndex);

const upgradedDetailsBlock = `<div class="details-pane active" id="details-barefoot">
        
        <div class="science-detail-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#095492" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="brand-blue-icon">
              <!-- Wide Toe Box boundary (faint blue backing shape) -->
              <path d="M6 10 C6 6, 12 4, 16 4 C20 4, 26 6, 26 10 C25 15, 23 20, 22 25 C21 28, 19 29, 16 29 C13 29, 11 28, 10 25 C9 20, 7 15, 6 10 Z" fill="rgba(9, 84, 146, 0.04)" stroke="rgba(9, 84, 146, 0.15)" stroke-width="1" stroke-dasharray="2 2" />
              
              <!-- Foot sole contour -->
              <path d="M11 15 C10.5 15, 10 16, 10 18 C10 22, 12 25, 13 26.5 C14 27.5, 15 28, 16 28 C17 28, 18 27.5, 19 26.5 C20 25, 22 22, 22 18 C22 16, 21.5 15, 21 15 C20.5 15, 20.5 16, 19.5 16.5 C18.5 17, 17.5 17.5, 16 17.5 C14.5 17.5, 13.5 17, 12.5 16.5 C11.5 16, 11.5 15, 11 15 Z" fill="rgba(9, 84, 146, 0.08)" />
              
              <!-- 5 Individual organic fanned toes -->
              <path d="M9.5,12 C9.5,10 11,10 11,12 C11,14 9.5,14 9.5,12 Z" fill="#095492" stroke="none" />
              <path d="M12.5,10 C12.5,8 13.7,8 13.7,10 C13.7,12 12.5,12 12.5,10 Z" fill="#095492" stroke="none" />
              <path d="M15.2,9.2 C15.2,7.2 16.4,7.2 16.4,9.2 C16.4,11.2 15.2,11.2 15.2,9.2 Z" fill="#095492" stroke="none" />
              <path d="M17.9,10 C17.9,8 19.1,8 19.1,10 C19.1,12 17.9,12 17.9,10 Z" fill="#095492" stroke="none" />
              <path d="M20.6,12 C20.6,10 22,10 22,12 C22,14 20.6,14 20.6,12 Z" fill="#095492" stroke="none" />
              
              <!-- Fanning/Splay indicator arrows -->
              <path d="M7 7 C11 5, 21 5, 25 7" />
              <path d="M9.5 5.5 L7 7 L9.5 8.5" />
              <path d="M22.5 5.5 L25 7 L22.5 8.5" />
            </svg>
          </div>
          <div class="card-content">
            <h5>Wide Toe Box</h5>
            <p>Toes spread naturally, improving balance, stability, and overall foot strength.</p>
          </div>
        </div>

        <div class="science-detail-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#095492" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="brand-blue-icon">
              <!-- Flexible Sole curve (banana curve showing athletic flex) -->
              <path d="M5 18 C10 13, 22 13, 27 18" stroke="#095492" stroke-width="2.5" />
              
              <!-- Bending foot inside (faint blue fill) -->
              <path d="M6 17 C9 13, 11 12, 13 14 C15 15.5, 17 16, 19 15 C21 13.5, 23 11, 26 12 C27 13.5, 27 16, 25 17.5 C23 19, 10 19, 6 17 Z" fill="rgba(9, 84, 146, 0.08)" stroke="none" />
              
              <!-- Flex grooves on the sole -->
              <line x1="10" y1="16.2" x2="9" y2="18.5" stroke="#ffffff" stroke-width="1" />
              <line x1="14" y1="15.2" x2="13" y2="17.8" stroke="#ffffff" stroke-width="1" />
              <line x1="18" y1="15.2" x2="17" y2="17.8" stroke="#ffffff" stroke-width="1" />
              <line x1="22" y1="16.2" x2="21" y2="18.5" stroke="#ffffff" stroke-width="1" />
              
              <!-- Muscle activation pulse (glowing waves above the arch) -->
              <path d="M12 10 C14 8, 18 8, 20 10" stroke="rgba(9, 84, 146, 0.4)" stroke-dasharray="1 1" />
              <path d="M14 12 C15 11, 17 11, 18 12" stroke="rgba(9, 84, 146, 0.6)" />
              
              <!-- Bending motion arrows below the sole -->
              <path d="M8 22 C12 24, 20 24, 24 22" />
              <path d="M10.5 20.5 L8 22 L10.5 23.5" />
              <path d="M21.5 20.5 L24 22 L21.5 23.5" />
            </svg>
          </div>
          <div class="card-content">
            <h5>Flexible Sole</h5>
            <p>Moves naturally with your feet, activating muscles and improving ground connection.</p>
          </div>
        </div>

        <div class="science-detail-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#095492" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="brand-blue-icon">
              <!-- Flat Zero-Drop Ground Baseline -->
              <line x1="4" y1="28" x2="28" y2="28" stroke-width="2" />
              
              <!-- Spinal Alignment Dashed Axis Line -->
              <line x1="16" y1="2" x2="16" y2="28" stroke-dasharray="2 2" stroke="#095492" stroke-width="1.2" />
              
              <!-- Aligned Posture Figure -->
              <circle cx="16" cy="6" r="2.5" fill="rgba(9, 84, 146, 0.08)" />
              
              <path d="M11 11 H21" />
              <line x1="16" y1="8.5" x2="16" y2="17" />
              
              <path d="M12.5 17 H19.5" />
              
              <line x1="11" y1="11" x2="11" y2="15.5" />
              <line x1="21" y1="11" x2="21" y2="15.5" />
              
              <line x1="13.2" y1="17" x2="13.2" y2="28" />
              <line x1="18.8" y1="17" x2="18.8" y2="28" />
              
              <!-- Aligned Joint Dots (emerald target indicators) -->
              <circle cx="11" cy="11" r="1" fill="#2ec4b6" stroke="none" />
              <circle cx="21" cy="11" r="1" fill="#2ec4b6" stroke="none" />
              <circle cx="16" cy="17" r="1" fill="#2ec4b6" stroke="none" />
              <circle cx="13.2" cy="22.5" r="1" fill="#2ec4b6" stroke="none" />
              <circle cx="18.8" cy="22.5" r="1" fill="#2ec4b6" stroke="none" />
            </svg>
          </div>
          <div class="card-content">
            <h5>Natural Zero Drop</h5>
            <p>Keeps posture naturally aligned, reducing strain on knees, hips, and spine.</p>
          </div>
        </div>

      </div>

      `;

content = beforeBlock + upgradedDetailsBlock + afterBlock;
fs.writeFileSync(filePath, content, 'utf8');
console.log('[SUCCESS] Re-established all 3 upgraded barefoot detail cards in product.html!');
