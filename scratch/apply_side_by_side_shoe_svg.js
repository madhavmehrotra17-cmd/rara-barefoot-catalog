const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Upgrading barefoot science widget to a beautiful Side-by-Side (Top & Side Views) graphic...');

// 1. Replace the SVG in visual-barefoot
const barefootOldSVGStart = '<div class="foot-graphic-wrapper active" id="visual-barefoot">';
const bStartIdx = content.indexOf(barefootOldSVGStart);
let bEndIdx = -1;

if (bStartIdx !== -1) {
  const footLabelIdx = content.indexOf('Wide Splay & Zero-Drop Posture</span>', bStartIdx);
  if (footLabelIdx !== -1) {
    bEndIdx = content.indexOf('</div>', footLabelIdx) + '</div>'.length;
  }
}

if (bStartIdx === -1 || bEndIdx === -1) {
  console.error('[ERROR] Could not find visual-barefoot block in product.html!');
  process.exit(1);
}

const sideBySideSVGMarkup = `<div class="foot-graphic-wrapper active" id="visual-barefoot">
        <!-- SVG for Barefoot Foot - Unified Side-by-Side Top & Side Views -->
        <svg viewBox="0 0 360 240" class="foot-svg barefoot-svg">
          <!-- ==================== LEFT HALF: TOP-DOWN VIEW ==================== -->
          <g transform="translate(5, 5) scale(0.85)">
            <!-- Outer Shoe Outsole Welt -->
            <path d="M100 11 C139 11, 155 41, 152 67 C149 97, 139 127, 131 167 C126 197, 121 227, 100 227 C79 227, 74 197, 69 167 C61 127, 51 97, 48 67 C45 41, 61 11, 100 11 Z" fill="none" stroke="rgba(9, 84, 146, 0.18)" stroke-width="2.5px" />
            <!-- Shoe Body / Upper -->
            <path d="M100 15 C135 15, 150 45, 148 70 C145 100, 135 130, 128 170 C123 200, 118 225, 100 225 C82 225, 77 200, 72 170 C65 130, 55 100, 52 70 C50 45, 65 15, 100 15 Z" class="svg-shoe-body" />
            <!-- Inner Foot Outline (Dashed showing healthy splay) -->
            <path d="M100 22 C130 22, 144 42, 142 66 C140 92, 132 121, 125 159 C121 187, 116 211, 100 211 C84 211, 79 187, 75 159 C68 121, 60 92, 58 66 C56 42, 70 22, 100 22 Z" class="svg-foot-contour" />
            
            <!-- Detailed Shoe Collar Opening -->
            <path d="M82 175 C82 210, 118 210, 118 175 C118 165, 82 165, 82 175 Z" fill="#ffffff" stroke="#095492" stroke-width="1.8px" />
            <path d="M84 175 C84 203, 116 203, 116 175 Z" fill="rgba(9, 84, 146, 0.08)" />
            <line x1="82" y1="175" x2="118" y2="175" stroke="#095492" stroke-width="1px" />
            
            <!-- Shoe Tongue Panel -->
            <path d="M85 160 L115 160 L111 86 C111 86, 100 81, 89 86 Z" fill="rgba(255, 255, 255, 0.95)" stroke="#095492" stroke-width="1px" stroke-dasharray="2 1.5" />
            
            <!-- Criss-Cross Shoelaces -->
            <line x1="87" y1="106" x2="113" y2="116" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            <line x1="113" y1="106" x2="87" y2="116" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            <line x1="86" y1="123" x2="114" y2="133" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            <line x1="114" y1="123" x2="86" y2="133" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            <line x1="85" y1="140" x2="115" y2="150" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            <line x1="115" y1="140" x2="85" y2="150" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            <line x1="84" y1="157" x2="116" y2="157" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            
            <!-- Shoelace Bow Knot -->
            <path d="M100 95 C92 84, 80 88, 97 95 Z" fill="none" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            <path d="M100 95 C108 84, 120 88, 103 95 Z" fill="none" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            <circle cx="100" cy="95" r="2.5" fill="#095492" />
            
            <!-- Wide Spacious Toe Cap Stitching -->
            <path d="M53 71 C71 89, 129 89, 147 71" fill="none" stroke="#095492" stroke-width="1.5px" stroke-dasharray="3.5 2" />
            <path d="M54 75 C72 93, 128 93, 146 75" fill="none" stroke="#095492" stroke-width="1px" stroke-dasharray="2 1.5" />

            <!-- Zero-Drop flat baseline -->
            <line x1="40" y1="230" x2="160" y2="230" class="svg-baseline-glow" />
            <line x1="40" y1="230" x2="160" y2="230" class="svg-baseline" />
            
            <!-- Anatomical skeleton overlay -->
            <path d="M100 215 L100 160 M100 160 L68 75 M100 160 L84 70 M100 160 L100 68 M100 160 L116 70 M100 160 L132 75" class="svg-bones" />
            <circle cx="100" cy="215" r="4" class="svg-joint" />
            <circle cx="100" cy="160" r="5" class="svg-joint-center" />
            
            <!-- Fully Splayed Toes -->
            <circle cx="62" cy="55" r="9" class="svg-toe" />
            <circle cx="82" cy="46" r="8.5" class="svg-toe" />
            <circle cx="100" cy="43" r="8" class="svg-toe" />
            <circle cx="118" cy="46" r="7.5" class="svg-toe" />
            <circle cx="136" cy="55" r="7" class="svg-toe" />
            
            <!-- Sublabel -->
            <text x="100" y="246" font-size="12px" font-family="'Geist', sans-serif" font-weight="700" fill="#095492" text-anchor="middle" letter-spacing="0.04em">WIDE TOE BOX</text>
          </g>
          
          <!-- ==================== RIGHT HALF: SIDEWAYS (SIDE VIEW) ==================== -->
          <g transform="translate(182, 16) scale(0.95)">
            <!-- Flat Ground Baseline -->
            <line x1="5" y1="190" x2="165" y2="190" stroke="rgba(9, 84, 146, 0.15)" stroke-width="6px" stroke-linecap="round" />
            <line x1="5" y1="190" x2="165" y2="190" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            
            <!-- Thin 5mm Flat Outsole (0mm Drop) -->
            <path d="M 12,190 L 158,190 L 154,178 C 114,177, 54,177, 16,180 Z" fill="#095492" stroke="#095492" stroke-width="1px" />
            
            <!-- Sleek Low-Top Upper Contour -->
            <path d="M 16,180 C 16,180, 11,165, 11,150 C 11,125, 29,105, 59,102 C 79,100, 97,78, 119,78 C 129,78, 137,84, 145,100 L 152,132 C 155,145, 155,162, 151,178 Z" fill="none" stroke="#095492" stroke-width="2px" stroke-linejoin="round" />
            <path d="M 16,180 C 16,180, 11,165, 11,150 C 11,125, 29,105, 59,102 C 79,100, 97,78, 119,78 C 129,78, 137,84, 145,100 L 152,132 C 155,145, 155,162, 151,178 Z" fill="rgba(255, 255, 255, 0.95)" stroke="none" />
            
            <!-- Side Panel stitching details -->
            <path d="M 59,102 C 63,122, 83,152, 136,155" fill="none" stroke="#095492" stroke-width="1.5px" stroke-dasharray="3 2" />
            <path d="M 119,78 L 127,108 L 151,178" fill="none" stroke="#095492" stroke-width="1.5px" />
            
            <!-- Ankle collar opening -->
            <path d="M 88,98 C 88,98, 95,82, 112,82 C 118,82, 122,88, 126,98" fill="none" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            
            <!-- Sideways shoelace detailing -->
            <line x1="59" y1="102" x2="88" y2="98" stroke="#095492" stroke-width="1.8px" />
            <line x1="68" y1="110" x2="94" y2="108" stroke="#095492" stroke-width="1.8px" />
            <line x1="78" y1="118" x2="100" y2="118" stroke="#095492" stroke-width="1.8px" />
            
            <!-- Translucent healthy foot inside (Zero-drop horizontal posture) -->
            <path d="M 22,180 C 22,180, 20,160, 48,156 Q 78,152, 98,130 Q 118,130, 128,140 C 134,148, 140,165, 142,180" fill="none" stroke="#2ec4b6" stroke-width="2px" stroke-dasharray="3 2" />
            <circle cx="22" cy="180" r="3.5" fill="#2ec4b6" />
            <circle cx="142" cy="180" r="3.5" fill="#2ec4b6" />
            <line x1="22" y1="180" x2="142" y2="180" stroke="#2ec4b6" stroke-width="1.5px" stroke-dasharray="2 2" />
            
            <!-- Sublabel -->
            <text x="85" y="215" font-size="12px" font-family="'Geist', sans-serif" font-weight="700" fill="#095492" text-anchor="middle" letter-spacing="0.04em">ZERO-DROP & FLEXIBLE</text>
          </g>
        </svg>
        <span class="foot-label label-barefoot">Top Splay & Sideways Zero-Drop posture</span>
      </div>`;

