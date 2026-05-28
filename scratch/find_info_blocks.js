const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find all occurrences of "product-info" or "product-info__block-list"
function findOccurrences(query) {
  let idx = 0;
  let occurrences = [];
  while (true) {
    idx = content.indexOf(query, idx);
    if (idx === -1) break;
    occurrences.push(idx);
    idx += query.length;
  }
  return occurrences;
}

const listOcc = findOccurrences("product-info__block-list");
console.log(`Found "product-info__block-list" ${listOcc.length} times:`, listOcc);

listOcc.forEach((idx, i) => {
  console.log(`\n--- Match ${i} at index ${idx} ---`);
  console.log(content.substring(idx - 100, idx + 400));
});

const infoOcc = findOccurrences("<product-info");
console.log(`\nFound "<product-info" ${infoOcc.length} times:`, infoOcc);
infoOcc.forEach((idx, i) => {
  console.log(`\n--- Match ${i} at index ${idx} ---`);
  console.log(content.substring(idx - 100, idx + 400));
});
