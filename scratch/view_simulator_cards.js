const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Search for details-barefoot block and find its elements
const startIdx = content.indexOf('id="details-barefoot"');
if (startIdx !== -1) {
  console.log("=== Details Barefoot Block in HTML ===");
  console.log(content.substring(startIdx - 100, startIdx + 2000));
} else {
  console.log("Could not find id=\"details-barefoot\"");
}

// Search for any style related to barefoot cards or details-pane
let idx = 0;
while (true) {
  idx = content.indexOf('.science-card', idx);
  if (idx === -1) break;
  console.log(`\n--- Found .science-card at index ${idx} ---`);
  console.log(content.substring(idx - 100, idx + 400));
  idx += 13;
}

idx = 0;
while (true) {
  idx = content.indexOf('.details-pane', idx);
  if (idx === -1) break;
  console.log(`\n--- Found .details-pane at index ${idx} ---`);
  console.log(content.substring(idx - 100, idx + 400));
  idx += 13;
}
