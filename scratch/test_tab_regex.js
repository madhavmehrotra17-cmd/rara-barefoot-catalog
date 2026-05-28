const fs = require('fs');

const content = fs.readFileSync('collection.html', 'utf8');

const regex1 = /\.filter-tab-button:hover\s*\{[\s\S]*?\}\s*\.filter-tab-button\.active\s*\{[\s\S]*?\}/gi;
const regex2 = /\.gender-toggle-tab:hover\s*\{[\s\S]*?\}\s*\.gender-toggle-tab\.active\s*\{[\s\S]*?\}\s*\.gender-toggle-tab\.active::after\s*\{[\s\S]*?\}/gi;

console.log('Regex 1 matches:', regex1.test(content));
console.log('Regex 2 matches:', regex2.test(content));

if (content.match(regex1)) {
  console.log('--- MATCH 1 ---');
  console.log(content.match(regex1)[0]);
}
if (content.match(regex2)) {
  console.log('--- MATCH 2 ---');
  console.log(content.match(regex2)[0]);
}
