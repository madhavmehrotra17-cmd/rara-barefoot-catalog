const fs = require('fs');
const filePath = 'collection.html';
const html = fs.readFileSync(filePath, 'utf8');

const match = html.match(/<style id="rara-ultimate-style">([\s\S]*?)<\/style>/i);
if (match) {
  console.log('--- rara-ultimate-style in collection.html ---');
  // print the premium CTA part
  const idx = match[1].indexOf('Premium CTA Hover Micro-Animations');
  if (idx !== -1) {
    console.log(match[1].substring(idx - 100, idx + 800));
  } else {
    console.log(match[1].substring(0, 1000));
  }
} else {
  console.log('rara-ultimate-style not found in collection.html');
}
