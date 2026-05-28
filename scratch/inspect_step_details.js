const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const targetSteps = [1390, 1394, 1447, 1453, 1526, 1538];
    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (targetSteps.includes(data.step_index)) {
                console.log(`=== STEP ${data.step_index} ===`);
                if (data.tool_calls) {
                    for (const tc of data.tool_calls) {
                        console.log(`Tool: ${tc.name}`);
                        console.log(`Args keys: ${Object.keys(tc.arguments || {})}`);
                        if (tc.arguments?.TargetFile) {
                            console.log(`TargetFile: ${tc.arguments.TargetFile}`);
                        }
                        if (tc.arguments?.ReplacementContent) {
                            console.log('--- REPLACEMENT CONTENT (truncated) ---');
                            console.log(tc.arguments.ReplacementContent.substring(0, 1000));
                        }
                        if (tc.arguments?.CodeContent) {
                            console.log('--- CODE CONTENT (truncated) ---');
                            console.log(tc.arguments.CodeContent.substring(0, 1000));
                        }
                        if (tc.arguments?.TargetContent) {
                            console.log('--- TARGET CONTENT (truncated) ---');
                            console.log(tc.arguments.TargetContent.substring(0, 1000));
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
