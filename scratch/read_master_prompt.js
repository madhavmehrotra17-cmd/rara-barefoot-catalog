const fs = require('fs');

const filePath = 'C:\\Users\\Madhav Mehrotra\\OneDrive\\ドキュメント\\RARAbarefoot\\RARA_Barefoot_Master_Prompt.txt';
try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('=== RARA_Barefoot_Master_Prompt.txt ===');
    console.log(content);
} catch (e) {
    console.error('Error reading file:', e);
}
