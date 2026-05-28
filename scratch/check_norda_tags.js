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

const headerOpen = countOccurrences(content, '<header');
const headerClose = countOccurrences(content, '</header>');
const sectionOpen = countOccurrences(content, '<section');
const sectionClose = countOccurrences(content, '</section>');

console.log(`header tags count - Opening: ${headerOpen}, Closing: ${headerClose}`);
console.log(`section tags count - Opening: ${sectionOpen}, Closing: ${sectionClose}`);

if (headerOpen !== headerClose) {
    console.error("Mismatch in header tags!");
} else {
    console.log("header tags are perfectly balanced!");
}

if (sectionOpen !== sectionClose) {
    console.error("Mismatch in section tags!");
} else {
    console.log("section tags are perfectly balanced!");
}

// Verify MORE dropdown links are present
const hasHelp = content.includes('/pages/help');
const hasScience = content.includes('/pages/barefoot-science');
const hasBlog = content.includes('/pages/blogs');
console.log(`Has Help link? ${hasHelp}`);
console.log(`Has Barefoot Science link? ${hasScience}`);
console.log(`Has Blog link? ${hasBlog}`);
