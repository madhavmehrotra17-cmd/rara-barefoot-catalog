const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToAdd = `
/* 1. Safe Gradient Background (Strictly behind image) */
.card__media, .product-card__media, .card-wrapper .media {
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 45%) !important;
}

/* 2. Remove all overlays that could cover the product */
.card__media::before, .product-card__media::before, .card-wrapper .media::before,
.card__media::after, .product-card__media::after, .card-wrapper .media::after {
    display: none !important;
    background: transparent !important;
}

/* 3. Ensure product image is completely unmodified and on top */
.card__media img, .product-card__media img, .card-wrapper .media img {
    position: relative !important;
    z-index: 2 !important;
    mix-blend-mode: normal !important;
    background: transparent !important;
    opacity: 1; /* prevent hover script from hiding it completely */
}
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Clean up all my previous experimental styles
    content = content.replace(/<style id="gradient-fix">[\s\S]*?<\/style>\s*/g, '');
    content = content.replace(/<style id="gully-labs-card-style">[\s\S]*?<\/style>\s*/g, '');
    content = content.replace(/<style id="ultimate-fix">[\s\S]*?<\/style>\s*/g, '');

    // Inject the clean, safe style
    if (content.includes('</head>')) {
        content = content.replace('</head>', '<style id="ultimate-fix">\n' + cssToAdd + '\n</style>\n</head>');
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
