const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl', 'utf8');
const lines = content.split('\n');

for (const line of lines) {
    if (line.includes('"step_index":1443') || line.includes('"step_index": 1443')) {
        console.log("=== FOUND STEP 1443 LINE ===");
        try {
            const data = JSON.parse(line);
            const tc = data.tool_calls[0];
            let chunksStr = tc.args.ReplacementChunks;
            
            // Escape literal newlines and carriage returns
            // Since it is a JSON string, let's escape actual newlines in strings
            // But wait! If we do a global replace of \n with \\n, any existing escaped newlines might become double-escaped,
            // but in the raw string chunksStr, the newlines are ACTUAL literal newlines (0x0A).
            // Let's replace only literal 0x0A and 0x0D:
            const sanitized = chunksStr
                .replace(/\r/g, '\\r')
                .replace(/\n/g, '\\n');
            
            const chunks = JSON.parse(sanitized);
            
            chunks.forEach((chunk, idx) => {
                console.log(`\n--- CHUNK ${idx + 1} ---`);
                console.log(`StartLine: ${chunk.StartLine}, EndLine: ${chunk.EndLine}`);
                console.log(`TARGET CONTENT:`);
                console.log(chunk.TargetContent);
                console.log(`REPLACEMENT CONTENT:`);
                console.log(chunk.ReplacementContent);
            });
        } catch (e) {
            console.error("Error in parse_step_1443_perfect:", e);
        }
    }
}
