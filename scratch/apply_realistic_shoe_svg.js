const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Upgrading top-down SVGs in product.html with realistic shoe details...');

// 1. Target Barefoot SVG replacement
const barefootOldSVGStart = '<div class="foot-graphic-wrapper active" id="visual-barefoot">';
const barefootOldSVGEnd = 'Wide Splay & Zero-Drop Posture</span>\n      </div>';
const barefootOldSVGEndUnix = 'Wide Splay & Zero-Drop Posture</span>\n      </div>';

const bStartIdx = content.indexOf(barefootOldSVGStart);
let bEndIdx = content.indexOf('Wide Splay & Zero-Drop Posture</span>', bStartIdx);
if (bEndIdx !== -1) {
  // Find the closing </div> of the wrapper
  bEndIdx = content.indexOf('</div>', bEndIdx) + '</div>'.length;
}

if (bStartIdx === -1 || bEndIdx === -1) {
  console.error('[ERROR] Could not locate the original barefoot foot SVG block in product.html!');
  process.exit(1);
}

const barefootNewSVGMarkup = `<div class="foot-graphic-wrapper active" id="visual-barefoot">
        <!-- SVG for Barefoot Foot -->
        <svg viewBox="0 0 200 240" class="foot-svg barefoot-svg">
          <!-- Outsole Welt (Edge of sole) -->
          <path d="M100 11 C139 11, 155 41, 152 67 C149 97, 139 127, 131 167 C126 197, 121 227, 100 227 C79 227, 74 197, 69 167 C61 127, 51 97, 48 67 C45 41, 61 11, 100 11 Z" fill="none" stroke="rgba(9, 84, 146, 0.15)" stroke-width="3px" />
          <!-- Shoe Body / Upper -->
          <path d="M100 15 C135 15, 150 45, 148 70 C145 100, 135 130, 128 170 C123 200, 118 225, 100 225 C82 225, 77 200, 72 170 C65 130, 55 100, 52 70 C50 45, 65 15, 100 15 Z" class="svg-foot-contour" />
          
          <!-- Laces Stay & Criss-Cross Laces -->
          <path d="M85 165 C85 150, 88 115, 90 95 L110 95 C112 115, 115 150, 115 165 Z" fill="rgba(9, 84, 146, 0.05)" stroke="#095492" stroke-width="1px" />
          <line x1="88" y1="105" x2="112" y2="105" stroke="#095492" stroke-width="1.8px" stroke-linecap="round" />
          <line x1="87" y1="120" x2="113" y2="120" stroke="#095492" stroke-width="1.8px" stroke-linecap="round" />
          <line x1="86" y1="135" x2="114" y2="135" stroke="#095492" stroke-width="1.8px" stroke-linecap="round" />
          <line x1="85" y1="150" x2="115" y2="150" stroke="#095492" stroke-width="1.8px" stroke-linecap="round" />
          <line x1="85" y1="165" x2="115" y2="165" stroke="#095492" stroke-width="1.8px" stroke-linecap="round" />
          
          <!-- Shoe Collar (Opening where foot goes in) -->
          <path d="M82 175 C82 212, 118 212, 118 175 C118 165, 82 165, 82 175 Z" fill="#ffffff" stroke="#095492" stroke-width="1.5px" />
          <path d="M84 175 C84 205, 116 205, 116 175 Z" fill="rgba(9, 84, 146, 0.08)" />
          
          <!-- Shoe Tongue -->
          <path d="M86 160 L114 160 L112 85 C112 85, 100 80, 88 85 Z" fill="none" stroke="#095492" stroke-width="1px" stroke-dasharray="2 1" />
          
          <!-- Wide Spacious Toe Cap Stitching -->
          <path d="M52 70 C70 88, 130 88, 148 70" fill="none" stroke="#095492" stroke-width="1.5px" stroke-dasharray="3 2" />

          <!-- Ground Baseline Zero-Drop indicator -->
          <line x1="40" y1="230" x2="160" y2="230" class="svg-baseline-glow" />
          <line x1="40" y1="230" x2="160" y2="230" class="svg-baseline" />
          
          <!-- Foot Skeleton (Showing natural posture) -->
          <path d="M100 215 L100 160 M100 160 L68 75 M100 160 L84 70 M100 160 L100 68 M100 160 L116 70 M100 160 L132 75" class="svg-bones" />
          <circle cx="100" cy="215" r="4" class="svg-joint" />
          <circle cx="100" cy="160" r="5" class="svg-joint-center" />
          
          <!-- Splayed Toes -->
          <circle cx="62" cy="55" r="9" class="svg-toe" />
          <circle cx="82" cy="46" r="8.5" class="svg-toe" />
          <circle cx="100" cy="43" r="8" class="svg-toe" />
          <circle cx="118" cy="46" r="7.5" class="svg-toe" />
          <circle cx="136" cy="55" r="7" class="svg-toe" />
        </svg>
        <span class="foot-label label-barefoot">Wide Splay & Zero-Drop Posture</span>
      </div>`;

