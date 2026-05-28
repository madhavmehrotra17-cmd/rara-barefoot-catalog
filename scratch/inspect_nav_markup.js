const fs = require('fs');

const html = fs.readFileSync('product.html', 'utf8');

const idx = html.indexOf('<x-header');
if (idx !== -1) {
  console.log('--- FOUND <x-header ---');
  console.log(html.substring(idx, idx + 4000));
} else {
  console.log('<x-header not found');
}