let updatedContent = content.substring(0, bStartIdx) + sideBySideSVGMarkup + content.substring(bEndIdx);

// 2. Adjust .foot-svg max-width from 180px to 310px to accommodate side-by-side views
console.log('Adjusting .foot-svg max-width CSS overrides for wider side-by-side view...');
const oldMaxWidth = '.foot-svg {\r\n    width: 100% !important;\r\n    max-width: 180px !important;';
const newMaxWidth = '.foot-svg {\r\n    width: 100% !important;\r\n    max-width: 310px !important;';

// Check if oldMaxWidth exists
if (updatedContent.includes(oldMaxWidth)) {
  updatedContent = updatedContent.replaceAll(oldMaxWidth, newMaxWidth);
  console.log('[CSS SUCCESS] Adjusted max-width overrides using CRLF matching!');
} else {
  // Try Unix line endings
  const oldMaxWidthUnix = '.foot-svg {\n    width: 100% !important;\n    max-width: 180px !important;';
  const newMaxWidthUnix = '.foot-svg {\n    width: 100% !important;\n    max-width: 310px !important;';
  if (updatedContent.includes(oldMaxWidthUnix)) {
    updatedContent = updatedContent.replaceAll(oldMaxWidthUnix, newMaxWidthUnix);
    console.log('[CSS SUCCESS] Adjusted max-width overrides using Unix matching!');
  } else {
    // Try generic replace
    updatedContent = updatedContent.replaceAll('max-width: 180px !important;', 'max-width: 310px !important;');
    console.log('[CSS SUCCESS] Adjusted max-width overrides using generic replacement!');
  }
}

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('[SUCCESS] Successfully deployed side-by-side top & side view realistic sneaker vectors in product.html!');
