const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToAdd = `
/* Gully Labs Style Card Background */
.card__media, .product-card__media, .card-wrapper .media {
    position: relative !important;
    border: none !important;
    border-radius: 16px !important; /* Rounded corners like Gully Labs */
    overflow: hidden !important;
    background: #f4f5f6 !important; /* Soft grey background */
    padding: 0 !important;
}

/* Blend the image into the background (removes white boxes if images are JPEGs) */
.card__media img, .product-card__media img, .card-wrapper .media img {
    mix-blend-mode: multiply !important; 
    background: transparent !important;
    position: relative !important;
    z-index: 2 !important;
}

/* Completely remove any old gradient overlays or white flashes */
.card__media::before, .product-card__media::before, .card-wrapper .media::before,
.card__media::after, .product-card__media::after, .card-wrapper .media::after {
    display: none !important;
    background: transparent !important;
    opacity: 0 !important;
}
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove previous fixes
    content = content.replace(/<style id="gradient-fix">[\s\S]*?<\/style>\s*/g, '');
    content = content.replace(/<style id="gully-labs-card-style">[\s\S]*?<\/style>\s*/g, '');

    // Add the new Gully Labs style
    if (content.includes('</head>')) {
        content = content.replace('</head>', '<style id="gully-labs-card-style">\n' + cssToAdd + '\n</style>\n</head>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Applied Gully Labs style to', file);
    }
});
