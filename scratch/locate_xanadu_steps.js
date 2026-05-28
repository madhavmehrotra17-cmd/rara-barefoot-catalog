const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Searching for lines with Xanadu_black_new_1...');
    for await (const line of rl) {
        if (line.includes('Xanadu_black_new_1')) {
            try {
                const data = JSON.parse(line);
                console.log(`Found matching step: ${data.step_index}, type: ${data.type}`);
                if (data.tool_calls) {
                    data.tool_calls.forEach(tc => {
                        console.log(`Tool Name: ${tc.name}`);
                        console.log('Tool Args (keys):', Object.keys(tc.args || {}));
                        if (tc.args && tc.args.ReplacementChunks) {
                            console.log('Chunks:', JSON.stringify(tc.args.ReplacementChunks).substring(0, 1000));
                        }
                    });
                }
            } catch (e) {
                // Ignore
            }
        }
    }
}

searchTranscript();
