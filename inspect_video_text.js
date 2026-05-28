const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html';
const html = fs.readFileSync(filePath, 'utf8');

const videoSections = [
  'template--19195983200430__video_CEhjzi',
  'template--19195983200430__video_dC8hR9',
  'template--19195983200430__video_QQD7EM'
];

let output = '';

videoSections.forEach((sectionId) => {
  output += `\n=== SECTION: ${sectionId} ===\n`;
  const regex = new RegExp(`id="shopify-section-${sectionId}"[\\s\\S]*?<\\/section>`, 'g');
  const match = html.match(regex);
  if (match) {
    // Extract text content and source tags
    const textOnly = match[0].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').substring(0, 500);
    const sources = match[0].match(/<source[^>]*src="[^"]*"/gi);
    output += `Text Content Snippet: ${textOnly}\n`;
    if (sources) {
      sources.forEach(src => output += `Source: ${src}\n`);
    }
  } else {
    output += 'Not found!\n';
  }
});

fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\video_section_details.txt', output, 'utf8');
console.log('Done!');
