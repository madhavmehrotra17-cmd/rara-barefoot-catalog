const fs = require('fs');
const path = require('path');

const productPath = path.join(__dirname, '..', 'product.html');

if (!fs.existsSync(productPath)) {
  console.error('Error: product.html not found!');
  process.exit(1);
}

let html = fs.readFileSync(productPath, 'utf8');

// 1. Sleek Slideshow CSS
const slideshowStyles = `
/* --- Premium E-Commerce Interactive Slideshow Layout --- */
@media screen and (min-width: 1000px) {
    #shopify-section-template--19195983724718__main {
        --product-grid: "product-gallery product-info" auto "product-content product-info" minmax(0, 1fr) / minmax(0, 0.54fr) minmax(0, 0.46fr) !important;
    }
    
    .product-info {
        padding-left: 35px !important;
    }
    
    #shopify-section-template--19195983724718__main .product-gallery__media:not([hidden]) {
        grid-column: auto !important;
    }
    #shopify-section-template--19195983724718__main .product-gallery__media:not([hidden]) ~ .product-gallery__media {
        grid-column: auto !important;
    }
    
    .product-gallery {
        position: relative !important;
        margin-left: 0 !important;
        margin-top: 0 !important;
        padding-right: 0 !important;
        width: 100% !important;
    }
}

.product-gallery__image-list {
    position: relative !important;
    width: 100% !important;
    overflow: hidden !important;
}

.product-gallery__carousel {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
    scroll-behavior: smooth !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    width: 100% !important;
    border-radius: 12px !important;
    border: 1px solid #f0f0f0 !important;
    background: #ffffff !important;
}

.product-gallery__carousel::-webkit-scrollbar {
    display: none !important;
}

.product-gallery__media {
    flex: 0 0 100% !important;
    width: 100% !important;
    scroll-snap-align: center !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.product-gallery__media img {
    width: 100% !important;
    height: auto !important;
    max-height: 520px !important;
    object-fit: contain !important;
    border-radius: 12px !important;
}

/* Floating Navigation Arrows */
.gallery-nav-arrow {
    position: absolute !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    width: 44px !important;
    height: 44px !important;
    border-radius: 50% !important;
    background: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    z-index: 10 !important;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    color: #000000 !important;
}

.gallery-nav-arrow:hover {
    background: #ffffff !important;
    box-shadow: 0 6px 20px rgba(9, 84, 146, 0.16) !important;
    color: #095492 !important;
    transform: translateY(-50%) scale(1.05) !important;
}

.gallery-nav-arrow.arrow-prev {
    left: 15px !important;
}

.gallery-nav-arrow.arrow-next {
    right: 15px !important;
}

.gallery-nav-arrow svg {
    width: 18px !important;
    height: 18px !important;
    fill: none !important;
    stroke: currentColor !important;
    stroke-width: 2px !important;
}

/* Slider Thumbnail Accents */
.gallery-thumbnails-wrapper {
    margin-top: 14px !important;
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
}

.gallery-thumbnails {
    display: flex !important;
    gap: 8px !important;
    overflow-x: auto !important;
    padding: 4px !important;
    scrollbar-width: none !important;
    max-width: 100% !important;
}

.gallery-thumbnails::-webkit-scrollbar {
    display: none !important;
}

.thumbnail-item {
    width: 54px !important;
    height: 54px !important;
    min-width: 54px !important;
    border-radius: 8px !important;
    border: 2px solid transparent !important;
    overflow: hidden !important;
    cursor: pointer !important;
    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    opacity: 0.65 !important;
    background: #fcfcfc !important;
    padding: 2px !important;
}

.thumbnail-item img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 5px !important;
}

.thumbnail-item:hover {
    opacity: 0.9 !important;
    transform: translateY(-1px) !important;
}

.thumbnail-item.active {
    opacity: 1 !important;
    border-color: #095492 !important;
    box-shadow: 0 4px 12px rgba(9, 84, 146, 0.15) !important;
    transform: scale(1.03) !important;
}

@media screen and (max-width: 999px) {
    .product-gallery__carousel {
        border-radius: 8px !important;
    }
    .gallery-nav-arrow {
        display: none !important;
    }
}
`;

