const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'collection.html');
let content = fs.readFileSync(filePath, 'utf8');

const oldMenSub = '<p class="gender-selection-subtitle">Move Naturally</p>';
const newMenSub = '<p class="gender-selection-subtitle">Feel the Earth</p>';

const oldWomenSub = '<p class="gender-selection-subtitle">Made to move freely</p>';
const newWomenSub = '<p class="gender-selection-subtitle">Move Naturally</p>';

if (content.includes(oldMenSub)) {
    content = content.replace(oldMenSub, newMenSub);
    console.log("Replaced Men subtitle in collection.html!");
} else {
    console.log("Could not find Men subtitle block in collection.html!");
}

if (content.includes(oldWomenSub)) {
    content = content.replace(oldWomenSub, newWomenSub);
    console.log("Replaced Women subtitle in collection.html!");
} else {
    console.log("Could not find Women subtitle block in collection.html!");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Saved changes to collection.html");
