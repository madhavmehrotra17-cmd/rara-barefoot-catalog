const fs = require('fs');
const path = require('path');

const candidates = [
  'cand_3684_0.html',
  'cand_3752_1.html',
  'cand_3756_2.html',
  'cand_4301_10.html',
  'cand_4309_12.html',
  'cand_4317_13.html',
  'cand_4365_17.html'
];

candidates.forEach(name => {
  const filePath = path.join(__dirname, name);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasBrandName = content.includes('Brand Name');
    const hasTruncation = content.includes('...');
    console.log(`File: ${name}, Length: ${content.length}, hasBrandName: ${hasBrandName}, hasTruncation: ${hasTruncation}`);
    
    if (hasBrandName && !hasTruncation) {
      console.log(`\n>>> FOUND PERFECT RESTORE CANDIDATE: ${name}!`);
      // Let's print the Product Specs accordion content to verify!
      const startIdx = content.indexOf('Product Specs');
      if (startIdx !== -1) {
        console.log(content.substring(startIdx - 100, startIdx + 1200));
      }
    }
  }
});
