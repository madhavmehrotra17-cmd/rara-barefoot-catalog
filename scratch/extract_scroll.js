const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'catalog.html');
const outputPath = path.join(__dirname, 'results.txt');

if (!fs.existsSync(catalogPath)) {
    fs.writeFileSync(outputPath, `Error: catalog.html not found`);
    process.exit(1);
}

const content = fs.readFileSync(catalogPath, 'utf8');
const lines = content.split('\n');

let results = ["=== SEARCHING FOR MARKUP AND SCRIPT IN CATALOG.HTML ==="];
lines.forEach((line, idx) => {
    if (line.includes('product-visual-panel') || line.includes('<script>') || line.includes('document.addEventListener(\'DOMContentLoaded\'')) {
        results.push(`Line ${idx + 1}: ${line.trim().substring(0, 150)}`);
    }
});

fs.writeFileSync(outputPath, results.join('\n'), 'utf8');
console.log("Analysis completed successfully!");
