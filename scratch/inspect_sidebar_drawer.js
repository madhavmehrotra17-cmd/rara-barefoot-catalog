const fs = require('fs');

const collection = fs.readFileSync('collection.html', 'utf8');
const product = fs.readFileSync('product.html', 'utf8');

const queries = ['id="sidebar-menu"', 'sidebar-drawer'];

queries.forEach(q => {
  console.log('--- Search in collection.html for: ' + q + ' ---');
  let idx = collection.indexOf(q);
  if (idx !== -1) {
    console.log(collection.substring(idx - 100, idx + 400));
  } else {
    console.log('Not found');
  }

  console.log('--- Search in product.html for: ' + q + ' ---');
  idx = product.indexOf(q);
  if (idx !== -1) {
    console.log(product.substring(idx - 100, idx + 400));
  } else {
    console.log('Not found');
  }
});
