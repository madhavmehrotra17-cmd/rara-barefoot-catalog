const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Searching for index.html tool calls or content in transcript...');
    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (data.tool_calls) {
                for (const tc of data.tool_calls) {
                    if (tc.name === 'replace_file_content' || tc.name === 'write_to_file') {
                        const tcStr = JSON.stringify(tc);
                        if (tcStr.includes('below_catalogue') || tcStr.includes('below-catalogue')) {
                            console.log(`Found relevant tool call at step index ${data.step_index}:`);
                            console.log(`Tool Name: ${tc.name}`);
                            console.log(`Target Content length: ${tc.arguments?.TargetContent?.length}`);
                            console.log(`Target Content: ${tc.arguments?.TargetContent}`);
                            console.log('---');
                        }
                    }
                }
            }
        } catch (e) {
            // Ignore parse errors
        }
    }
    console.log('Search finished.');
}

searchTranscript();
