const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToAdd = `
/* 1. Perfect Gradient Background (White to Gray) */
.card__media, .product-card__media, .card-wrapper .media {
    background: linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%) !important;
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
    object-fit: contain !important; 
    mix-blend-mode: multiply !important; 
    z-index: 2 !important;
    transition: none !important; 
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
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Clean up completely
    content = content.replace(/<style id="ultimate-fix">[\s\S]*?<\/style>\s*/g, '');

    // Inject perfect fix
    if (content.includes('</head>')) {
        content = content.replace('</head>', '<style id="ultimate-fix">\n' + cssToAdd + '\n</style>\n</head>');
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
