const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (data.step_index === 1443) {
                console.log(`=== FOUND STEP 1443 ===`);
                if (data.tool_calls) {
                    data.tool_calls.forEach(tc => {
                        const args = tc.args || {};
                        const chunks = typeof args.ReplacementChunks === 'string' ? JSON.parse(args.ReplacementChunks) : args.ReplacementChunks;
                        chunks.forEach((chunk, idx) => {
                            console.log(`\n--- CHUNK ${idx + 1} ---`);
                            console.log(`StartLine: ${chunk.StartLine}, EndLine: ${chunk.EndLine}`);
                            console.log(`TARGET CONTENT:`);
                            console.log(chunk.TargetContent);
                            console.log(`REPLACEMENT CONTENT:`);
                            console.log(chunk.ReplacementContent);
                        });
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}

searchTranscript();
