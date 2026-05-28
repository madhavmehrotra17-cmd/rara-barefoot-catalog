const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const oldMenBlock = '<h3 class="gender-banner-title">Move <em>Naturally</em></h3>';
const newMenBlock = '<h3 class="gender-banner-title">Feel the <em>Earth</em></h3>';

const oldWomenBlock = '<h3 class="gender-banner-title">Made to move <em>freely</em></h3>';
const newWomenBlock = '<h3 class="gender-banner-title">Move <em>Naturally</em></h3>';

if (content.includes(oldMenBlock)) {
    content = content.replace(oldMenBlock, newMenBlock);
    console.log("Replaced Men banner on homepage to Feel the Earth!");
} else {
    console.log("Could not find Men block!");
    // Fallback search
    const regexMen = /<h3 class="gender-banner-title">Move <em>Naturally<\/em><\/h3>/;
    if (regexMen.test(content)) {
        content = content.replace(regexMen, newMenBlock);
        console.log("Replaced Men banner on homepage to Feel the Earth via regex!");
    }
}

if (content.includes(oldWomenBlock)) {
    content = content.replace(oldWomenBlock, newWomenBlock);
    console.log("Replaced Women banner on homepage to Move Naturally!");
} else {
    console.log("Could not find Women block!");
    // Fallback search
    const regexWomen = /<h3 class="gender-banner-title">Made to move <em>freely<\/em><\/h3>/;
    if (regexWomen.test(content)) {
        content = content.replace(regexWomen, newWomenBlock);
        console.log("Replaced Women banner on homepage to Move Naturally via regex!");
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Saved changes to index.html");
