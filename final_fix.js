const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToAdd = `
/* 1. Perfect Gradient Background (White to Gray) */
.card__media, .product-card__media, .card-wrapper .media {
    background: linear-gradient(180deg, #ffffff 0%, #f0f2f5 100%) !important;
    border-radius: 16px !important;
    overflow: hidden !important;
}

/* 2. Remove all overlays */
.card__media::before, .product-card__media::before, .card-wrapper .media::before,
.card__media::after, .product-card__media::after, .card-wrapper .media::after {
    display: none !important;
}

/* 3. Image perfectly on top and blended */
.card__media img, .product-card__media img, .card-wrapper .media img {
    position: relative !important;
    z-index: 2 !important;
    mix-blend-mode: multiply !important; /* Makes image white background transparent so gradient shows through perfectly */
    background: transparent !important;
}
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Clean up
    content = content.replace(/<style id="gradient-fix">[\s\S]*?<\/style>\s*/g, '');
    content = content.replace(/<style id="gully-labs-card-style">[\s\S]*?<\/style>\s*/g, '');
    content = content.replace(/<style id="ultimate-fix">[\s\S]*?<\/style>\s*/g, '');

    // Inject perfect fix
    if (content.includes('</head>')) {
        content = content.replace('</head>', '<style id="ultimate-fix">\n' + cssToAdd + '\n</style>\n</head>');
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
