const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl';
if (!fs.existsSync(transcriptPath)) {
    console.log('Transcript not found');
    process.exit(1);
}

const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');
let videoUrls = new Set();

lines.forEach(line => {
    if (line.trim()) {
        const obj = JSON.parse(line);
        const text = JSON.stringify(obj);
        const matches = text.match(/https?:\/\/[^\s"'`\\>]*\.mp4[^\s"'`\\>]*/gi);
        if (matches) {
            matches.forEach(m => videoUrls.add(m));
        }
    }
});

console.log('Found video URLs in transcript:');
videoUrls.forEach(url => console.log(url));

fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\video_urls.txt', Array.from(videoUrls).join('\n'), 'utf8');
