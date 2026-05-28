const fs = require('fs');
const path = require('path');

function run() {
    const indexPath = path.join(__dirname, '..', 'index.html');
    if (!fs.existsSync(indexPath)) {
        console.error("index.html not found!");
        return;
    }

    let indexHtml = fs.readFileSync(indexPath, 'utf8');
    const originalLength = indexHtml.length;

    // 1. Remove the announcement bar aside block
    const announcementId = 'id="shopify-section-sections--19195979432110__announcement-bar"';
    const annIdx = indexHtml.indexOf(announcementId);
    if (annIdx !== -1) {
        const startTagIdx = indexHtml.substring(0, annIdx).lastIndexOf('<aside');
        const endTagIdx = indexHtml.indexOf('</aside>', annIdx) + '</aside>'.length;
        
        console.log(`Found announcement bar from index ${startTagIdx} to ${endTagIdx}. Removing it.`);
        
        const beforeBlock = indexHtml.substring(0, startTagIdx);
        const afterBlock = indexHtml.substring(endTagIdx);
        indexHtml = beforeBlock + afterBlock;
    } else {
        console.log("Announcement bar not found in index.html");
    }

    // 2. Remove duplicate custom style blocks containing 'logo-custom'
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let match;
    let styleBlocksToRemove = [];

    // Reset regex index to search fresh
    styleRegex.lastIndex = 0;
    while ((match = styleRegex.exec(indexHtml)) !== null) {
        const blockContent = match[1];
        if (blockContent.includes('logo-custom') || blockContent.includes('dropdown-custom-wrapper') || blockContent.includes('nav-center-custom')) {
            console.log(`Marking style block for removal starting at ${match.index} (length: ${match[0].length})`);
            styleBlocksToRemove.push({
                start: match.index,
                end: match.index + match[0].length
            });
        }
    }

    // Remove the blocks from end to start to avoid shifting indices
    for (let i = styleBlocksToRemove.length - 1; i >= 0; i--) {
        const { start, end } = styleBlocksToRemove[i];
        indexHtml = indexHtml.substring(0, start) + indexHtml.substring(end);
    }
    
    console.log(`Removed ${styleBlocksToRemove.length} duplicate style blocks.`);

    if (indexHtml.length !== originalLength) {
        fs.writeFileSync(indexPath, indexHtml, 'utf8');
        console.log("Successfully cleaned up index.html!");
    } else {
        console.log("No changes detected in index.html.");
    }
}

run();
