const fs = require('fs');
const filePath = 'index.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

const videoSections = [
  'template--19195983200430__video_CEhjzi',
  'template--19195983200430__video_dC8hR9',
  'template--19195983200430__video_QQD7EM'
];

videoSections.forEach((sectionId) => {
  console.log(`\n=== SECTION: ${sectionId} ===`);
  let startIdx = -1;
  let endIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(sectionId)) {
      if (startIdx === -1) {
        startIdx = Math.max(0, i - 2);
      }
      endIdx = Math.min(lines.length - 1, i + 10);
    }
  }
  if (startIdx !== -1) {
    for (let i = startIdx; i <= endIdx; i++) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  } else {
    console.log('Not found!');
  }
});
