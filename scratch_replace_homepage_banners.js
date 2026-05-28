const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const oldMenBlock = '<h3 class="gender-banner-title">Made <em>for</em> Miles</h3>';
const newMenBlock = '<h3 class="gender-banner-title">Move <em>Naturally</em></h3>';

const oldWomenBlock = '<h3 class="gender-banner-title">Built <em>for</em> Your Best</h3>';
const newWomenBlock = '<h3 class="gender-banner-title">Made to move <em>freely</em></h3>';

if (content.includes(oldMenBlock)) {
    content = content.replace(oldMenBlock, newMenBlock);
    console.log("Replaced Men part on homepage!");
} else {
    console.log("Could not find Men block!");
}

if (content.includes(oldWomenBlock)) {
    content = content.replace(oldWomenBlock, newWomenBlock);
    console.log("Replaced Women part on homepage!");
} else {
    console.log("Could not find Women block!");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Saved changes to index.html");
