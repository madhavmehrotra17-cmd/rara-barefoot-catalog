const fs = require('fs');
const filePath = 'index.html';
const html = fs.readFileSync(filePath, 'utf8');
const lines = html.split('\n');

const sectionId = 'template--19195983200430__video_CEhjzi';
let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(`id="shopify-section-${sectionId}"`) || lines[i].includes(`id='shopify-section-${sectionId}'`)) {
    startIdx = i;
  }
  if (startIdx !== -1 && lines[i].includes('</section>')) {
    if (i > startIdx) {
      endIdx = i;
      break;
    }
  }
}

if (startIdx !== -1 && endIdx !== -1) {
  console.log(`Found ${sectionId} from line ${startIdx + 1} to ${endIdx + 1}:`);
  for (let i = startIdx; i <= endIdx; i++) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
} else {
  console.log(`Could not find ${sectionId} with precise bounds.`);
  // Try finding any line with it
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(sectionId)) {
      console.log(`Mentioned on line ${i + 1}: ${lines[i].substring(0, 150)}...`);
    }
  }
}
