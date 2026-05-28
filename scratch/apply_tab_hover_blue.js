const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('--- Applying Royal Blue hover states to switcher & filter tabs ---');

const replacement1 = `.filter-tab-button:hover {
    border-color: #095492 !important;
    color: #095492 !important;
}
.filter-tab-button.active {
    background-color: #095492 !important;
    border-color: #095492 !important;
    color: #ffffff !important;
}`;

const replacement2 = `.gender-toggle-tab:hover {
    color: #095492 !important;
}
.gender-toggle-tab.active {
    color: #095492 !important;
}
.gender-toggle-tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #095492 !important;
}`;

const regex1 = /\.filter-tab-button:hover\s*\{[\s\S]*?\}\s*\.filter-tab-button\.active\s*\{[\s\S]*?\}/gi;
const regex2 = /\.gender-toggle-tab:hover\s*\{[\s\S]*?\}\s*\.gender-toggle-tab\.active\s*\{[\s\S]*?\}\s*\.gender-toggle-tab\.active::after\s*\{[\s\S]*?\}/gi;

let successCount = 0;
let failCount = 0;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  if (regex1.test(content)) {
    content = content.replace(regex1, replacement1);
    modified = true;
  } else {
    console.log(`[WARNING] filter-tab-button regex not matched in ${file}`);
  }

  // Reset regex index
  regex2.lastIndex = 0;
  if (regex2.test(content)) {
    content = content.replace(regex2, replacement2);
    modified = true;
  } else {
    console.log(`[WARNING] gender-toggle-tab regex not matched in ${file}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[SUCCESS] Updated switcher & filter tabs to Royal Blue in ${file}`);
    successCount++;
  } else {
    console.error(`[FAIL] No changes made in ${file}`);
    failCount++;
  }
});

console.log(`\nAutomation completed. Success: ${successCount}, Fail: ${failCount}`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('All 12 templates successfully updated!');
}
