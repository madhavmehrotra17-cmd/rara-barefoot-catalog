const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /<div class="details-pane active" id="details-barefoot">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('Match found:');
  console.log(match[0]);
  console.log('---');
}
