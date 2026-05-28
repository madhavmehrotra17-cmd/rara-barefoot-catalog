const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- DEPLOYING INTERACTIVE BAREFOOT SCIENCE SIMULATOR ---');

// 1. Define the premium CSS styles for the simulator widget
const simulatorStyles = `

/* --- Interactive Barefoot Science Simulator --- */
.barefoot-science-widget {
    background: #ffffff !important;
    border: 1px solid #eaeaea !important;
    border-radius: 16px !important;
    padding: 24px !important;
    margin: 30px 0 !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.02) !important;
    text-align: left !important;
    box-sizing: border-box !important;
}

.science-header {
    margin-bottom: 24px !important;
    text-align: left !important;
}

.science-badge {
    display: inline-block !important;
    background: rgba(9, 84, 146, 0.08) !important;
    color: #095492 !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    padding: 4px 10px !important;
    border-radius: 20px !important;
    margin-bottom: 8px !important;
    font-family: 'Geist', sans-serif !important;
}

.science-title {
    font-family: 'Anton', sans-serif !important;
    font-size: 26px !important;
    letter-spacing: 1px !important;
    color: #000000 !important;
    text-transform: uppercase !important;
    margin: 0 0 8px 0 !important;
    line-height: 1.1 !important;
}

.science-intro {
    font-family: 'Geist', sans-serif !important;
    font-size: 12.5px !important;
    color: #666666 !important;
    line-height: 1.5 !important;
    margin: 0 !important;
}

/* Toggle Switch Bar */
.science-toggle-container {
    display: flex !important;
    background: #f5f5f5 !important;
    border-radius: 30px !important;
    padding: 4px !important;
    gap: 4px !important;
    margin-bottom: 24px !important;
}

.science-toggle-btn {
    flex: 1 !important;
    border: none !important;
    background: transparent !important;
    padding: 10px 16px !important;
    font-family: 'Geist', sans-serif !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    letter-spacing: 0.03em !important;
    text-transform: uppercase !important;
    border-radius: 30px !important;
    cursor: pointer !important;
    color: #555555 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

.science-toggle-btn.active {
    background: #095492 !important;
    color: #ffffff !important;
    box-shadow: 0 4px 15px rgba(9, 84, 146, 0.2) !important;
}

.science-toggle-btn[data-mode="traditional"].active {
    background: #e05a47 !important; /* Crimson color for traditional alert state */
    box-shadow: 0 4px 15px rgba(224, 90, 71, 0.2) !important;
}

/* Pulse green indicator for barefoot mode */
.pulse-indicator {
    width: 6px !important;
    height: 6px !important;
    background-color: #2ec4b6 !important;
    border-radius: 50% !important;
    display: inline-block !important;
    box-shadow: 0 0 0 0 rgba(46, 196, 182, 0.7) !important;
    animation: pulse-science 1.8s infinite !important;
}

@keyframes pulse-science {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 196, 182, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(46, 196, 182, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46, 196, 182, 0); }
}

/* Showcase Panels layout */
.science-showcase-box {
    display: grid !important;
    grid-template-columns: 1fr 1.2fr !important;
    gap: 20px !important;
    align-items: center !important;
}

/* Left side vector */
.science-visual {
    background: #fafafa !important;
    border: 1px solid #f0f0f0 !important;
    border-radius: 12px !important;
    padding: 15px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 330px !important;
    position: relative !important;
    overflow: hidden !important;
}

.foot-graphic-wrapper {
    display: none !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 100% !important;
    opacity: 0 !important;
    transform: scale(0.96) !important;
    transition: opacity 0.3s ease, transform 0.3s ease !important;
}

.foot-graphic-wrapper.active {
    display: flex !important;
    opacity: 1 !important;
    transform: scale(1) !important;
}

.foot-svg {
    width: 100% !important;
    max-width: 180px !important;
    height: auto !important;
    filter: drop-shadow(0 4px 15px rgba(0,0,0,0.02)) !important;
}

/* SVG Shapes Styling */
.svg-foot-contour {
    stroke: #095492 !important;
    stroke-width: 1.5px !important;
    fill: rgba(9, 84, 146, 0.02) !important;
    stroke-dasharray: 4 2 !important;
    animation: dash-science 30s linear infinite !important;
}

@keyframes dash-science {
  to { stroke-dashoffset: -100; }
}

.svg-foot-contour-narrow {
    stroke: #e05a47 !important;
    stroke-width: 1.5px !important;
    fill: rgba(224, 90, 71, 0.02) !important;
    stroke-dasharray: 4 2 !important;
    animation: dash-science 30s linear infinite !important;
}

.svg-baseline-glow {
    stroke: rgba(9, 84, 146, 0.15) !important;
    stroke-width: 6px !important;
    stroke-linecap: round !important;
}

.svg-baseline {
    stroke: #095492 !important;
    stroke-width: 2px !important;
    stroke-linecap: round !important;
}

.svg-baseline-slope {
    stroke: #e05a47 !important;
    stroke-width: 2px !important;
    stroke-linecap: round !important;
    fill: none !important;
}

.svg-bones {
    stroke: #095492 !important;
    stroke-width: 2px !important;
    stroke-linecap: round !important;
    opacity: 0.65 !important;
}

.svg-bones-narrow {
    stroke: #e05a47 !important;
    stroke-width: 2px !important;
    stroke-linecap: round !important;
    opacity: 0.65 !important;
}

.svg-joint {
    fill: #2ec4b6 !important;
    filter: drop-shadow(0 0 4px rgba(46, 196, 182, 0.5)) !important;
}

.svg-joint-narrow {
    fill: #e05a47 !important;
}

.svg-joint-center {
    fill: #095492 !important;
}

.svg-joint-center-narrow {
    fill: #e05a47 !important;
}

.svg-toe {
    fill: #095492 !important;
    stroke: #ffffff !important;
    stroke-width: 1.5px !important;
    transition: transform 0.2s ease !important;
    cursor: pointer !important;
}

.svg-toe:hover {
    transform: scale(1.15) !important;
    transform-origin: center !important;
}

.svg-toe-narrow {
    fill: #e05a47 !important;
    stroke: #ffffff !important;
    stroke-width: 1.5px !important;
}

.foot-label {
    margin-top: 14px !important;
    font-family: 'Geist', sans-serif !important;
    font-size: 11.5px !important;
    font-weight: 600 !important;
    letter-spacing: 0.02em !important;
    text-transform: uppercase !important;
}

.label-barefoot {
    color: #095492 !important;
}

.label-traditional {
    color: #e05a47 !important;
}

/* Right side features */
.science-details {
    width: 100% !important;
}

.details-pane {
    display: none !important;
    flex-direction: column !important;
    gap: 12px !important;
    opacity: 0 !important;
    transform: translateY(5px) !important;
    transition: opacity 0.3s ease, transform 0.3s ease !important;
}

.details-pane.active {
    display: flex !important;
    opacity: 1 !important;
    transform: translateY(0) !important;
}

/* Feature cards barefoot */
.science-detail-card {
    display: flex !important;
    gap: 14px !important;
    align-items: center !important;
    padding: 12px 16px !important;
    background-color: #fafafa !important;
    border: 1px solid #f0f0f0 !important;
    border-radius: 10px !important;
    min-height: 60px !important;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

.science-detail-card:hover {
    transform: translate3d(0, -2px, 0) !important;
    border-color: #095492 !important;
    background-color: #ffffff !important;
    box-shadow: 0 6px 18px rgba(9, 84, 146, 0.08) !important;
}

.card-icon-wrapper {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    border-radius: 50% !important;
    background: #ffffff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: background-color 0.3s ease !important;
}

.science-detail-card:hover .card-icon-wrapper {
    background-color: rgba(9, 84, 146, 0.08) !important;
}

.brand-blue-icon {
    color: #095492 !important;
}

/* Feature cards traditional */
.science-detail-card-narrow {
    display: flex !important;
    gap: 14px !important;
    align-items: center !important;
    padding: 12px 16px !important;
    background-color: #fafafa !important;
    border: 1px solid #f0f0f0 !important;
    border-radius: 10px !important;
    min-height: 60px !important;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

.science-detail-card-narrow:hover {
    transform: translate3d(0, -2px, 0) !important;
    border-color: #e05a47 !important;
    background-color: #ffffff !important;
    box-shadow: 0 6px 18px rgba(224, 90, 71, 0.08) !important;
}

.card-icon-wrapper-narrow {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    border-radius: 50% !important;
    background: #ffffff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: background-color 0.3s ease !important;
}

.science-detail-card-narrow:hover .card-icon-wrapper-narrow {
    background-color: rgba(224, 90, 71, 0.08) !important;
}

.warning-red-icon {
    color: #e05a47 !important;
}

/* Feature Typography */
.card-content h5 {
    margin: 0 0 3px 0 !important;
    font-family: 'Geist', sans-serif !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #000000 !important;
    transition: color 0.3s ease !important;
}

.science-detail-card:hover .card-content h5 {
    color: #095492 !important;
}

.science-detail-card-narrow:hover .card-content h5 {
    color: #e05a47 !important;
}

.card-content p {
    margin: 0 !important;
    font-family: 'Geist', sans-serif !important;
    font-size: 11px !important;
    color: #666666 !important;
    line-height: 1.4 !important;
}

/* Responsive grid media queries */
@media (max-width: 720px) {
    .science-showcase-box {
        grid-template-columns: 1fr !important;
    }
    .science-visual {
        min-height: 280px !important;
    }
}
`;

