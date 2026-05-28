const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html';
const html = fs.readFileSync(filePath, 'utf8');

const targetStr = 'THE BAREFOOT MOVEMENT';
const startIdx = html.indexOf(targetStr);
if (startIdx !== -1) {
    console.log(`Found target inside index.html at char ${startIdx}`);
    let sectionStart = html.lastIndexOf('<section', startIdx);
    let sectionEnd = html.indexOf('</section>', startIdx) + '</section>'.length;
    const sectionHtml = html.substring(sectionStart, sectionEnd);
    fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index_community_section.html', sectionHtml, 'utf8');
    console.log('Saved index community section to index_community_section.html');
} else {
    console.log('Not found');
}
