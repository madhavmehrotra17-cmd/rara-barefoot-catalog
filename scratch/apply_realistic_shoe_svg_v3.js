const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Upgrading barefoot SVG with premium realistic shoe details and dynamic side-profile insets...');

const barefootOldSVGStart = '<div class="foot-graphic-wrapper active" id="visual-barefoot">';
const bStartIdx = content.indexOf(barefootOldSVGStart);
let bEndIdx = -1;

if (bStartIdx !== -1) {
  // Find the closing </div> for visual-barefoot
  const footLabelIdx = content.indexOf('Wide Splay & Zero-Drop Posture</span>', bStartIdx);
  if (footLabelIdx !== -1) {
    bEndIdx = content.indexOf('</div>', footLabelIdx) + '</div>'.length;
  }
}

if (bStartIdx === -1 || bEndIdx === -1) {
  console.error('[ERROR] Could not find visual-barefoot block in product.html!');
  process.exit(1);
}

const barefootNewSVGMarkup = `<div class="foot-graphic-wrapper active" id="visual-barefoot">
        <!-- SVG for Barefoot Foot -->
        <svg viewBox="0 0 200 240" class="foot-svg barefoot-svg">
          <!-- Outer Shoe Outsole Welt (Generous foot-shaped sole outline) -->
          <path d="M100 12 C138 12, 153 38, 151 68 C148 98, 137 128, 130 168 C125 198, 120 226, 100 226 C80 226, 75 198, 70 168 C63 128, 52 98, 49 68 C47 38, 62 12, 100 12 Z" fill="none" stroke="rgba(9, 84, 146, 0.18)" stroke-width="2.5px" />
          
          <!-- Realistic Shoe Upper Body Contour -->
          <path d="M100 16 C134 16, 148 42, 146 68 C143 97, 134 126, 127 166 C122 196, 117 223, 100 223 C83 223, 78 196, 73 166 C66 126, 57 97, 54 68 C52 42, 66 16, 100 16 Z" class="svg-shoe-body" />
          
          <!-- Inner Foot Outline (Dashed showing healthy toe space) -->
          <path d="M100 22 C130 22, 144 42, 142 66 C140 92, 132 121, 125 159 C121 187, 116 211, 100 211 C84 211, 79 187, 75 159 C68 121, 60 92, 58 66 C56 42, 70 22, 100 22 Z" class="svg-foot-contour" />
          
          <!-- Detailed Shoe Collar Opening (Padded heel ankle entry) -->
          <path d="M82 175 C82 210, 118 210, 118 175 C118 165, 82 165, 82 175 Z" fill="#ffffff" stroke="#095492" stroke-width="1.8px" />
          <path d="M84 175 C84 203, 116 203, 116 175 Z" fill="rgba(9, 84, 146, 0.08)" />
          <line x1="82" y1="175" x2="118" y2="175" stroke="#095492" stroke-width="1px" />
          
          <!-- Soft Detailed Shoe Tongue Panel -->
          <path d="M85 160 L115 160 L111 86 C111 86, 100 81, 89 86 Z" fill="rgba(255, 255, 255, 0.95)" stroke="#095492" stroke-width="1px" stroke-dasharray="2 1.5" />
          
          <!-- Criss-Cross Shoelaces (Strong realistic detailing) -->
          <path d="M85 160 L88 100 L112 100 L115 160 Z" fill="none" stroke="none" />
          <line x1="87" y1="106" x2="113" y2="116" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          <line x1="113" y1="106" x2="87" y2="116" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          <line x1="86" y1="123" x2="114" y2="133" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          <line x1="114" y1="123" x2="86" y2="133" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          <line x1="85" y1="140" x2="115" y2="150" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          <line x1="115" y1="140" x2="85" y2="150" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          <line x1="84" y1="157" x2="116" y2="157" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          
          <!-- Shoelace Bow/Knot Details -->
          <path d="M100 95 C92 84, 80 88, 97 95 Z" fill="none" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          <path d="M100 95 C108 84, 120 88, 103 95 Z" fill="none" stroke="#095492" stroke-width="2px" stroke-linecap="round" />
          <circle cx="100" cy="95" r="2.5" fill="#095492" />
          
          <!-- Wide Spacious Toe Cap Stitching Panels -->
          <path d="M53 71 C71 89, 129 89, 147 71" fill="none" stroke="#095492" stroke-width="1.5px" stroke-dasharray="3.5 2" />
          <path d="M54 75 C72 93, 128 93, 146 75" fill="none" stroke="#095492" stroke-width="1px" stroke-dasharray="2 1.5" />

          <!-- Zero-Drop perfectly flat baseline -->
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

          <!-- DUAL VIEW INSET: Sleek Realistic Side-Profile Shoe Silhouette at the Bottom-Right -->
          <g transform="translate(136, 172) scale(0.33)" class="svg-inset-group">
            <!-- Background highlight ring -->
            <circle cx="70" cy="65" r="78" fill="#ffffff" stroke="rgba(9, 84, 146, 0.12)" stroke-width="2px" />
            <circle cx="70" cy="65" r="74" fill="rgba(9, 84, 146, 0.02)" />
            
            <!-- Side Profile ground line -->
            <line x1="5" y1="115" x2="135" y2="115" stroke="#095492" stroke-width="5px" stroke-linecap="round" />
            
            <!-- Flat 0mm drop thin sole (Fully zero-drop heel-to-toe line) -->
            <path d="M 12,115 L 128,115 L 124,103 Q 70,103 16,105 Z" fill="#095492" />
            
            <!-- Sleek low-top shoe body upper with stitching and panels -->
            <path d="M 16,105 C 16,105, 12,98, 12,88 C 12,74, 25,60, 48,58 C 65,56, 80,42, 98,42 C 108,42, 114,46, 120,58 L 126,80 C 128,88, 128,96, 124,103 Z" fill="none" stroke="#095492" stroke-width="4px" stroke-linejoin="round" />
            <path d="M 16,105 C 16,105, 12,98, 12,88 C 12,74, 25,60, 48,58 C 65,56, 80,42, 98,42 C 108,42, 114,46, 120,58 L 126,80 C 128,88, 128,96, 124,103 Z" fill="rgba(255,255,255,0.7)" />
            
            <!-- Stitching panel details on upper -->
            <path d="M 48,58 C 52,72, 68,90, 110,92" fill="none" stroke="#095492" stroke-width="2.5px" stroke-dasharray="4 3" />
            <path d="M 98,42 L 105,62 L 124,103" fill="none" stroke="#095492" stroke-width="2.5px" />
            
            <!-- Ankle collar opening & pull tab -->
            <path d="M 75,56 C 75,56, 80,44, 94,44 C 98,44, 102,48, 105,56" fill="none" stroke="#095492" stroke-width="3px" stroke-linecap="round" />
            <path d="M 75,56 L 82,75" fill="none" stroke="#095492" stroke-width="3.5px" stroke-linecap="round" />
            
            <!-- Sizable Roomy Foot outline inside (dashed) -->
            <path d="M 22,105 C 22,105, 20,88, 42,86 C 58,84, 76,70, 92,70 C 102,70, 112,85, 116,105" fill="none" stroke="#2ec4b6" stroke-width="2.5px" stroke-dasharray="3 2" />
            
            <!-- Labels inside the inset -->
            <text x="70" y="24" font-size="19" font-family="'Outfit', sans-serif" font-weight="900" fill="#095492" text-anchor="middle" letter-spacing="1px">ZERO-DROP</text>
            <text x="70" y="137" font-size="18" font-family="'Outfit', sans-serif" font-weight="900" fill="#2ec4b6" text-anchor="middle" letter-spacing="0.5px">FLEXIBLE SOLE</text>
          </g>
        </svg>
        <span class="foot-label label-barefoot">Wide Splay & Zero-Drop Posture</span>
      </div>`;

const newContent = content.substring(0, bStartIdx) + barefootNewSVGMarkup + content.substring(bEndIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('[SUCCESS] Successfully upgraded barefoot SVG with high-realism shoelaces, collar padding, wide toe-cap seams, and a beautiful zero-drop / flexible sole side profile inset!');
