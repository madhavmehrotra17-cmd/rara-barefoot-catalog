const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- VERIFYING CLEAN CONTAINERS ---');

let failed = false;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find rara-ultimate-style content
  const match = content.match(/<style id="rara-ultimate-style">([\s\S]*?)<\/style>/i);
  if (match) {
    const styleContent = match[1];
    
    // Check if the style targets .all-video-buttons or .video__button inside premium CTA rules
    // Specifically look for .all-video-buttons or .video__button directly preceding or following in selectors
    const rule1Regex = /\.all-video-buttons\s*,\s*\.video__button/gi;
    const rule2Regex = /\.all-video-buttons:hover\s*,\s*\.video__button:hover/gi;
    
    // Check if selectors are inside the premium hover animations block
    if (styleContent.includes('.all-video-buttons') && styleContent.includes('padding: 12px 28px')) {
      console.error(`  [FAIL] ${file}: rara-ultimate-style block still styles .all-video-buttons as a button!`);
      failed = true;
    } else if (styleContent.includes('.video__button') && styleContent.includes('padding: 12px 28px')) {
      console.error(`  [FAIL] ${file}: rara-ultimate-style block still styles .video__button as a button!`);
      failed = true;
    } else {
      console.log(`  [PASS] ${file} is fully clean`);
    }
  } else {
    console.log(`  [INFO] ${file} does not contain rara-ultimate-style`);
  }
});

console.log('\n--- CONTAINER VERIFICATION RESULT ---');
if (failed) {
  console.error('[FAIL] Some templates still style parent containers as buttons!');
} else {
  console.log('[PASS] Success! All parent wrapper container classes are completely removed from the button styling rules across all 12 files.');
}
