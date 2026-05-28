const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToAdd = `
/* 1. Exactly the original gradient, strictly behind the images */
.card__media, .product-card__media, .card-wrapper .media {
    background-color: #f4f5f6 !important; /* The soft grey base from Gully Labs */
    background-image: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 45%) !important;
    border-radius: 16px !important;
    position: relative !important;
    overflow: hidden !important;
}

/* 2. Fix the "jumping up and down" photos by overlapping them perfectly */
.card__media img, .product-card__media img, .card-wrapper .media img {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important; /* Ensures the whole shoe fits perfectly */
    mix-blend-mode: multiply !important; /* Makes white image backgrounds disappear into the gradient */
    z-index: 2 !important;
    transition: none !important; /* Instant change when scrubbing left to right */
}

/* Make the first image relative so the container doesn't collapse to 0 height */
.card__media img:first-child, .product-card__media img:first-child, .card-wrapper .media img:first-child {
    position: relative !important;
}

/* 3. Kill any leftover white overlays that block the product */
.card__media::before, .product-card__media::before, .card-wrapper .media::before,
.card__media::after, .product-card__media::after, .card-wrapper .media::after {
    display: none !important;
}

/* 4. Scrub hover left-to-right visibility states */
.is-hidden-by-scrub {
    opacity: 0 !important;
    z-index: 1 !important;
}
.is-active-by-scrub {
    opacity: 1 !important;
    z-index: 3 !important;
}

/* 5. Quick Filter Bar styling for flagship page */
.filter-bar-container {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 20px 0 35px 0;
    flex-wrap: wrap;
}
.filter-tab-button {
    font-family: 'Geist', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 18px;
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    color: #555555;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
.filter-tab-button:hover {
    border-color: #000000;
    color: #000000;
}
.filter-tab-button.active {
    background-color: #000000;
    border-color: #000000;
    color: #ffffff;
}
product-card {
    transition: opacity 0.25s ease, transform 0.25s ease !important;
}

/* 6. Split Selection & Switcher styling */
.gender-selection-container {
    display: flex;
    gap: 20px;
    margin: 30px auto;
    width: 100%;
    max-width: 1200px;
    min-height: 450px;
    opacity: 1;
    transition: opacity 0.4s ease, transform 0.4s ease;
}
.gender-selection-container.is-hidden {
    opacity: 0;
    transform: scale(0.95);
    pointer-events: none;
    display: none !important;
}
.gender-selection-card {
    flex: 1;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    height: 500px;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.gender-selection-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}
.gender-selection-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.gender-selection-card:hover .gender-selection-img {
    transform: scale(1.06);
}
.gender-selection-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.9) 100%) !important;
    z-index: 1;
    transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.gender-selection-card:hover .gender-selection-overlay {
    background: linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.95) 100%) !important;
}
.gender-selection-content {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    z-index: 2;
    text-align: center;
    color: #ffffff;
    padding: 0 20px;
}
.gender-selection-title {
    font-family: 'Anton', sans-serif !important;
    font-size: 48px !important;
    letter-spacing: 2px !important;
    text-transform: uppercase !important;
    margin-bottom: 8px !important;
    color: #ffffff !important;
}
.gender-selection-subtitle {
    font-family: 'Geist', sans-serif !important;
    font-size: 20px !important;
    font-weight: 500 !important;
    letter-spacing: 0.5px !important;
    margin-bottom: 25px !important;
    color: #eaeaea !important;
    text-transform: none !important;
}
.gender-selection-btn {
    display: inline-block;
    padding: 12px 30px;
    border: 2px solid #ffffff;
    border-radius: 30px;
    color: #ffffff;
    font-family: 'Geist', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: transparent;
    transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.gender-selection-card:hover .gender-selection-btn {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
}

/* Gender Toggle Bar */
.gender-toggle-bar {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 25px 0 15px 0;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;
    opacity: 1;
    transition: opacity 0.4s ease;
}
.gender-toggle-bar.is-hidden {
    opacity: 0;
    pointer-events: none;
    display: none !important;
}
.gender-toggle-tab {
    font-family: 'Anton', sans-serif;
    font-size: 24px;
    letter-spacing: 1.5px;
    color: #a0a0a0;
    background: none;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    padding: 5px 0 12px 0;
    position: relative;
    transition: color 0.3s;
}
.gender-toggle-tab:hover {
    color: #1c1c1c;
}
.gender-toggle-tab.active {
    color: #1c1c1c;
}
.gender-toggle-tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #1c1c1c;
}

/* 7. Product Scrub Hover Premium Styles */
.product-card--has-scrub .product-card__image--primary,
.product-card--has-scrub .product-card__image--secondary {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
}
.product-card__image--scrub {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    mix-blend-mode: multiply !important;
    opacity: 0 !important;
    z-index: 2 !important;
    transition: opacity 0.12s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.product-card__image--scrub.is-active {
    opacity: 1 !important;
    z-index: 3 !important;
}
.product-scrub-dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
}
.product-card:hover .product-scrub-dots {
    opacity: 1;
}
.product-scrub-dot {
    width: 18px;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 1.5px;
    transition: background-color 0.2s ease, transform 0.2s ease;
}
.product-scrub-dot.is-active {
    background-color: rgba(0, 0, 0, 0.75);
    transform: scaleY(1.3);
}

@media screen and (max-width: 768px) {
    .gender-selection-container {
        flex-direction: column;
        gap: 15px;
        min-height: auto;
    }
    .gender-selection-card {
        height: 320px;
    }
    .gender-selection-title {
        font-size: 32px !important;
    }
}
`;

