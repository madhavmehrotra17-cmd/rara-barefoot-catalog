const fs = require('fs');
const filePath = 'index.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

const videoSectionIds = [
  'template--19195983200430__video_CEhjzi',
  'template--19195983200430__video_dC8hR9',
  'template--19195983200430__video_QQD7EM'
];

videoSectionIds.forEach((sectionId) => {
  console.log(`\n==================================================`);
  console.log(`SECTION ID: ${sectionId}`);
  console.log(`==================================================`);
  
  let sectionStartLine = -1;
  let sectionEndLine = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`<section id="shopify-section-${sectionId}"`)) {
      sectionStartLine = i;
    }
    if (sectionStartLine !== -1 && lines[i].includes('</section>')) {
      if (i > sectionStartLine) {
        sectionEndLine = i;
        break; // found the matching/closing tag for this section
      }
    }
  }
  
  if (sectionStartLine !== -1 && sectionEndLine !== -1) {
    for (let i = sectionStartLine; i <= sectionEndLine; i++) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  } else if (sectionStartLine !== -1) {
    console.log(`Found start at ${sectionStartLine + 1} but no close tag found in loop, printing next 30 lines:`);
    for (let i = sectionStartLine; i <= Math.min(lines.length - 1, sectionStartLine + 30); i++) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  } else {
    console.log(`Section ${sectionId} not found in index.html!`);
  }
});
