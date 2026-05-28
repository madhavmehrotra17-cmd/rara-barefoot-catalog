const fs = require('fs');
const filePath = 'index.html';
const html = fs.readFileSync(filePath, 'utf8');

const regex = /<section id="shopify-section-template--19195983200430__video_QQD7EM"[\s\S]*?<\/section>/i;
const match = html.match(regex);
if (match) {
  const styleMatch = match[0].match(/<style>([\s\S]*?)<\/style>/i);
  if (styleMatch) {
    console.log('--- Section 3 style block ---');
    console.log(styleMatch[1]);
  } else {
    console.log('Style block not found inside Section 3');
  }
} else {
  console.log('Section 3 not found');
}
