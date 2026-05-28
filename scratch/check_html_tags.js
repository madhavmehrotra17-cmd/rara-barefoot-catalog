const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function countOccurrences(str, subStr) {
    let count = 0;
    let idx = 0;
    while ((idx = str.indexOf(subStr, idx)) !== -1) {
        count++;
        idx += subStr.length;
    }
    return count;
}

const xHeaderOpen = countOccurrences(content, '<x-header');
const xHeaderClose = countOccurrences(content, '</x-header>');
const sectionOpen = countOccurrences(content, '<section');
const sectionClose = countOccurrences(content, '</section>');

console.log(`x-header tags count - Opening: ${xHeaderOpen}, Closing: ${xHeaderClose}`);
console.log(`section tags count - Opening: ${sectionOpen}, Closing: ${sectionClose}`);

if (xHeaderOpen !== xHeaderClose) {
    console.error("Mismatch in x-header tags!");
} else {
    console.log("x-header tags are perfectly balanced!");
}

if (sectionOpen !== sectionClose) {
    console.error("Mismatch in section tags!");
} else {
    console.log("section tags are perfectly balanced!");
}
