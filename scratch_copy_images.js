const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Madhav Mehrotra\\OneDrive\\ドキュメント\\RARAbarefoot';
const destDir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';

const filesToCopy = [
    { src: 'Xanadu black new-1.JPG', dest: 'Xanadu_black_new_1.jpg' },
    { src: 'Xanadu black new-2.JPG', dest: 'Xanadu_black_new_2.jpg' },
    { src: 'Xanadu black new-3.JPG', dest: 'Xanadu_black_new_3.jpg' }
];

filesToCopy.forEach(f => {
    const srcPath = path.join(srcDir, f.src);
    const destPath = path.join(destDir, f.dest);
    
    if (fs.existsSync(srcPath)) {
        try {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Successfully copied ${f.src} to ${f.dest}`);
            const stat = fs.statSync(destPath);
            console.log(`- Size: ${stat.size} bytes`);
        } catch(err) {
            console.error(`Error copying ${f.src}:`, err.message);
        }
    } else {
        console.error(`Source file not found: ${srcPath}`);
    }
});
