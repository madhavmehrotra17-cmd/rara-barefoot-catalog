const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\community.html';
const html = fs.readFileSync(filePath, 'utf8');

const targetId = 'template--19195983364270__image_with_text_BHzgBp';
const startIdx = html.indexOf(targetId);
if (startIdx !== -1) {
    console.log(`Found target substring at character index ${startIdx}`);
    // Find the enclosing section bounds
    let sectionStart = html.lastIndexOf('<section', startIdx);
    let sectionEnd = html.indexOf('</section>', startIdx) + '</section>'.length;
    const sectionHtml = html.substring(sectionStart, sectionEnd);
    fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\image_with_text_full.html', sectionHtml, 'utf8');
    console.log('Saved full section HTML to image_with_text_full.html');
} else {
    console.log(`Could not find substring ${targetId}`);
}
