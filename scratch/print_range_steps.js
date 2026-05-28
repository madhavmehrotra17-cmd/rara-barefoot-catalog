const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Printing transcript for steps 1495 to 1515:');
    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (data.step_index >= 1495 && data.step_index <= 1515) {
                console.log(`\n=== STEP ${data.step_index} (${data.source} - ${data.type}) ===`);
                if (data.content) {
                    console.log(data.content.substring(0, 2000));
                }
                if (data.tool_calls) {
                    data.tool_calls.forEach(tc => {
                        console.log(`Called Tool: ${tc.name}`);
                    });
                }
            }
        } catch (e) {
            // Ignore
        }
    }
}

searchTranscript();
