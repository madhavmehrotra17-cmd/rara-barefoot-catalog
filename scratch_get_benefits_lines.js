const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8').split('\n');

lines.forEach((line, idx) => {
    if (line.includes('below_catalogue_1.1') || line.includes('below_catalogue_1.2') || line.includes('below_catalogue_1.3')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
