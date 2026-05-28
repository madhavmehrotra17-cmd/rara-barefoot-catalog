const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('all-video-buttons') || content.includes('video__button')) {
    console.log(`${file} contains all-video-buttons or video__button`);
  }
});
