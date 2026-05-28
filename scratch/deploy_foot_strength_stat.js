const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Deploying 57.4% foot strength stat trust badge in product.html...');

// 1. Insert CSS inside <style id="rara-ultimate-style">
const cssTarget = '</style>\n<style id="rara-ultimate-style">';
const cssTargetIdx = content.indexOf(cssTarget);

if (cssTargetIdx === -1) {
  console.error('[ERROR] Could not find rara-ultimate-style in product.html!');
  process.exit(1);
}

const statCSS = `
/* 10. Premium Foot Strength Stat Badge */
.rara-strength-stat-badge {
    display: flex !important;
    align-items: center !important;
    gap: 14px !important;
    background: linear-gradient(135deg, rgba(100, 140, 180, 0.06) 0%, rgba(9, 84, 146, 0.02) 100%) !important;
    border: 1px solid rgba(9, 84, 146, 0.12) !important;
    border-radius: 10px !important;
    padding: 12px 16px !important;
    margin: 15px 0 22px 0 !important;
    max-width: 100% !important;
    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.4s ease !important;
    will-change: transform, box-shadow !important;
}

.rara-strength-stat-badge:hover {
    transform: translateY(-2px) !important;
    border-color: rgba(9, 84, 146, 0.25) !important;
    box-shadow: 0 8px 20px rgba(9, 84, 146, 0.06) !important;
}

.stat-badge-icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: #095492 !important;
    background: rgba(9, 84, 146, 0.08) !important;
    width: 34px !important;
    height: 34px !important;
    border-radius: 50% !important;
    flex-shrink: 0 !important;
    animation: pulse-stat 2s infinite ease-in-out !important;
}

@keyframes pulse-stat {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(9, 84, 146, 0.2); }
    50% { transform: scale(1.05); box-shadow: 0 0 8px 2px rgba(9, 84, 146, 0.1); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(9, 84, 146, 0.2); }
}

.stat-badge-text {
    display: flex !important;
    flex-direction: column !important;
    gap: 3px !important;
}

.stat-badge-highlight {
    font-family: 'Outfit', sans-serif !important;
    font-size: 14.5px !important;
    font-weight: 700 !important;
    color: #095492 !important;
    letter-spacing: 0.01em !important;
}

.stat-badge-sub {
    font-family: 'Outfit', sans-serif !important;
    font-size: 12.5px !important;
    font-weight: 400 !important;
    color: #4a5568 !important;
    line-height: 1.35 !important;
}

`;

// Add CSS right after target
content = content.substring(0, cssTargetIdx + cssTarget.length) + statCSS + content.substring(cssTargetIdx + cssTarget.length);

// 2. Insert HTML markup after both price blocks
const priceBlockMarker = 'data-block-type="price"';
let searchPos = 250000;

const badgeHTML = `<!-- Premium Foot Strength Stat trust badge -->
<div class="product-info__block-item" data-block-id="liquid_foot_strength_stat" data-block-type="liquid">
  <div class="liquid">
    <div class="rara-strength-stat-badge">
      <div class="stat-badge-icon">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"></path>
          <polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"></polyline>
        </svg>
      </div>
      <div class="stat-badge-text">
        <span class="stat-badge-highlight">57.4% Stronger Feet in 6 Months.</span>
        <span class="stat-badge-sub">The scientifically proven power of natural movement.</span>
      </div>
    </div>
  </div>
</div>
`;

// Insert after first price block
const firstPriceIdx = content.indexOf(priceBlockMarker, searchPos);
if (firstPriceIdx !== -1) {
  const firstPriceClose = content.indexOf('</div></div>', firstPriceIdx);
  if (firstPriceClose !== -1) {
    const insertPos = firstPriceClose + '</div></div>'.length;
    content = content.substring(0, insertPos) + badgeHTML + content.substring(insertPos);
    console.log('Successfully inserted stat badge after the first (desktop) price block.');
  }
}

// Search again for the second price block (which shifted because of the first insert)
const secondPriceIdx = content.indexOf(priceBlockMarker, firstPriceIdx + badgeHTML.length + 1000);
if (secondPriceIdx !== -1) {
  const secondPriceClose = content.indexOf('</div></div>', secondPriceIdx);
  if (secondPriceClose !== -1) {
    const insertPos = secondPriceClose + '</div></div>'.length;
    content = content.substring(0, insertPos) + badgeHTML + content.substring(insertPos);
    console.log('Successfully inserted stat badge after the second (mobile) price block.');
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('[SUCCESS] Successfully deployed premium foot strength stat trust badges in product.html!');
