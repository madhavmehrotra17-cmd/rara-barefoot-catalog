const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Searching for below_catalogue in command outputs/run steps...');
    for await (const line of rl) {
        if (line.includes('below_catalogue') && (line.includes('"type":"RUN_COMMAND"') || line.includes('"type":"SYSTEM_GENERATED"') || line.includes('"status":"DONE"'))) {
            try {
                const data = JSON.parse(line);
                console.log(`\n=== Found step: ${data.step_index}, type: ${data.type} ===`);
                if (data.content) {
                    console.log('Content (truncated to 3000 chars):');
                    console.log(data.content.substring(0, 3000));
                }
            } catch (e) {
                // Ignore
            }
        }
    }
}

searchTranscript();
