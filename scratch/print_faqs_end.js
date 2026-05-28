const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'product.html'), 'utf8');

const idx = content.indexOf('Do barefoot shoes need special insoles or socks?');
if (idx !== -1) {
  console.log("=== HTML from FAQS context onwards ===");
  console.log(content.substring(idx, idx + 2000));
}