const jsToAdd = `
(function() {
  const productPhotos = {
    'uruk-blue-barefoot-shoes-men': ['/Uruk blue-1.JPG', '/Uruk blue-2.JPG', '/Uruk blue-3.JPG', '/Uruk blue-4.JPG'],
    'uruk-blue-barefoot-shoes-women': ['/Uruk blue-1.JPG', '/Uruk blue-2.JPG', '/Uruk blue-3.JPG', '/Uruk blue-4.JPG'],
    'uruk-neon-barefoot-shoes-men': ['/Uruk neo-1.JPG', '/uruk neo-2.JPG', '/uruk neo-3.JPG', '/Uruk neo-4.jpg'],
    'uruk-neon-barefoot-shoes-women': ['/Uruk neo-1.JPG', '/uruk neo-2.JPG', '/uruk neo-3.JPG', '/Uruk neo-4.jpg'],
    'uruk-white-barefoot-shoes-men': ['/Uruk white-1.JPG', '/Uruk white-2.JPG', '/Uruk white-3.JPG', '/Uruk white-4.JPG'],
    'uruk-white-barefoot-shoes-women': ['/Uruk white-1.JPG', '/Uruk white-2.JPG', '/Uruk white-3.JPG', '/Uruk white-4.JPG'],
    'xanadu-black-barefoot-shoes-men': ['/Xanadu black -1.JPG', '/Xanadu black -2.JPG', '/Xanadu black -3.JPG', '/Xanadu black -4.JPG'],
    'xanadu-black-barefoot-shoes-women': ['/Xanadu black -1.JPG', '/Xanadu black -2.JPG', '/Xanadu black -3.JPG', '/Xanadu black -4.JPG'],
    'xanadu-white-barefoot-shoes-men': ['/xanadu white-1.JPG', '/xanadu white-2.JPG', '/xanadu white-3.JPG', '/xanadu white-4.JPG'],
    'xanadu-white-barefoot-shoes-women': ['/xanadu white-1.JPG', '/xanadu white-2.JPG', '/xanadu white-3.JPG', '/xanadu white-4.JPG'],
    'zanzibar-blue-barefoot-shoes-men': ['/zanzibar blue-1.jpg', '/zanzibar blue-2.jpg', '/zanzibar blue-3.jpg', '/zanzibar blue-4.jpg'],
    'zanzibar-blue-barefoot-shoes-women': ['/zanzibar blue-1.jpg', '/zanzibar blue-2.jpg', '/zanzibar blue-3.jpg', '/zanzibar blue-4.jpg'],
    'zanzibar-yellow-barefoot-shoes-men': ['/zanzibar yellow-1.JPG', '/zanzibar yellow-2.JPG', '/zanzibar yellow-3.JPG', '/zanzibar yellow-4.JPG'],
    'zanzibar-yellow-barefoot-shoes-women': ['/zanzibar yellow-1.JPG', '/zanzibar yellow-2.JPG', '/zanzibar yellow-3.JPG', '/zanzibar yellow-4.JPG']
  };

  function initScrubHover() {
    const cards = document.querySelectorAll('product-card');
    cards.forEach(card => {
      const handle = card.getAttribute('handle');
      if (!handle || !productPhotos[handle]) return;

      const mediaContainer = card.querySelector('.product-card__media');
      if (!mediaContainer || card.dataset.scrubInitialized === 'true') return;

      card.dataset.scrubInitialized = 'true';
      card.classList.add('product-card--has-scrub');

      const photos = productPhotos[handle];

      // Create and append the 4 scrub images
      const scrubImages = [];
      photos.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'product-card__image product-card__image--scrub';
        if (idx === 0) img.classList.add('is-active');
        img.alt = card.querySelector('.product-title')?.textContent || 'Product Shot';
        img.setAttribute('draggable', 'false');
        img.setAttribute('loading', 'lazy');
        mediaContainer.appendChild(img);
        scrubImages.push(img);
      });

      // Create and append the dots container
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'product-scrub-dots';
      
      const dots = [];
      for (let i = 0; i < 4; i++) {
        const dot = document.createElement('div');
        dot.className = 'product-scrub-dot';
        if (i === 0) dot.classList.add('is-active');
        dotsContainer.appendChild(dot);
        dots.push(dot);
      }
      mediaContainer.appendChild(dotsContainer);

      let lastActiveIndex = 0;

      // Mousemove logic
      mediaContainer.addEventListener('mousemove', (e) => {
        const rect = mediaContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const pct = Math.max(0, Math.min(0.999, x / width));
        const activeIndex = Math.floor(pct * 4);

        if (activeIndex === lastActiveIndex) return;
        lastActiveIndex = activeIndex;

        scrubImages.forEach((img, idx) => {
          if (idx === activeIndex) {
            img.classList.add('is-active');
          } else {
            img.classList.remove('is-active');
          }
        });

        dots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      });

      // Mouseleave logic
      mediaContainer.addEventListener('mouseleave', () => {
        lastActiveIndex = 0;
        scrubImages.forEach((img, idx) => {
          if (idx === 0) {
            img.classList.add('is-active');
          } else {
            img.classList.remove('is-active');
          }
        });
        dots.forEach((dot, idx) => {
          if (idx === 0) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      });
    });
  }

  // Run on DOM load and Observer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrubHover);
  } else {
    initScrubHover();
  }
  
  const observer = new MutationObserver(() => {
    initScrubHover();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Clean up style
    content = content.replace(/<style id="ultimate-fix">[\s\S]*?<\/style>\s*/g, '');

    // Clean up script
    content = content.replace(/<script id="product-scrub-hover-fix">[\s\S]*?<\/script>\s*/g, '');

    // Inject perfect CSS fix
    if (content.includes('</head>')) {
        content = content.replace('</head>', '<style id="ultimate-fix">\n' + cssToAdd + '\n</style>\n</head>');
    }

    // Inject perfect JS fix
    if (content.includes('</body>')) {
        content = content.replace('</body>', '<script id="product-scrub-hover-fix">\n' + jsToAdd + '\n</script>\n</body>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log("real_fix.js styling and scripting injected successfully across all files!");
