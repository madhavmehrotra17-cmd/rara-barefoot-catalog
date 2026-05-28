const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const wideToeBoxSVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#095492" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="brand-blue-icon">
            <!-- Curved double-headed arrow at the top -->
            <path d="M4 6c4-3 12-3 16 0" />
            <path d="M6.5 4.5L4 6l2.5 2.5" />
            <path d="M17.5 4.5L20 6l-2.5 2.5" />
            
            <!-- Foot silhouette outline -->
            <path d="M8 13.5c-1 0-1.5 1-1.5 2 0 3 1.5 4.5 2.5 5.5.8.8 1.2 1 2 1s1.2-.2 2-1c1-1 2.5-2.5 2.5-5.5 0-1-.5-2-1.5-2" />
            <path d="M8.5 13.5c0-1 .5-1.5 1-2" />
            <path d="M15.5 13.5c0-1-.5-1.5-1-2" />
            
            <!-- Splayed Toes -->
            <rect x="6.5" y="9.5" width="2" height="3.5" rx="1" fill="#095492" stroke="none" />
            <rect x="9" y="8" width="2" height="4" rx="1" fill="#095492" stroke="none" />
            <rect x="11.5" y="7.5" width="2" height="4.5" rx="1" fill="#095492" stroke="none" />
            <rect x="14" y="8" width="2" height="4" rx="1" fill="#095492" stroke="none" />
            <rect x="16.5" y="9.5" width="2" height="3.5" rx="1" fill="#095492" stroke="none" />
          </svg>`;

const flexibleSoleSVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#095492" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="brand-blue-icon">
            <!-- Bending Shoe/Sole outline -->
            <path d="M3 13.5c1.5-1.5 4-2.5 7-2 4 .5 7 2.5 9 3.5" />
            <path d="M3 13.5c0 1 2 2.5 5 2.5 4 0 8-2 11-3" />
            <path d="M3 13.5c-.5 0-1-.3-1-.5s.5-.5 1-.5" />
            <path d="M3 13c1.5-1.5 4-2.5 7-2 4 .5 7 2.5 9 3.5c-1 1-3.5 1.5-7.5 1-3.5-.4-7-1.5-8.5-2.5z" fill="rgba(9, 84, 146, 0.06)" stroke="none" />
            
            <!-- Underneath Flex Arrows -->
            <path d="M6 18c3.5 1.5 8.5 1.5 12 0" />
            <path d="M8.5 16.5L6 18l2.5 1.5" />
            <path d="M15.5 16.5L18 18l-2.5 1.5" />
          </svg>`;

const zeroDropSVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#095492" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="brand-blue-icon">
            <!-- Flat ground line -->
            <line x1="4" y1="21" x2="20" y2="21" stroke-width="1.5" />
            
            <!-- Posture Silhouette -->
            <!-- Head -->
            <circle cx="12" cy="4.5" r="1.8" />
            <!-- Neck and Spine vertical axis -->
            <line x1="12" y1="2" x2="12" y2="21" stroke-dasharray="2 2" stroke-width="1.2" />
            
            <!-- Body/Torso/Arms/Legs -->
            <path d="M10 7.5h4c1 0 1.5.5 1.5 1.5v4.5c0 .5-.5.5-.5.5H13v6c0 .5-.5.5-.5.5h-1c0 0-.5 0-.5-.5v-6H9c0 0-.5 0-.5-.5V9c0-1 .5-1.5 1.5-1.5z" fill="rgba(9, 84, 146, 0.06)" />
          </svg>`;

console.log('--- REPLACING CHECKMARK TICK ICONS SITEWIDE ---');

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let replaced = false;

  // 1. Wide Toe Box replacements
  const r1 = /(<div class="science-detail-card">\s*<div class="card-icon-wrapper">\s*)[\s\S]*?(<\/div>\s*<div class="card-content">\s*<h5>Wide Toe Box<\/h5>)/gi;
  if (r1.test(content)) {
    content = content.replace(r1, `$1${wideToeBoxSVG}$2`);
    replaced = true;
  }

  // 2. Flexible Sole replacements
  const r2 = /(<div class="science-detail-card">\s*<div class="card-icon-wrapper">\s*)[\s\S]*?(<\/div>\s*<div class="card-content">\s*<h5>Flexible (Sole|5 mm Sole)<\/h5>)/gi;
  if (r2.test(content)) {
    content = content.replace(r2, `$1${flexibleSoleSVG}$2`);
    replaced = true;
  }

  // 3. Natural Zero Drop replacements
  const r3 = /(<div class="science-detail-card">\s*<div class="card-icon-wrapper">\s*)[\s\S]*?(<\/div>\s*<div class="card-content">\s*<h5>Natural Zero Drop<\/h5>)/gi;
  if (r3.test(content)) {
    content = content.replace(r3, `$1${zeroDropSVG}$2`);
    replaced = true;
  }

  if (replaced) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[UPDATED] Successfully replaced checkmark icons with custom clinical icons in ${file}`);
  }
});

console.log('Sitewide icon upgrade successfully completed!');
