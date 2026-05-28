const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const targetSteps = [1443, 1514];
    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (targetSteps.includes(data.step_index)) {
                console.log(`\n=== STEP ${data.step_index} ===`);
                if (data.tool_calls) {
                    for (const tc of data.tool_calls) {
                        const args = tc.args || {};
                        if (args.ReplacementChunks) {
                            // ReplacementChunks could be a string (JSON string) or an array.
                            const chunks = typeof args.ReplacementChunks === 'string' ? JSON.parse(args.ReplacementChunks) : args.ReplacementChunks;
                            chunks.forEach((chunk, cidx) => {
                                console.log(`\n--- CHUNK ${cidx + 1} ---`);
                                console.log(`StartLine: ${chunk.StartLine}, EndLine: ${chunk.EndLine}`);
                                console.log(`TARGET CONTENT:`);
                                console.log(chunk.TargetContent);
                                console.log(`REPLACEMENT CONTENT:`);
                                console.log(chunk.ReplacementContent);
                            });
                        }
                    }
                }
            }
        } catch (e) {
            // Ignore parse errors
        }
    }
}

searchTranscript();
