const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl', 'utf8');
const lines = content.split('\n');

for (const line of lines) {
    if (line.includes('"step_index":1443') || line.includes('"step_index": 1443')) {
        console.log("=== FOUND STEP 1443 LINE ===");
        try {
            const data = JSON.parse(line);
            const tc = data.tool_calls[0];
            const args = tc.args || {};
            console.log("Is ReplacementChunks string?", typeof args.ReplacementChunks);
            
            let chunksStr = args.ReplacementChunks;
            // Clean up double escapes if it is a string
            if (typeof chunksStr === 'string') {
                // If it was stringified, let's parse it.
                // But first, let's fix typical JSON double-escaping issues by doing a JSON.parse on it.
                const chunks = JSON.parse(chunksStr);
                chunks.forEach((chunk, idx) => {
                    console.log(`\n--- CHUNK ${idx + 1} ---`);
                    console.log(`StartLine: ${chunk.StartLine}, EndLine: ${chunk.EndLine}`);
                    console.log(`TARGET CONTENT:`);
                    console.log(chunk.TargetContent);
                    console.log(`REPLACEMENT CONTENT:`);
                    console.log(chunk.ReplacementContent);
                });
            }
        } catch (e) {
            console.error("Error parsing step 1443 chunks:", e);
        }
    }
}
