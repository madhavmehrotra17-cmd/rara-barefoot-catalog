const fs = require('fs');
const path = require('path');

function getJpegSize(filePath) {
    const buffer = fs.readFileSync(filePath);
    let i = 4;
    while (i < buffer.length) {
        const marker = buffer.readUInt16BE(i);
        i += 2;
        if (marker === 0xFFC0 || marker === 0xFFC2) {
            // SOF0 or SOF2
            i += 3; // skip length & precision
            const height = buffer.readUInt16BE(i);
            const width = buffer.readUInt16BE(i + 2);
            return { width, height };
        } else {
            const length = buffer.readUInt16BE(i);
            i += length;
        }
    }
    return null;
}

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = ['Xanadu black new-1.JPG', 'Xanadu black new-2.JPG', 'Xanadu black new-3.JPG'];

files.forEach(f => {
    const p = path.join(dir, f);
    try {
        const size = getJpegSize(p);
        console.log(`${f}:`, size);
    } catch (e) {
        console.error(`Error reading ${f}:`, e.message);
    }
});
