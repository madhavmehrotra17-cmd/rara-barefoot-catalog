const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Searching for the origin of benefits description texts...');
    for await (const line of rl) {
        if (line.includes('FLAT SOLE KEEPS') || line.includes('TOES SPREAD WIDE')) {
            try {
                const data = JSON.parse(line);
                console.log(`\n=== Found step: ${data.step_index}, source: ${data.source}, type: ${data.type} ===`);
                if (data.content) {
                    console.log('Content (truncated):');
                    console.log(data.content.substring(0, 1500));
                }
                break; // Just find the first one
            } catch (e) {
                // Ignore
            }
        }
    }
}

searchTranscript();
