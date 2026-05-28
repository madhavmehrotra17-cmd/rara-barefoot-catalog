const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'mens.html');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /<div class="science-detail-card">([\s\S]*?)<\/div>\s*<\/div>/gi;
let match = regex.exec(content);
if (match) {
  console.log('Match in mens.html:');
  console.log(match[0]);
} else {
  console.log('No matches in mens.html');
}
