const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join(__dirname, 'collection.html'), 'utf8').split('\n');

lines.forEach((line, idx) => {
    if (line.includes('gender-selection-container')) {
        console.log(`Found on line ${idx + 1}: ${line.trim()}`);
    }
});
