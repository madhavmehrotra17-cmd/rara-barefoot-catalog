const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const startText = '<ul class="contents unstyled-list md-max:hidden">';
const endText = '<li class="header__primary-nav-item" data-title="WHY BAREFOOT?">';

const startIdx = content.indexOf(startText);
if (startIdx !== -1) {
    const endIdx = content.indexOf(endText, startIdx);
    if (endIdx !== -1) {
        const originalBlock = content.substring(startIdx + startText.length, endIdx);
        console.log("--- ORIGINAL BLOCK ---");
        console.log(originalBlock.trim());
        console.log("----------------------");
        
        const newNavBlock = `
              <li class="header__primary-nav-item" data-title="THE COLLECTION">
                <a href="/collections/the-collection" class="block h6" style="padding-right: 15px;">THE COLLECTION</a>
              </li>
              <li class="header__primary-nav-item dropdown-nav" data-title="Collections">
                <a href="#" class="block h6" style="font-weight: 700; text-transform: uppercase; padding-right: 15px; cursor: default;">Collections</a>
                <ul class="dropdown-menu-custom">
                  <li><a href="/collections/the-collection?filter=training" class="dropdown-item-custom">Training / Gym / Exercise</a></li>
                  <li><a href="/collections/the-collection?filter=running" class="dropdown-item-custom">Walk / Jog / Play</a></li>
                  <li><a href="/collections/the-collection?filter=everyday" class="dropdown-item-custom">All Day / Everyday</a></li>
                </ul>
              </li>`;
        
        console.log("--- NEW BLOCK ---");
        console.log(newNavBlock.trim());
        console.log("----------------------");
    } else {
        console.log("Could not find endText:", endText);
    }
} else {
    console.log("Could not find startText:", startText);
}
