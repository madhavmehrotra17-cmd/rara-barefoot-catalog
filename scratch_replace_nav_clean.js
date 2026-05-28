const fs = require('fs');
const path = require('path');

const filesToProcess = [
    'about.html',
    'barefoot-science.html',
    'blogs.html',
    'cart.html',
    'community.html',
    'help.html',
    'index.html',
    'mens.html',
    'womens.html',
    'why-barefoot.html',
    'returns.html',
    'collection.html'
];

filesToProcess.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping non-existent file: ${filename}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let originalLength = content.length;

    // 1. Replace the desktop navigation block
    const startText = '<ul class="contents unstyled-list md-max:hidden">';
    const endText = '<li class="header__primary-nav-item" data-title="WHY BAREFOOT?">';
    
    const startIdx = content.indexOf(startText);
    if (startIdx !== -1) {
        const endIdx = content.indexOf(endText, startIdx);
        if (endIdx !== -1) {
            const beforeBlock = content.substring(0, startIdx + startText.length);
            const afterBlock = content.substring(endIdx);
            
            const newNavBlock = `
              <li class="header__primary-nav-item" data-title="THE COLLECTION">
                <a href="/collections/the-collection" class="block h6" style="font-weight: 700; padding-right: 15px;">THE COLLECTION</a>
              </li>`;
            
            content = beforeBlock + newNavBlock + afterBlock;
            console.log(`[${filename}] Desktop navigation clean successfully replaced.`);
        } else {
            console.log(`[${filename}] Desktop nav end block not found.`);
        }
    } else {
        console.log(`[${filename}] Desktop nav start block not found.`);
    }

    // 2. Replace the mobile sidebar navigation block
    const oldMobileBlock = `<li><a href="/collections/the-collection" class="header-sidebar__linklist-button h6" style="font-weight: 700;">THE COLLECTION</a></li>
      <li><a href="/collections/the-collection?filter=training" class="header-sidebar__linklist-button h6" style="padding-left: 20px; font-size: 13px; color: #555;">- Training / Gym / Exercise</a></li>
      <li><a href="/collections/the-collection?filter=running" class="header-sidebar__linklist-button h6" style="padding-left: 20px; font-size: 13px; color: #555;">- Walk / Jog / Play</a></li>
      <li><a href="/collections/the-collection?filter=everyday" class="header-sidebar__linklist-button h6" style="padding-left: 20px; font-size: 13px; color: #555;">- All Day / Everyday</a></li>`;
      
    const newMobileBlock = `<li><a href="/collections/the-collection" class="header-sidebar__linklist-button h6" style="font-weight: 700;">THE COLLECTION</a></li>`;

    if (content.includes(oldMobileBlock)) {
        content = content.replace(oldMobileBlock, newMobileBlock);
        console.log(`[${filename}] Mobile side drawer cleaned.`);
    } else {
        // Try simple replacement in case indentation is slightly off
        const regexMobile = /<li><a href="\/collections\/the-collection" class="header-sidebar__linklist-button h6" style="font-weight: 700;">THE COLLECTION<\/a><\/li>(\s*<li><a href="\/collections\/the-collection\?filter=[^"]+" class="header-sidebar__linklist-button h6"[^>]*>[^<]+<\/a><\/li>)+/;
        if (regexMobile.test(content)) {
            content = content.replace(regexMobile, newMobileBlock);
            console.log(`[${filename}] Mobile side drawer cleaned via regex.`);
        } else {
            console.log(`[${filename}] Mobile side drawer navigation already clean or not found.`);
        }
    }

    if (content.length !== originalLength) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[${filename}] Saved changes successfully!`);
    } else {
        console.log(`[${filename}] No changes detected.`);
    }
});

console.log("Global navigation clean-up completed successfully!");
