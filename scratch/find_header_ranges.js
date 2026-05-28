const fs = require('fs');
const path = require('path');

['collection.html', 'product.html'].forEach(filename => {
  const filePath = path.join(__dirname, '..', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`${filename} does not exist`);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`=== ${filename} ===`);
  
  const heightObserverIdx = html.indexOf('<height-observer variable="header">');
  console.log(`  height-observer index: ${heightObserverIdx}`);
  
  const headerSidebarIdx = html.indexOf('<header-sidebar');
  console.log(`  header-sidebar index: ${headerSidebarIdx}`);
  
  const headerSidebarEndIdx = html.indexOf('</header-sidebar>');
  console.log(`  /header-sidebar index: ${headerSidebarEndIdx}`);
});
