const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

const search = '/* --- Premium E-Commerce Interactive Slideshow Layout --- */';
const startIdx = content.indexOf(search);

if (startIdx === -1) {
  console.error('[ERROR] Could not find conflicting stylesheet block!');
  process.exit(1);
}

// Trace the closing bracket
let depth = 0;
let pos = content.indexOf('{', startIdx);
if (pos !== -1) {
  depth = 1;
  pos++;
  while (pos < content.length && depth > 0) {
    if (content[pos] === '{') depth++;
    else if (content[pos] === '}') depth--;
    pos++;
  }
  
  const endIdx = pos;
  console.log('Slicing out conflicting CSS block from index', startIdx, 'to', endIdx);
  console.log(content.substring(startIdx, endIdx));
  
  // Remove the block
  const updatedContent = content.substring(0, startIdx) + content.substring(endIdx);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log('[SUCCESS] Successfully sliced out the conflicting desktop slideshow layout CSS block!');
} else {
  console.error('[ERROR] Could not find opening brace for block!');
}
