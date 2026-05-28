const fs = require('fs');
const path = require('path');

const candidates = [
  'cand_3684_0.html',
  'cand_3752_1.html',
  'cand_3756_2.html',
  'cand_3969_3.html',
  'cand_3975_4.html',
  'cand_3987_7.html',
  'cand_4009_8.html',
  'cand_4019_9.html',
  'cand_4301_10.html',
  'cand_4309_12.html',
  'cand_4317_13.html',
  'cand_4365_17.html'
];

candidates.forEach(name => {
  const filePath = path.join(__dirname, name);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasCore = content.includes('Core Properties');
    const hasSpecs = content.includes('Product Specs');
    const hasCare = content.includes('Care');
    const hasFaq = content.includes('FAQS');
    const hasBrand = content.includes('Brand Name');
    const hasInsole = content.includes('Insole:');
    
    console.log(`File: ${name}`);
    console.log(`  Length: ${content.length}`);
    console.log(`  Has: Core=${hasCore}, Specs=${hasSpecs}, Care=${hasCare}, FAQ=${hasFaq}, Brand=${hasBrand}, Insole=${hasInsole}`);
  }
});
