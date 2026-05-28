const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch';
const folders = ['clone', 'rara-clone', 'rarabarefoot'];

folders.forEach(folder => {
  const filePath = path.join(baseDir, folder, 'product.html');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasExtraInfo = content.includes('product-extra-information');
    const hasBrandName = content.includes('Brand Name');
    
    console.log(`Folder: ${folder}, Has product.html: true`);
    console.log(`  Length: ${content.length}`);
    console.log(`  Has product-extra-information: ${hasExtraInfo}`);
    console.log(`  Has Brand Name: ${hasBrandName}`);
    
    if (hasExtraInfo && hasBrandName) {
      console.log(`\n>>> FOUND THE ORIGINAL UNTOUCHED ACCORDIONS BLOCK IN ${folder}!`);
      // Find the start and end of product-extra-information
      let idx = content.indexOf('id="product-extra-information"');
      if (idx !== -1) {
        let divStart = content.lastIndexOf('<div', idx);
        let faqIdx = content.indexOf('FAQS', divStart);
        if (faqIdx !== -1) {
          let nextClose = content.indexOf('</accordion-disclosure>', faqIdx);
          if (nextClose !== -1) {
            let divClose = content.indexOf('</div>', nextClose);
            if (divClose !== -1) {
              const fullBlock = content.substring(divStart, divClose + 6);
              console.log(`  Block length: ${fullBlock.length}`);
              fs.writeFileSync(path.join(__dirname, 'perfect_restored_accordions.html'), fullBlock, 'utf8');
              console.log("  Saved to perfect_restored_accordions.html");
            }
          }
        }
      }
    }
  } else {
    console.log(`Folder: ${folder}, Has product.html: false`);
  }
});
