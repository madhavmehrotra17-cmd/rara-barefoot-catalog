const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Searching for User inputs and Model responses regarding benefits shoes...');
    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (data.type === 'USER_INPUT') {
                console.log(`\n=== USER INPUT (Step ${data.step_index}) ===`);
                console.log(data.content);
            } else if (data.type === 'PLANNER_RESPONSE' && (data.content?.includes('benefit') || data.content?.includes('Xanadu') || data.content?.includes('black') || data.content?.includes('white'))) {
                console.log(`\n=== MODEL RESPONSE (Step ${data.step_index}) ===`);
                console.log(data.content.substring(0, 1000));
            }
        } catch (e) {
            // Ignore
        }
    }
}

searchTranscript();
