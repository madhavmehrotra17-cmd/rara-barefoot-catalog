const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

console.log('--- VERIFYING INTERACTIVE BAREFOOT SCIENCE SIMULATOR ---');

if (!fs.existsSync(productPath)) {
  console.error('[FAIL] product.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(productPath, 'utf8');

const hasWidget = html.includes('class="barefoot-science-widget"');
const hasToggle = html.includes('class="science-toggle-container"');
const hasVisual = html.includes('class="science-visual"');
const hasSvg = html.includes('class="foot-svg barefoot-svg"') && html.includes('class="foot-svg traditional-svg"');
const hasScript = html.includes('data-mode') && html.includes('getElementById(\'visual-\' + mode)');

if (hasWidget && hasToggle && hasVisual && hasSvg && hasScript) {
  console.log('[PASS] Barefoot Science Simulator is successfully verified in product.html!');
} else {
  console.error('[FAIL] Some simulator assets are missing!');
  console.error(`  Widget Container: ${hasWidget}`);
  console.error(`  Toggle Switch: ${hasToggle}`);
  console.error(`  Visual Showcase: ${hasVisual}`);
  console.error(`  SVG Outlines: ${hasSvg}`);
  console.error(`  Lightweight Script: ${hasScript}`);
  process.exit(1);
}
