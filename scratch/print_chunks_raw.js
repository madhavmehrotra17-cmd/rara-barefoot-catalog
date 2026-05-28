const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl', 'utf8');
const lines = content.split('\n');

for (const line of lines) {
    if (line.includes('"step_index":1443') || line.includes('"step_index": 1443')) {
        console.log("=== FOUND STEP 1443 LINE ===");
        try {
            const data = JSON.parse(line);
            const tc = data.tool_calls[0];
            const chunksStr = tc.args.ReplacementChunks;
            console.log("Length of chunksStr:", chunksStr.length);
            console.log("First 2000 chars:");
            console.log(chunksStr.substring(0, 2000));
        } catch (e) {
            console.error("Error in print_chunks_raw:", e);
        }
    }
}
