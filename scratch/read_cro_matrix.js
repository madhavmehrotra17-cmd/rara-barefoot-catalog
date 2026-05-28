const fs = require('fs');

const filePath = 'C:\\Users\\Madhav Mehrotra\\OneDrive\\ドキュメント\\RARAbarefoot\\RARA_x_Granimals_CRO_Copy_Matrix.md';
try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('=== RARA_x_Granimals_CRO_Copy_Matrix.md ===');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
        if (line.toLowerCase().includes('balanced') || line.toLowerCase().includes('wide') || line.toLowerCase().includes('flexible') || line.toLowerCase().includes('benefit')) {
            console.log(`Line ${idx + 1}: ${line.trim()}`);
        }
    });
} catch (e) {
    console.error('Error reading file:', e);
}