// Append CSS inside <style id="rara-ultimate-style">
const ultimateStyleTag = '<style id="rara-ultimate-style">';
if (html.includes(ultimateStyleTag)) {
  const idx = html.indexOf(ultimateStyleTag);
  const endStyleIdx = html.indexOf('</style>', idx);
  if (endStyleIdx !== -1) {
    html = html.substring(0, endStyleIdx) + slideshowStyles + html.substring(endStyleIdx);
    console.log('[SUCCESS] Appended slideshow CSS inside rara-ultimate-style');
  }
}

// 2. Sleek Slideshow JavaScript
const slideshowScript = `
<!-- Premium Slideshow Interaction Handler -->
<script id="rara-slideshow-script">
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.product-gallery');
    const imageList = document.querySelector('.product-gallery__image-list');
    const carousel = document.querySelector('.product-gallery__carousel');
    
    if (!gallery || !imageList || !carousel) {
        console.log('[INFO] Product gallery elements not found');
        return;
    }
    
    console.log('[INITIALIZING] Premium Rara Slideshow Layout...');

    // 1. Add Navigation Arrows
    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'gallery-nav-arrow arrow-prev';
    prevButton.innerHTML = \`<svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>\`;
    
    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'gallery-nav-arrow arrow-next';
    nextButton.innerHTML = \`<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>\`;
    
    imageList.appendChild(prevButton);
    imageList.appendChild(nextButton);

    // 2. Generate Thumbnails Dynamically
    const mediaItems = carousel.querySelectorAll('.product-gallery__media');
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = 'gallery-thumbnails-wrapper';
    
    const thumbContainer = document.createElement('div');
    thumbContainer.className = 'gallery-thumbnails';
    thumbWrapper.appendChild(thumbContainer);
    
    const thumbs = [];
    
    mediaItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (!img) return;
        
        const thumbItem = document.createElement('div');
        thumbItem.className = 'thumbnail-item' + (index === 0 ? ' active' : '');
        
        const thumbImg = document.createElement('img');
        thumbImg.src = img.src || img.getAttribute('data-src');
        thumbImg.alt = 'Thumbnail ' + (index + 1);
        
        thumbItem.appendChild(thumbImg);
        thumbContainer.appendChild(thumbItem);
        thumbs.push(thumbItem);
        
        // Thumbnail click scrolling handler
        thumbItem.addEventListener('click', () => {
            const slideWidth = carousel.clientWidth;
            carousel.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
            updateActiveThumb(index);
        });
    });
    
    gallery.appendChild(thumbWrapper);

    // 3. Arrow Click Handlers
    prevButton.addEventListener('click', () => {
        const slideWidth = carousel.clientWidth;
        const currentIndex = Math.round(carousel.scrollLeft / slideWidth);
        const prevIndex = Math.max(0, currentIndex - 1);
        carousel.scrollTo({
            left: prevIndex * slideWidth,
            behavior: 'smooth'
        });
        updateActiveThumb(prevIndex);
    });
    
    nextButton.addEventListener('click', () => {
        const slideWidth = carousel.clientWidth;
        const currentIndex = Math.round(carousel.scrollLeft / slideWidth);
        const nextIndex = Math.min(mediaItems.length - 1, currentIndex + 1);
        carousel.scrollTo({
            left: nextIndex * slideWidth,
            behavior: 'smooth'
        });
        updateActiveThumb(nextIndex);
    });

    // 4. Update Active Thumbnail helper
    function updateActiveThumb(index) {
        thumbs.forEach((thumb, idx) => {
            if (idx === index) {
                thumb.classList.add('active');
                // Scroll thumbnail container to active item if needed
                thumbContainer.scrollTo({
                    left: thumb.offsetLeft - thumbContainer.clientWidth / 2 + thumb.clientWidth / 2,
                    behavior: 'smooth'
                });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // 5. Scroll Listener to update active thumbnail dynamically
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const slideWidth = carousel.clientWidth;
            const currentIndex = Math.round(carousel.scrollLeft / slideWidth);
            updateActiveThumb(currentIndex);
        }, 100);
    });
});
</script>
`;

// Insert the JS handler before </body>
if (html.includes('</body>')) {
  html = html.replace('</body>', `${slideshowScript}</body>`);
  console.log('[SUCCESS] Injected slideshow JS script before </body>');
}

fs.writeFileSync(productPath, html, 'utf8');
console.log('Successfully completed Product Slideshow UX Upgrade!');
