const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Deploying clean asymmetrical barefoot illustration with Top View & Side View headings to product.html...');

const startMarker = '<div class="foot-graphic-wrapper active" id="visual-barefoot">';
const startIdx = content.indexOf(startMarker);
let endIdx = -1;

if (startIdx !== -1) {
  // Find the closing </div> of the foot-graphic-wrapper
  const svgCloseIdx = content.indexOf('</svg>', startIdx);
  if (svgCloseIdx !== -1) {
    const endWrapperIdx = content.indexOf('</div>', svgCloseIdx);
    if (endWrapperIdx !== -1) {
      endIdx = endWrapperIdx + '</div>'.length;
    }
  }
}

if (startIdx === -1 || endIdx === -1) {
  console.error('[ERROR] Could not find the visual-barefoot container boundaries in product.html!');
  process.exit(1);
}

const cleanVisualSVG = `<div class="foot-graphic-wrapper active" id="visual-barefoot">
        <!-- SVG for Barefoot Foot - Original RARA URUK BLUE Side-by-Side Top & Side Views (Clean Website Version) -->
        <svg viewBox="0 0 360 240" class="foot-svg barefoot-svg">
          <!-- Central Divider Line -->
          <line x1="180" y1="10" x2="180" y2="230" stroke="rgba(100, 140, 180, 0.18)" stroke-width="1px" />
          
          <!-- ==================== LEFT HEADER: TOP VIEW ==================== -->
          <rect x="10" y="8" width="160" height="11" fill="rgba(100, 140, 180, 0.05)" />
          <line x1="10" y1="20" x2="170" y2="20" stroke="rgba(100, 140, 180, 0.25)" stroke-width="1px" />
          <text x="14" y="17" font-size="7.5px" font-family="'Geist', sans-serif" font-weight="700" fill="#095492" letter-spacing="0.04em">Top View</text>

          <!-- ==================== RIGHT HEADER: SIDE VIEW ==================== -->
          <rect x="190" y="8" width="160" height="11" fill="rgba(100, 140, 180, 0.05)" />
          <line x1="190" y1="20" x2="350" y2="20" stroke="rgba(100, 140, 180, 0.25)" stroke-width="1px" />
          <text x="194" y="17" font-size="7.5px" font-family="'Geist', sans-serif" font-weight="700" fill="#095492" letter-spacing="0.04em">Side View</text>

          <!-- ==================== LEFT HALF: TOP-DOWN VIEW ==================== -->
          <g transform="translate(5, 12) scale(0.85)">
            <!-- Outer Outsole Welt in original RARA gum rubber color (Asymmetric Left Foot shape) -->
            <path d="M104 11 C68 11, 55 41, 58 67 C60 97, 66 127, 71 167 C75 197, 80 227, 100 227 C120 227, 125 197, 130 167 C139 127, 151 97, 155 67 C158 41, 142 11, 104 11 Z" fill="none" stroke="#C68A4C" stroke-width="3px" />
            <!-- Shoe Body / Upper in Rara mesh blue tint (Asymmetric Left Foot shape) -->
            <path d="M104 15 C71 15, 59 45, 62 70 C64 100, 69 130, 74 170 C78 200, 83 225, 100 225 C118 225, 123 200, 128 170 C135 130, 148 100, 152 70 C155 45, 138 15, 104 15 Z" fill="rgba(100, 140, 180, 0.08)" stroke="#648CB4" stroke-width="2.5px" />
            
            <!-- Inner Foot Outline (Dashed showing healthy asymmetric splay) -->
            <path d="M104 22 C75 22, 64 42, 66 66 C68 92, 72 121, 77 159 C81 187, 86 211, 100 211 C116 211, 121 187, 125 159 C133 121, 142 92, 146 66 C149 42, 135 22, 104 22 Z" class="svg-foot-contour" />
            
            <!-- Detailed Shoe Collar Opening (Padded ankle entry in Uruk Blue mesh) -->
            <path d="M82 175 C82 210, 118 210, 118 175 C118 165, 82 165, 82 175 Z" fill="#ffffff" stroke="#648CB4" stroke-width="1.8px" />
            <path d="M84 175 C84 203, 116 203, 116 175 Z" fill="rgba(100, 140, 180, 0.12)" />
            <line x1="82" y1="175" x2="118" y2="175" stroke="#648CB4" stroke-width="1px" />
            
            <!-- Soft Detailed Shoe Tongue Panel (Mirrored coordinates) -->
            <path d="M115 160 L85 160 L89 96 C89 96, 100 92, 111 96 Z" fill="rgba(255, 255, 255, 0.95)" stroke="#648CB4" stroke-width="1px" stroke-dasharray="2 1.5" />
            
            <!-- Criss-Cross Shoelaces (Rara athletic laces) -->
            <line x1="87" y1="106" x2="113" y2="116" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            <line x1="113" y1="106" x2="87" y2="116" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            <line x1="86" y1="123" x2="114" y2="133" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            <line x1="114" y1="123" x2="86" y2="133" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            <line x1="85" y1="140" x2="115" y2="150" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            <line x1="115" y1="140" x2="85" y2="150" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            <line x1="84" y1="157" x2="116" y2="157" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            
            <!-- Shoelace Bow Knot -->
            <path d="M100 95 C92 84, 80 88, 97 95 Z" fill="none" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            <path d="M100 95 C108 84, 120 88, 103 95 Z" fill="none" stroke="#648CB4" stroke-width="2px" stroke-linecap="round" />
            <circle cx="100" cy="95" r="2.5" fill="#648CB4" />
            
            <!-- Wide Spacious Asymmetrical Toe Cap Stitching (Mirrored to bend to the right) -->
            <path d="M151 71 C131 91, 75 87, 62 77" fill="none" stroke="#648CB4" stroke-width="1.5px" stroke-dasharray="3.5 2" />
            <path d="M150 75 C130 95, 76 91, 63 81" fill="none" stroke="#648CB4" stroke-width="1px" stroke-dasharray="2 1.5" />

            <!-- Zero-Drop flat baseline -->
            <line x1="40" y1="230" x2="160" y2="230" class="svg-baseline-glow" />
            <line x1="40" y1="230" x2="160" y2="230" class="svg-baseline" />
            
            <!-- Anatomical skeleton overlay (Adjusted for asymmetrical big toe on the right) -->
            <path d="M100 215 L100 160 M100 160 L132 75 M100 160 L116 70 M100 160 L100 68 M100 160 L84 70 M100 160 L68 75" class="svg-bones" />
            <circle cx="100" cy="215" r="4" class="svg-joint" />
            <circle cx="100" cy="160" r="5" class="svg-joint-center" />
            
            <!-- Fully Splayed Toes (Right has the largest/thumb toe, left pinky slopes down) -->
            <circle cx="138" cy="55" r="9" class="svg-toe" />
            <circle cx="118" cy="46" r="8.5" class="svg-toe" />
            <circle cx="100" cy="43" r="8" class="svg-toe" />
            <circle cx="82" cy="46" r="7.5" class="svg-toe" />
            <circle cx="62" cy="55" r="7" class="svg-toe" />
          </g>
          
          <!-- ==================== RIGHT HALF: SIDEWAYS (SIDE VIEW) ==================== -->
          <g transform="translate(182, 22) scale(0.92)">
            <!-- Flat Ground Baseline -->
            <line x1="5" y1="190" x2="165" y2="190" stroke="rgba(9, 84, 146, 0.15)" stroke-width="6px" stroke-linecap="round" />
            <line x1="5" y1="190" x2="165" y2="190" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
            
            <!-- Original RARA Gum Rubber Flat Outsole (Honeycomb texture, zero-drop) -->
            <path d="M 12,190 L 158,190 L 154,178 C 120,175, 80,165, 45,178 C 30,183, 16,182, 12,185 Z" fill="#C68A4C" stroke="#a46d37" stroke-width="1.2px" />
            <!-- Midfoot gum sole upward wrap -->
            <path d="M 45,178 C 60,170, 75,170, 90,178 L 88,185 C 75,178, 60,178, 47,185 Z" fill="#C68A4C" />
            
            <!-- Sleek Low-Top Mesh Upper in RARA Uruk Blue -->
            <path d="M 16,180 C 16,180, 11,165, 11,150 C 11,125, 29,125, 59,102 C 79,100, 97,78, 119,78 C 129,78, 137,84, 145,100 L 152,132 C 155,145, 155,162, 151,178 Z" fill="#648CB4" stroke="#095492" stroke-width="2px" stroke-linejoin="round" />
            <path d="M 16,180 C 16,180, 11,165, 11,150 C 11,125, 29,125, 59,102 C 79,100, 97,78, 119,78 C 129,78, 137,84, 145,100 L 152,132 C 155,145, 155,162, 151,178 Z" fill="rgba(100, 140, 180, 0.15)" stroke="none" />
            
            <!-- Iconic RARA Midfoot Overlay Panel (Synthetic leather layer) -->
            <path d="M 59,102 L 88,98 L 92,175 L 45,178 Z" fill="#4B779F" stroke="#095492" stroke-width="1px" opacity="0.9" />
            
            <!-- Stitching panel details on upper mesh -->
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
          </g>
        </svg>
      </div>`;

const newContent = content.substring(0, startIdx) + cleanVisualSVG + content.substring(endIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('[SUCCESS] Cleaned side-by-side Rara Uruk Blue sneaker SVG successfully deployed in product.html!');