// Apply barefoot replacement
let updatedContent = content.substring(0, bStartIdx) + barefootNewSVGMarkup + content.substring(bEndIdx);

// 2. Target Traditional SVG replacement
const tradOldSVGStart = '<div class="foot-graphic-wrapper" id="visual-traditional">';
const tStartIdx = updatedContent.indexOf(tradOldSVGStart);
let tEndIdx = updatedContent.indexOf('Squeezed Toes & Tilted Heel</span>', tStartIdx);
if (tEndIdx !== -1) {
  tEndIdx = updatedContent.indexOf('</div>', tEndIdx) + '</div>'.length;
}

if (tStartIdx === -1 || tEndIdx === -1) {
  console.error('[ERROR] Could not locate the original traditional foot SVG block in product.html!');
  process.exit(1);
}

const tradNewSVGMarkup = `<div class="foot-graphic-wrapper" id="visual-traditional">
        <!-- SVG for Traditional Squeezed Foot -->
        <svg viewBox="0 0 200 240" class="foot-svg traditional-svg">
          <!-- Pointed Outsole Welt (Edge of sole) -->
          <path d="M100 12 C124 12, 130 50, 128 76 C126 101, 132 131, 128 166 C124 194, 118 216, 102 216 C86 216, 80 194, 76 166 C72 131, 78 101, 76 76 C74 50, 76 12, 100 12 Z" fill="none" stroke="rgba(224, 90, 71, 0.15)" stroke-width="3px" />
          <!-- Squeezed Shoe Body / Upper -->
          <path d="M100 18 C118 18, 124 55, 122 80 C120 105, 126 135, 122 170 C118 198, 114 212, 102 212 C90 212, 86 198, 82 170 C78 135, 84 105, 82 80 C80 55, 82 18, 100 18 Z" class="svg-foot-contour-narrow" />
          
          <!-- Narrow Laces Stay & Laces -->
          <path d="M88 160 C88 148, 90 120, 92 105 L108 105 C110 120, 112 148, 112 160 Z" fill="rgba(224, 90, 71, 0.05)" stroke="#e05a47" stroke-width="1px" />
          <line x1="91" y1="112" x2="109" y2="112" stroke="#e05a47" stroke-width="1.8px" stroke-linecap="round" />
          <line x1="90" y1="124" x2="110" y2="124" stroke="#e05a47" stroke-width="1.8px" stroke-linecap="round" />
          <line x1="89" y1="136" x2="111" y2="136" stroke="#e05a47" stroke-width="1.8px" stroke-linecap="round" />
          <line x1="88" y1="148" x2="112" y2="148" stroke="#e05a47" stroke-width="1.8px" stroke-linecap="round" />
          <line x1="88" y1="160" x2="112" y2="160" stroke="#e05a47" stroke-width="1.8px" stroke-linecap="round" />
          
          <!-- Squeezed Shoe Collar (Opening where foot goes in) -->
          <path d="M86 168 C86 198, 114 198, 114 168 C114 158, 86 158, 86 168 Z" fill="#ffffff" stroke="#e05a47" stroke-width="1.5px" />
          <path d="M88 168 C88 192, 112 192, 112 168 Z" fill="rgba(224, 90, 71, 0.08)" />
          
          <!-- Squeezed Shoe Tongue -->
          <path d="M90 156 L110 156 L108 95 C108 95, 100 90, 92 95 Z" fill="none" stroke="#e05a47" stroke-width="1px" stroke-dasharray="2 1" />
          
          <!-- Pointed Narrow Toe Cap Stitching -->
          <path d="M82 80 C90 89, 110 89, 118 80" fill="none" stroke="#e05a47" stroke-width="1.5px" stroke-dasharray="3 2" />

          <!-- Sloped Ground Baseline -->
          <path d="M40 230 L114 230 L126 212 L160 212" class="svg-baseline-slope" />
          
          <!-- Foot Skeleton (Squeezed bones) -->
          <path d="M102 202 L100 155 M100 155 L86 85 M100 155 L93 83 M100 155 L100 80 M100 155 L107 83 M100 155 L114 85" class="svg-bones-narrow" />
          <circle cx="102" cy="202" r="4" class="svg-joint-narrow" />
          <circle cx="100" cy="155" r="5" class="svg-joint-center-narrow" />
          
          <!-- Squeezed Pinched Toes -->
          <circle cx="84" cy="72" r="7.5" class="svg-toe-narrow" />
          <circle cx="92" cy="66" r="7" class="svg-toe-narrow" />
          <circle cx="100" cy="63" r="6.5" class="svg-toe-narrow" />
          <circle cx="108" cy="66" r="6" class="svg-toe-narrow" />
          <circle cx="116" cy="72" r="5.5" class="svg-toe-narrow" />
        </svg>
        <span class="foot-label label-traditional">Squeezed Toes & Tilted Heel</span>
      </div>`;

// Apply traditional replacement
updatedContent = updatedContent.substring(0, tStartIdx) + tradNewSVGMarkup + updatedContent.substring(tEndIdx);

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('[SUCCESS] Successfully upgraded top-down SVGs with highly detailed realistic sneaker components!');
