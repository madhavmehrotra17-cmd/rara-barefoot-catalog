const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- Standardizing Gender Selection Buttons ---');

const replacement = `.gender-selection-btn {
    display: inline-block;
    padding: 12px 28px !important;
    border: 2px solid #ffffff !important;
    border-radius: 8px !important; /* Soft, classy rounded corners matching main page */
    color: #ffffff !important;
    font-family: 'Geist', sans-serif !important;
    font-weight: 600 !important;
    font-size: 1.02rem !important;
    letter-spacing: 1px !important;
    text-transform: uppercase !important;
    background: transparent !important;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    will-change: transform, box-shadow !important; /* GPU Acceleration */
    backface-visibility: hidden !important;
    transform: translate3d(0, 0, 0) !important;
}
.gender-selection-card:hover .gender-selection-btn,
.gender-selection-btn:hover {
    transform: translate3d(0, -2px, 0) scale(1.015) !important; /* Elegant lift */
    box-shadow: 0 8px 20px rgba(9, 84, 146, 0.18) !important; /* Royal Blue shadow glow */
    background: #ffffff !important;
    color: #095492 !important; /* Royal Blue text */
    border-color: #095492 !important; /* Royal Blue border */
}`;

const regex = /\.gender-selection-btn\s*\{[\s\S]*?\}\s*\.gender-selection-card:hover\s*\.gender-selection-btn\s*\{[\s\S]*?\}/gi;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[SUCCESS] Standardized gender selection buttons in ${file}`);
  } else {
    console.log(`[WARNING] Style pattern not matched in ${file}`);
  }
});

console.log('\nStandardization completed successfully.');
