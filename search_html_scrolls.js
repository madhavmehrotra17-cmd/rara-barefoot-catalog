const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.html') && file !== 'catalog.html') {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        if (content.includes('scroll') || content.includes('gif') || content.includes('mp4') || content.includes('flex')) {
            console.log(`\n=================== FILE: ${file} ===================`);
            const matches = content.match(/<section[^>]*>|scroll-snap|scroll-container|mp4/gi);
            if (matches) {
                console.log('Matches:', matches.slice(0, 10));
            }
            // Let's search for any reference to Uruk or Xanadu or GIF in sections
            const sectionRegex = /<section[\s\S]*?<\/section>/gi;
            let m;
            let count = 0;
            while ((m = sectionRegex.exec(content)) !== null) {
                count++;
                const text = m[0];
                if (text.toLowerCase().includes('gif') || text.toLowerCase().includes('mp4') || text.toLowerCase().includes('video') || text.toLowerCase().includes('barefoot')) {
                    console.log(`Section ${count} contains matching keywords! Preview:`);
                    console.log(text.substring(0, 500) + '...\n');
                }
            }
        }
    }
});
