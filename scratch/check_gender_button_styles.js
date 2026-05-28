const fs = require('fs');

const indexPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\index.html';

if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    
    // Find all occurrences of "gender-banner-button" or "gender-banner-card" inside style tags or CSS rules
    let idx = 0;
    while (true) {
        idx = content.indexOf('gender-banner-button', idx);
        if (idx === -1) break;
        console.log(`--- Match for gender-banner-button at index ${idx} ---`);
        console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 400)));
        idx += 'gender-banner-button'.length;
    }
}
