const fs = require('fs');

function getJpegDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    let i = 0;
    if (buffer[0] !== 0xFF || buffer[1] !== 0xD8) {
        throw new Error('Not a valid JPEG');
    }
    i += 2;
    while (i < buffer.length) {
        while (buffer[i] === 0xFF) i++;
        const marker = buffer[i];
        i++;
        if (marker === 0xD9 || marker === 0xDA) { // EOI or SOS
            break;
        }
        const length = buffer.readUInt16BE(i);
        if (marker >= 0xC0 && marker <= 0xC3) { // SOF0, SOF1, SOF2
            const height = buffer.readUInt16BE(i + 3);
            const width = buffer.readUInt16BE(i + 5);
            return { width, height };
        }
        i += length;
    }
    return null;
}

try {
    console.log('Xanadu_black_new_1.jpg:', getJpegDimensions('Xanadu_black_new_1.jpg'));
    console.log('Xanadu_black_new_2.jpg:', getJpegDimensions('Xanadu_black_new_2.jpg'));
    console.log('Xanadu_black_new_3.jpg:', getJpegDimensions('Xanadu_black_new_3.jpg'));
} catch (err) {
    console.error(err);
}