// 2. Define the dynamic HTML and script blocks for the simulator
const simulatorHtmlMarkup = `<!-- Interactive Barefoot Science Simulator -->
<div class="barefoot-science-widget">
  
  <!-- Section Badge & Titles -->
  <div class="science-header">
    <span class="science-badge">Barefoot Science</span>
    <h3 class="science-title">Why Foot-Freedom Matters</h3>
    <p class="science-intro">Traditional sneakers squeeze your toes and elevate your heel. Rara Barefoot lets your feet move, splay, and balance naturally.</p>
  </div>

  <!-- Toggle Switch -->
  <div class="science-toggle-container">
    <button type="button" class="science-toggle-btn active" data-mode="barefoot">
      <span class="pulse-indicator"></span>
      Rara Barefoot
    </button>
    <button type="button" class="science-toggle-btn" data-mode="traditional">
      Traditional Sneaker
    </button>
  </div>

  <!-- Main Showcase Box -->
  <div class="science-showcase-box">
    
    <!-- Left Side: Interactive SVG Graphic -->
    <div class="science-visual">
      <div class="foot-graphic-wrapper active" id="visual-barefoot">
        <!-- SVG for Barefoot Foot -->
        <svg viewBox="0 0 200 240" class="foot-svg barefoot-svg">
          <path d="M100 15 C135 15, 150 45, 148 70 C145 100, 135 130, 128 170 C123 200, 118 225, 100 225 C82 225, 77 200, 72 170 C65 130, 55 100, 52 70 C50 45, 65 15, 100 15 Z" class="svg-foot-contour" />
          <line x1="40" y1="230" x2="160" y2="230" class="svg-baseline-glow" />
          <line x1="40" y1="230" x2="160" y2="230" class="svg-baseline" />
          <path d="M100 215 L100 160 M100 160 L68 75 M100 160 L84 70 M100 160 L100 68 M100 160 L116 70 M100 160 L132 75" class="svg-bones" />
          <circle cx="100" cy="215" r="4" class="svg-joint" />
          <circle cx="100" cy="160" r="5" class="svg-joint-center" />
          <circle cx="62" cy="55" r="9" class="svg-toe" />
          <circle cx="82" cy="46" r="8.5" class="svg-toe" />
          <circle cx="100" cy="43" r="8" class="svg-toe" />
          <circle cx="118" cy="46" r="7.5" class="svg-toe" />
          <circle cx="136" cy="55" r="7" class="svg-toe" />
        </svg>
        <span class="foot-label label-barefoot">Wide Splay & Zero-Drop Posture</span>
      </div>

      <div class="foot-graphic-wrapper" id="visual-traditional">
        <!-- SVG for Traditional Squeezed Foot -->
        <svg viewBox="0 0 200 240" class="foot-svg traditional-svg">
          <path d="M100 18 C118 18, 124 55, 122 80 C120 105, 126 135, 122 170 C118 198, 114 212, 102 212 C90 212, 86 198, 82 170 C78 135, 84 105, 82 80 C80 55, 82 18, 100 18 Z" class="svg-foot-contour-narrow" />
          <path d="M40 230 L114 230 L126 212 L160 212" class="svg-baseline-slope" />
          <path d="M102 202 L100 155 M100 155 L86 85 M100 155 L93 83 M100 155 L100 80 M100 155 L107 83 M100 155 L114 85" class="svg-bones-narrow" />
          <circle cx="102" cy="202" r="4" class="svg-joint-narrow" />
          <circle cx="100" cy="155" r="5" class="svg-joint-center-narrow" />
          <circle cx="84" cy="72" r="7.5" class="svg-toe-narrow" />
          <circle cx="92" cy="66" r="7" class="svg-toe-narrow" />
          <circle cx="100" cy="63" r="6.5" class="svg-toe-narrow" />
          <circle cx="108" cy="66" r="6" class="svg-toe-narrow" />
          <circle cx="116" cy="72" r="5.5" class="svg-toe-narrow" />
        </svg>
        <span class="foot-label label-traditional">Squeezed Toes & Tilted Heel</span>
      </div>
    </div>

    <!-- Right Side: Dynamic Explanatory Feature Cards -->
    <div class="science-details">
      <!-- Barefoot Details list -->
      <div class="details-pane active" id="details-barefoot">
        
        <div class="science-detail-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" class="brand-blue-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round"/><path d="M22 4 12 14.01l-3-3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="card-content">
            <h5>Wide Toe Box</h5>
            <p>Toes spread naturally, dramatically improving balance and foot arch stability.</p>
          </div>
        </div>

        <div class="science-detail-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" class="brand-blue-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round"/><path d="M22 4 12 14.01l-3-3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="card-content">
            <h5>Flexible 5 mm Sole</h5>
            <p>High ground sensory feedback wakes up lazy foot nerves and builds muscle strength.</p>
          </div>
        </div>

        <div class="science-detail-card">
          <div class="card-icon-wrapper">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" class="brand-blue-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round"/><path d="M22 4 12 14.01l-3-3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="card-content">
            <h5>Natural Zero Drop</h5>
            <p>Zero heel-slant aligns your ankles, knees, hips, and spine to correct body posture.</p>
          </div>
        </div>

      </div>

      <!-- Traditional Details list -->
      <div class="details-pane" id="details-traditional">
        
        <div class="science-detail-card-narrow">
          <div class="card-icon-wrapper-narrow">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" class="warning-red-icon"><path d="m10.29 3.86 8 14a2 2 0 0 1-1.73 3H3.44a2 2 0 0 1-1.73-3l8-14a2 2 0 0 1 3.58 0zM12 9v4M12 17h.01" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="card-content">
            <h5>Pinched Toe Box</h5>
            <p>Pinches toes together, causing friction, bone bunions, and poor balance control.</p>
          </div>
        </div>

        <div class="science-detail-card-narrow">
          <div class="card-icon-wrapper-narrow">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" class="warning-red-icon"><path d="m10.29 3.86 8 14a2 2 0 0 1-1.73 3H3.44a2 2 0 0 1-1.73-3l8-14a2 2 0 0 1 3.58 0zM12 9v4M12 17h.01" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="card-content">
            <h5>Rigid Stiff Sole</h5>
            <p>Disables natural foot flexing, weakening muscles and arch structures over time.</p>
          </div>
        </div>

        <div class="science-detail-card-narrow">
          <div class="card-icon-wrapper-narrow">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" class="warning-red-icon"><path d="m10.29 3.86 8 14a2 2 0 0 1-1.73 3H3.44a2 2 0 0 1-1.73-3l8-14a2 2 0 0 1 3.58 0zM12 9v4M12 17h.01" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="card-content">
            <h5>Elevated Heel Slop</h5>
            <p>Pitches body weight forward, stressing knee joints and causing lower back strain.</p>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtns = document.querySelectorAll('.science-toggle-btn');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const mode = this.getAttribute('data-mode');
      
      // Update active states of toggle buttons
      toggleBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Toggle visual panels
      document.querySelectorAll('.foot-graphic-wrapper').forEach(wrapper => {
        wrapper.classList.remove('active');
      });
      const targetVisual = document.getElementById('visual-' + mode);
      if (targetVisual) targetVisual.classList.add('active');
      
      // Toggle details panels
      document.querySelectorAll('.details-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      const targetPane = document.getElementById('details-' + mode);
      if (targetPane) targetPane.classList.add('active');
    });
  });
});
</script>
`;

