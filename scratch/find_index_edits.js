const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Searching for index.html modifications in transcript...');
    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (data.tool_calls) {
                for (const tc of data.tool_calls) {
                    const args = tc.args || {};
                    const targetFile = args.TargetFile || '';
                    if (targetFile.includes('index.html')) {
                        console.log(`\n=== STEP ${data.step_index} (${tc.name}) ===`);
                        console.log(`Description: ${args.Description}`);
                        if (args.TargetContent) {
                            console.log('--- TARGET CONTENT ---');
                            console.log(args.TargetContent);
                        }
                        if (args.ReplacementContent) {
                            console.log('--- REPLACEMENT CONTENT ---');
                            console.log(args.ReplacementContent);
                        }
                        if (args.CodeContent) {
                            console.log('--- CODE CONTENT (truncated) ---');
                            console.log(args.CodeContent.substring(0, 1000));
                        }
                    }
                }
            }
        } catch (e) {
            // Ignore parse errors
        }
    }
    console.log('\nSearch finished.');
}

searchTranscript();
