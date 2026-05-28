const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
const content = fs.readFileSync(filePath, 'utf8');

const target = 'template--19195983724718__main';
let idx = content.indexOf(target);
while (idx !== -1) {
  console.log(`Found "${target}" at index ${idx}`);
  console.log(content.substring(idx - 50, idx + 150).replace(/\n/g, '\\n'));
  idx = content.indexOf(target, idx + 1);
}
