const fs = require('fs');

const html = fs.readFileSync('product.html', 'utf8');

const queries = ['class="header', 'header__primary-nav', 'header__logo-image'];
queries.forEach(q => {
  const idx = html.indexOf(q);
  console.log(q + ' index: ' + idx);
  if (idx !== -1) {
    console.log('--- snippet for ' + q + ' ---');
    console.log(html.substring(idx - 100, idx + 400));
  }
});
