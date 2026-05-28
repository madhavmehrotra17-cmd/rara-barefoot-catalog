const fs = require('fs');
const path = require('path');

function getDirs(dir) {
  return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
}

console.log('Top level directories:', getDirs('.'));
if (fs.existsSync('assets')) {
  console.log('Assets directory contents:', fs.readdirSync('assets'));
}
