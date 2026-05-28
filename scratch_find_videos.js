const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const videoMatches = content.match(/<video[^>]*>|src="[^"]*\.mp4"|src="[^"]*\.webm"/gi);
        if (videoMatches) {
            console.log(`--- Matches in ${file} ---`);
            videoMatches.forEach(match => console.log(match));
        }
    }
});
