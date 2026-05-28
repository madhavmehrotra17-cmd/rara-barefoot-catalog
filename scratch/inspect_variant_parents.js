const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

// Find the parent structures for index 320031 and 380927
function inspectParent(idx) {
  console.log(`\n=================== Parent for index ${idx} ===================`);
  // Look backwards for <div or <section tags
  let before = content.substring(idx - 4000, idx);
  
  // Find all class declarations before it
  let matches = [...before.matchAll(/<[a-zA-Z0-9\-]+[^>]*class="([^"]*)"[^>]*>/g)];
  console.log("Preceding elements with classes:");
  matches.slice(-10).forEach(m => console.log("  ", m[0].substring(0, 120)));
  
  // Let's print the structure from idx - 2000 to idx
  console.log("\n--- HTML snippet before index ---");
  console.log(content.substring(idx - 2000, idx + 100));
}

inspectParent(320031);
inspectParent(380927);