// 3. Update all 12 templates with simulator CSS inside rara-ultimate-style
files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const ultimateStyleTag = '<style id="rara-ultimate-style">';
  if (content.includes(ultimateStyleTag)) {
    const idx = content.indexOf(ultimateStyleTag);
    const endStyleIdx = content.indexOf('</style>', idx);
    
    if (endStyleIdx !== -1) {
      content = content.substring(0, endStyleIdx) + simulatorStyles + content.substring(endStyleIdx);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[STYLE SUCCESS] Injected simulator CSS in ${file}`);
    }
  }
});

// 4. Update product.html markup: replace the features-grid block with our interactive simulator
const productPath = path.join(rootDir, 'product.html');
let productHtml = fs.readFileSync(productPath, 'utf8');

// The block starts with <div class="features-grid"> and ends with the succeeding </div>\s*</div>
const gridMarkup = '<div class="features-grid">';
const gridIdx = productHtml.indexOf(gridMarkup);

if (gridIdx !== -1) {
  // Find the closing </div> of features-grid
  const closingGridIdx = productHtml.indexOf('</div>', gridIdx); // end of features-column 1
  const col2Idx = productHtml.indexOf('<div class="features-column">', closingGridIdx);
  const closingCol2Idx = productHtml.indexOf('</div>', col2Idx);
  const closingGridContainerIdx = productHtml.indexOf('</div>', closingCol2Idx + 5);
  
  if (closingGridContainerIdx !== -1) {
    const targetSubstring = productHtml.substring(gridIdx, closingGridContainerIdx + 6);
    console.log('[FOUND HTML TARGET FOR REPLACEMENT]');
    
    productHtml = productHtml.replace(targetSubstring, simulatorHtmlMarkup);
    fs.writeFileSync(productPath, productHtml, 'utf8');
    console.log('[HTML SUCCESS] Replaced features-grid HTML markup inside product.html!');
  } else {
    // Regex fallback
    const regex = /<div class="features-grid">[\s\S]*?<\/div>\s*<\/div>/i;
    if (regex.test(productHtml)) {
      productHtml = productHtml.replace(regex, simulatorHtmlMarkup);
      fs.writeFileSync(productPath, productHtml, 'utf8');
      console.log('[HTML SUCCESS] Replaced features-grid HTML markup via Regex fallback inside product.html!');
    } else {
      console.error('Error: Could not determine boundaries of features-grid in product.html');
    }
  }
} else {
  console.error('Error: Could not find <div class="features-grid"> in product.html!');
}
