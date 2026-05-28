const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone';
const files = fs.readdirSync(dir);

let output = 'SCAN RESULTS:\n\n';

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const hasPremiumFooter = content.includes('premium-footer');
        const hasFooter = content.includes('<footer') || content.includes('footer');
        const hasInsta = content.includes('instagram-feed-section') || content.includes('insta-1.png');
        
        output += `- ${file}:\n`;
        output += `  * Has <footer class="premium-footer">: ${hasPremiumFooter}\n`;
        output += `  * Has any footer element/reference: ${hasFooter}\n`;
        output += `  * Has Instagram feed: ${hasInsta}\n\n`;
    }
});

fs.writeFileSync(path.join(dir, 'scratch', 'scan_results.txt'), output, 'utf8');
console.log('Scan results written to scratch/scan_results.txt');
