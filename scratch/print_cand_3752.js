const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'cand_3752_1.html'), 'utf8');
console.log("=== cand_3752_1.html Full Content ===");
console.log(content);
