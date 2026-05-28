const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Match font weight of THE COLLECTION header to WHY BAREFOOT?
    // Replace font-weight: 700 with regular font weight (by removing font-weight inline style)
    content = content.replace(
        /<a href="\/collections\/the-collection" class="block h6" style="font-weight: 700; padding-right: 15px;">THE COLLECTION<\/a>/g,
        '<a href="/collections/the-collection" class="block h6" style="padding-right: 15px;">THE COLLECTION</a>'
    );

    // 2. Also replace mobile menu side drawer bold style
    content = content.replace(
        /<a href="\/collections\/the-collection" class="header-sidebar__linklist-button h6" style="font-weight: 700;">THE COLLECTION<\/a>/g,
        '<a href="/collections/the-collection" class="header-sidebar__linklist-button h6">THE COLLECTION</a>'
    );

    // 3. Specifically in collection.html, update the split selection screen copy
    if (file === 'collection.html') {
        const oldSplitBlock = `<div class="gender-selection-container" id="gender-selection-screen">
    <div class="gender-selection-card" data-select-gender="men">
      <img src="/blue.png" alt="Men's Collection" class="gender-selection-img">
      <div class="gender-selection-overlay"></div>
      <div class="gender-selection-content">
        <h2 class="gender-selection-title">MEN</h2>
        <button class="gender-selection-btn">EXPLORE MEN</button>
      </div>
    </div>
    <div class="gender-selection-card" data-select-gender="women">
      <img src="/yellow.png" alt="Women's Collection" class="gender-selection-img">
      <div class="gender-selection-overlay"></div>
      <div class="gender-selection-content">
        <h2 class="gender-selection-title">WOMEN</h2>
        <button class="gender-selection-btn">EXPLORE WOMEN</button>
      </div>
    </div>
  </div>`;

        const newSplitBlock = `<div class="gender-selection-container" id="gender-selection-screen">
    <div class="gender-selection-card" data-select-gender="men">
      <img src="/blue.png" alt="Men's Collection" class="gender-selection-img">
      <div class="gender-selection-overlay"></div>
      <div class="gender-selection-content">
        <h2 class="gender-selection-title">MEN</h2>
        <p class="gender-selection-subtitle">Move Naturally</p>
        <button class="gender-selection-btn">EXPLORE MEN</button>
      </div>
    </div>
    <div class="gender-selection-card" data-select-gender="women">
      <img src="/yellow.png" alt="Women's Collection" class="gender-selection-img">
      <div class="gender-selection-overlay"></div>
      <div class="gender-selection-content">
        <h2 class="gender-selection-title">WOMEN</h2>
        <p class="gender-selection-subtitle">Made to move freely</p>
        <button class="gender-selection-btn">EXPLORE WOMEN</button>
      </div>
    </div>
  </div>`;

        if (content.includes(oldSplitBlock)) {
            content = content.replace(oldSplitBlock, newSplitBlock);
            console.log(`[collection.html] Gender split selector screen copy successfully updated!`);
        } else {
            // fallback: direct regex replacement
            const regexSplit = /<div class="gender-selection-container" id="gender-selection-screen">[\s\S]*?EXPLORE WOMEN<\/button>\s*<\/div>\s*<\/div>\s*<\/div>/;
            if (regexSplit.test(content)) {
                content = content.replace(regexSplit, newSplitBlock);
                console.log(`[collection.html] Gender split selector screen copy successfully updated via regex!`);
            } else {
                console.log(`[collection.html] Gender split selector block NOT found or already updated.`);
            }
        }
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[${file}] Changes successfully applied and file saved.`);
    } else {
        console.log(`[${file}] No changes detected.`);
    }
});
