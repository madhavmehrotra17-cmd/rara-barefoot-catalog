const fs = require('fs');
const path = require('path');

const cssInjection = `
<!-- CUSTOM INJECTIONS -->
<style id="custom-fixes-styles">
/* 1. Logo size and shrink animation */
.header__logo-image {
    transition: width 0.3s ease, height 0.3s ease !important;
    width: 150px !important;
    height: auto !important;
    max-width: none !important;
}
.header__logo-image.shrink {
    width: 90px !important;
}

/* 2. Increased font spacing */
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, 
p, .p, span, a, button, .button, label, input, textarea, li, td, th {
    letter-spacing: 0.05em !important;
}
/* Exclude icon fonts */
[class*="icon"], [class*="fa-"], [class*="material-icons"] {
    letter-spacing: normal !important;
}

/* 3. Fix white overlay on product hover */
.card-wrapper:hover .card__media::after,
.card-wrapper:hover .product-card__media::after,
.card-wrapper:hover .media::after,
.card-wrapper .card__media::after,
.card-wrapper .product-card__media::after,
.card-wrapper .media::after,
.card__inner::after,
.card__inner::before,
.media::after,
.media::before {
    background-color: transparent !important;
    background: transparent !important;
    display: none !important;
    opacity: 0 !important;
}
.card-wrapper .card__content, 
.card-wrapper:hover .card__content,
.card__inner,
.card__inner:hover,
.product-card-wrapper .card__content {
    background-color: transparent !important;
    background: transparent !important;
}
</style>

<script id="custom-fixes-scripts">
document.addEventListener('DOMContentLoaded', () => {
    // 1. Logo shrink animation on scroll
    window.addEventListener('scroll', () => {
        const logo = document.querySelector('.header__logo-image');
        if (logo) {
            if (window.scrollY > 50) {
                logo.classList.add('shrink');
            } else {
                logo.classList.remove('shrink');
            }
        }
    });
});
</script>
<!-- END CUSTOM INJECTIONS -->
`;

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove previous injections if they exist to prevent duplicates
    content = content.replace(/<!-- CUSTOM INJECTIONS -->[\s\S]*<!-- END CUSTOM INJECTIONS -->/, '');

    // Inject before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', cssInjection + '\n</head>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Injected into', file);
    } else {
        console.log('No </head> found in', file);
    }
});
