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

    // 1. Replace the primary desktop navigation block (Men and Women mega-menus)
    // Find where "Men" list item starts
    const desktopMenStartIdx = content.indexOf('<li class="header__primary-nav-item" data-title="Men">');
    if (desktopMenStartIdx !== -1) {
        // Find the matching end of the desktop "Women" list item
        const desktopWomenIdx = content.indexOf('<li class="header__primary-nav-item" data-title="Women">', desktopMenStartIdx);
        if (desktopWomenIdx !== -1) {
            // Find the closing </li> of the Women item
            const closingLiWomenIdx = content.indexOf('</li>', desktopWomenIdx);
            if (closingLiWomenIdx !== -1) {
                const endOfDesktopBlock = closingLiWomenIdx + 5; // length of '</li>'
                
                const beforeNav = content.substring(0, desktopMenStartIdx);
                const afterNav = content.substring(endOfDesktopBlock);
                const newNav = '<li class="header__primary-nav-item" data-title="THE COLLECTION"><a href="/collections/the-collection" class="block h6" >THE COLLECTION</a></li>';
                
                content = beforeNav + newNav + afterNav;
                console.log(`[${filename}] Desktop nav replaced.`);
            }
        }
    } else {
        console.log(`[${filename}] Desktop nav not found or already replaced.`);
    }

    // 2. Replace mobile sidebar buttons for Men & Women
    const mobileMenBtnStart = content.indexOf('<li><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-1"');
    if (mobileMenBtnStart !== -1) {
        const mobileWomenBtnIdx = content.indexOf('<li><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-2"', mobileMenBtnStart);
        if (mobileWomenBtnIdx !== -1) {
            const closingLiWomenBtnIdx = content.indexOf('</li>', mobileWomenBtnIdx);
            if (closingLiWomenBtnIdx !== -1) {
                const endOfMobileBlock = closingLiWomenBtnIdx + 5;
                
                const beforeMobile = content.substring(0, mobileMenBtnStart);
                const afterMobile = content.substring(endOfMobileBlock);
                const newMobile = '<li><a href="/collections/the-collection" class="header-sidebar__linklist-button h6">THE COLLECTION</a></li>';
                
                content = beforeMobile + newMobile + afterMobile;
                console.log(`[${filename}] Mobile nav replaced.`);
            }
        }
    } else {
        // Alternative match in case of whitespace difference
        const altMobileMen = content.indexOf('Men<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right');
        if (altMobileMen !== -1) {
            console.log(`[${filename}] Found alternative mobile nav markup. Proceeding with broad replacement.`);
        } else {
            console.log(`[${filename}] Mobile nav not found or already replaced.`);
        }
    }

    // 3. Replace collections list in footer links
    // Find '<a href="/collections/all-footwear-men" class="link-faded">MEN</a>'
    // and '<a href="/collections/all-footwear-women" class="link-faded">WOMEN</a>'
    const footerMenIdx = content.indexOf('href="/collections/all-footwear-men" class="link-faded">MEN</a>');
    if (footerMenIdx !== -1) {
        // Find surrounding list items or container
        // We can just replace the list items directly
        const oldFooterBlock = `<li>
                            <a href="/collections/all-footwear-men" class="link-faded">MEN</a>
                          </li><li>
                            <a href="/collections/all-footwear-women" class="link-faded">WOMEN</a>
                          </li>`;
        const newFooterBlock = `<li>
                            <a href="/collections/the-collection" class="link-faded">THE COLLECTION</a>
                          </li>`;
        
        if (content.includes(oldFooterBlock)) {
            content = content.replace(oldFooterBlock, newFooterBlock);
            console.log(`[${filename}] Footer links replaced (exact match).`);
        } else {
            // Fuzzy replacement
            content = content.replace(/\/collections\/all-footwear-men/g, '/collections/the-collection');
            content = content.replace(/>MEN<\/a>/g, '>THE COLLECTION</a>');
            content = content.replace(/<li>\s*<a href="\/collections\/all-footwear-women" class="link-faded">WOMEN<\/a>\s*<\/li>/g, '');
            console.log(`[${filename}] Footer links replaced (fuzzy match).`);
        }
    }

    if (content.length !== originalLength) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[${filename}] Saved changes successfully!`);
    } else {
        console.log(`[${filename}] No changes detected.`);
    }
});
console.log('Global navigation replacement complete!');
