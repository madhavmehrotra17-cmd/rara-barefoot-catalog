const fs = require('fs');
const transcriptPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl';
if (!fs.existsSync(transcriptPath)) {
    console.log('Transcript not found');
    process.exit(1);
}

const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.trim().split('\n');
console.log('Searching in', lines.length, 'lines...');

let results = [];
lines.forEach((line, idx) => {
    if (line.trim()) {
        try {
            const obj = JSON.parse(line);
            const text = JSON.stringify(obj).toLowerCase();
            if (text.includes('scroll 2') || text.includes('second scroll') || (obj.type === 'USER_INPUT' && text.includes('scroll'))) {
                results.push({
                    idx,
                    step_index: obj.step_index,
                    source: obj.source,
                    type: obj.type,
                    content: obj.content ? obj.content.substring(0, 400) : 'No content'
                });
            }
        } catch(e) {
            // ignore
        }
    }
});

console.log(`Found ${results.length} matches:`);
results.forEach(r => {
    console.log(`\n--- Match at Line ${r.idx} (Step ${r.step_index}, ${r.source} - ${r.type}) ---`);
    console.log(r.content);
});
