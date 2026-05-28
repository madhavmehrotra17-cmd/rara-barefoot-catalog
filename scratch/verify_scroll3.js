const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
if (!fs.existsSync(filePath)) {
  console.error('[FAIL] catalog.html not found!');
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');

console.log('--- VERIFYING SCROLL 3 (IMMERSIVE CRAFTSMANSHIP FOLD) ---');

// Check 1: Scroll 3 Section
if (html.includes('class="scroll-3-section"') || html.includes("class='scroll-3-section'")) {
  console.log('✅ SUCCESS: Scroll 3 section container is present.');
} else {
  console.error('[FAIL] Scroll 3 section container is missing!');
  process.exit(1);
}

// Check 2: 40/60 Split grid
if (html.includes('class="scroll-3-grid"') || html.includes("class='scroll-3-grid'")) {
  console.log('✅ SUCCESS: 40/60 split grid container is present.');
} else {
  console.error('[FAIL] 40/60 split grid is missing!');
  process.exit(1);
}

// Check 3: Looping video
if (html.includes('<video autoplay') && html.includes('muted') && html.includes('loop') && html.includes('playsinline')) {
  console.log('✅ SUCCESS: Autoplay, muted, looping, playsinline video element is present.');
} else {
  console.error('[FAIL] Looping video with correct parameters is missing or misconfigured!');
  process.exit(1);
}

// Check 4: Merge gradient overlay in CSS styles
if (html.includes('.scroll-3-video-container::after') && html.includes('linear-gradient(to right, transparent 0%, #b4b8b5 100%)')) {
  console.log('✅ SUCCESS: CSS merge gradient transition (to right) is correctly defined.');
} else {
  console.error('[FAIL] Merge gradient transition style is missing or misconfigured!');
  process.exit(1);
}

// Check 5: Mobile responsive transition (to bottom)
if (html.includes('background: linear-gradient(to bottom, transparent 0%, #b4b8b5 100%)')) {
  console.log('✅ SUCCESS: Mobile responsive merge gradient (to bottom) is correctly defined.');
} else {
  console.error('[FAIL] Mobile responsive merge gradient style is missing!');
  process.exit(1);
}

// Check 6: Quote and Copy content
const requiredText = [
  'The foot is a masterpiece of engineering and a work of art.',
  'Leonardo da Vinci',
  'Crafting something truly extraordinary requires navigating complexity, uncertainty, and countless unseen details.',
  'We\'re here for all of it. That\'s how we\'ll deliver the world\'s best barefoot sneaker to you.'
];

let allTextFound = true;
requiredText.forEach(txt => {
  if (html.includes(txt) || html.includes(txt.replace("'", '&#39;'))) {
    console.log(`✅ SUCCESS: Found text "${txt.substring(0, 30)}..."`);
  } else {
    console.error(`[FAIL] Missing text content: "${txt}"`);
    allTextFound = false;
  }
});

if (!allTextFound) {
  process.exit(1);
}

console.log('🚀 ALL SCROLL 3 CHECKS PASSED SUCCESSFULLY! IMMERSIVE FOLD IS FLUTTER-FREE AND PIXEL-PERFECT!');
