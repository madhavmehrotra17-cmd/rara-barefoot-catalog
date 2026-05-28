const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToAdd = `
/* Re-added Gradient behind product images */
.card__media::before, .product-card__media::before, .card-wrapper .media::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 45%) !important;
    pointer-events: none !important;
    z-index: 1 !important;
}
.card__media img, .product-card__media img, .card-wrapper .media img {
    position: relative !important;
    z-index: 2 !important;
}
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove old gradient-fix if we run it multiple times
    content = content.replace(/<style id="gradient-fix">[\s\S]*?<\/style>\s*/g, '');

    // Add it just before the closing </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', '<style id="gradient-fix">\n' + cssToAdd + '\n</style>\n</head>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed gradient layering in', file);
    }
});
