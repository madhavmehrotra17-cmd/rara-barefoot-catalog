const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'catalog.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const targets = [
    { name: 'premium-footer-css', text: '.premium-footer {' },
    { name: 'premium-footer-html', text: '<footer class="premium-footer">' }
];

targets.forEach(t => {
    let foundIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(t.text)) {
            foundIdx = i + 1;
            break;
        }
    }
    console.log(`${t.name}: Line ${foundIdx}`);
});
