const fs = require('fs');
const path = require('path');

const filesToClean = [
    'original_white_1.jpg',
    'original_white_2.jpg',
    'original_white_3.jpg',
    'scratch_find_user_folders.js',
    'scratch_search_all_below.js'
];

console.log('Cleaning up temporary files...');
filesToClean.forEach(f => {
    const p = path.join('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone', f);
    if (fs.existsSync(p)) {
        try {
            fs.unlinkSync(p);
            console.log(`Deleted: ${f}`);
        } catch (e) {
            console.error(`Error deleting ${f}:`, e.message);
        }
    }
});
console.log('Cleanup complete.');
