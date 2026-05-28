const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Injecting premium click-to-zoom lightbox modal interaction inside product.html...');

const targetMarker = 'window.addEventListener(\'scroll\', () => {';
const targetIndex = content.indexOf(targetMarker);

if (targetIndex === -1) {
  console.error('[ERROR] Could not locate the navbar scroll logic target in product.html script!');
  process.exit(1);
}

const lightboxScript = `// Click-to-Zoom Lightbox Modal for the Barefoot Illustration
document.addEventListener('DOMContentLoaded', () => {
    const barefootImg = document.querySelector('.barefoot-svg');
    if (barefootImg) {
        // Set cursor to signal zoom ability
        barefootImg.style.cursor = 'zoom-in';
        
        barefootImg.addEventListener('click', () => {
            // Create glassmorphic overlay modal
            const overlay = document.createElement('div');
            overlay.className = 'rara-lightbox-overlay';
            overlay.style.cssText = \`
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: rgba(0, 0, 0, 0.75) !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                z-index: 9999999 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                opacity: 0 !important;
                transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
            \`;
            
            // Large image inside modal
            const modalImg = document.createElement('img');
            modalImg.src = barefootImg.src;
            modalImg.className = 'rara-lightbox-image';
            modalImg.style.cssText = \`
                max-width: 90% !important;
                max-height: 90% !important;
                object-fit: contain !important;
                border-radius: 12px !important;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5) !important;
                transform: scale(0.9) !important;
                transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                cursor: zoom-out !important;
            \`;
            
            // Clean close button (×)
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = \`
                position: absolute !important;
                top: 25px !important;
                right: 25px !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                color: #ffffff !important;
                font-size: 32px !important;
                line-height: 1 !important;
                width: 50px !important;
                height: 50px !important;
                border-radius: 50% !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.2s ease !important;
                backdrop-filter: blur(4px) !important;
            \`;
            
            // Hover styles for close button
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                closeBtn.style.transform = 'scale(1.1)';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                closeBtn.style.transform = 'scale(1)';
            });
            
            overlay.appendChild(modalImg);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            
            // Smooth fade-in
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                modalImg.style.transform = 'scale(1)';
            });
            
            // Smooth fade-out helper
            function closeLightbox() {
                overlay.style.opacity = '0';
                modalImg.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            }
            
            // Click listeners to close
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay || e.target === closeBtn || e.target === modalImg) {
                    closeLightbox();
                }
            });
            
            // Esc key listener to close
            const escListener = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escListener);
                }
            };
            document.addEventListener('keydown', escListener);
        });
    }
});

`;

const newContent = content.substring(0, targetIndex) + lightboxScript + content.substring(targetIndex);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('[SUCCESS] Successfully injected click-to-zoom interactive lightbox modal in product.html!');
