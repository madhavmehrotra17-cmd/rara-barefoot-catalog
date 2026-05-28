const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Upgrading barefoot top-down sneaker vector to a LEFT foot shape (slightly bent towards right, big-toe chamber on the right)...');

const startMarker = '<!-- SVG for Barefoot Foot - Original RARA URUK BLUE Side-by-Side Top & Side Views -->';
const endMarker = '<!-- ==================== RIGHT HALF: SIDEWAYS (SIDE VIEW) ==================== -->';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('[ERROR] Could not find the barefoot top-down SVG boundaries in product.html!');
  process.exit(1);
}

const upgradedBarefootTopDown = `<!-- SVG for Barefoot Foot - Original RARA URUK BLUE Side-by-Side Top & Side Views -->
        <svg viewBox="0 0 360 240" class="foot-svg barefoot-svg">
          <!-- ==================== LEFT HALF: TOP-DOWN VIEW ==================== -->
          <g transform="translate(5, 5) scale(0.85)">
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
            
            <!-- Rara Logo on the Tongue -->
            <rect x="94" y="80" width="12" height="12" rx="2.5" fill="#ffffff" stroke="#648CB4" stroke-width="0.5px" />
            <path d="M 97,86 H 103 M 97,89 H 103 M 100,83 V 89" stroke="#648CB4" stroke-width="1.2px" stroke-linecap="round" />
            
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
            
            <!-- Sublabel -->
            <text x="100" y="246" font-size="12px" font-family="'Geist', sans-serif" font-weight="700" fill="#095492" text-anchor="middle" letter-spacing="0.04em">WIDE TOE BOX</text>
          </g>
          
          `;

const newContent = content.substring(0, startIdx) + upgradedBarefootTopDown + content.substring(endIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('[SUCCESS] Successfully updated top-down Rara Uruk Blue sneaker to have an asymmetrical shape that bends naturally to the right to make room for the big toe (thumb) of a left foot!');
