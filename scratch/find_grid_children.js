const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const productStartIdx = content.indexOf('class="product"');
console.log('product class index:', productStartIdx);

if (productStartIdx !== -1) {
  const startTagIdx = content.lastIndexOf('<div', productStartIdx);
  const endTagIdx = content.indexOf('>', startTagIdx);
  const tagContent = content.substring(startTagIdx, endTagIdx + 1);
  console.log('Product container tag:', tagContent);

  // Now let's traverse the children.
  let openDivs = 1;
  let currentIdx = endTagIdx + 1;
  let children = [];

  while (openDivs > 0 && currentIdx < content.length) {
    // Find the next tag opening or closing
    const nextCloseTagIdx = content.indexOf('</', currentIdx);
    const nextOpenTagIdx = content.indexOf('<', currentIdx);

    if (nextOpenTagIdx === -1 && nextCloseTagIdx === -1) break;

    if (nextOpenTagIdx !== -1 && (nextCloseTagIdx === -1 || nextOpenTagIdx < nextCloseTagIdx)) {
      // Opening tag
      let tagEnd = content.indexOf('>', nextOpenTagIdx);
      let fullTag = content.substring(nextOpenTagIdx, tagEnd + 1);
      
      // Let's filter out comment tags
      if (fullTag.startsWith('<!--')) {
        let commentEnd = content.indexOf('-->', nextOpenTagIdx);
        currentIdx = commentEnd + 3;
        continue;
      }

      const isSelfClosing = fullTag.endsWith('/>') || /<(img|br|hr|input|meta|link|style)/i.test(fullTag);

      if (openDivs === 1) {
        children.push({
          tag: fullTag,
          index: nextOpenTagIdx,
          isSelfClosing: isSelfClosing
        });
      }

      if (!isSelfClosing) {
        openDivs++;
      }
      currentIdx = tagEnd + 1;
    } else {
      // Closing tag
      let tagEnd = content.indexOf('>', nextCloseTagIdx);
      openDivs--;
      currentIdx = tagEnd + 1;
    }
  }

  console.log(`\nFound ${children.length} direct children inside .product container:`);
  children.forEach((child, i) => {
    console.log(`\nChild ${i}:`);
    console.log(`  Tag: ${child.tag}`);
    console.log(`  Snippet: ${content.substring(child.index, child.index + 200).replace(/\n/g, ' ')}...`);
  });
}
