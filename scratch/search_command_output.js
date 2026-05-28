const fs = require('fs');
const readline = require('readline');

async function searchTranscript() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Searching for scratch_dump_benefits_full.js or below_catalogue command output in transcript...');
    for await (const line of rl) {
        if (line.includes('scratch_dump_benefits_full.js') || line.includes('below_catalogue_1.1')) {
            try {
                const data = JSON.parse(line);
                console.log(`\n=== Found step: ${data.step_index}, source: ${data.source}, type: ${data.type} ===`);
                if (data.content) {
                    console.log('--- Content ---');
                    console.log(data.content.substring(0, 2000));
                }
                if (data.tool_calls) {
                    data.tool_calls.forEach(tc => {
                        console.log(`Tool: ${tc.name}`);
                    });
                }
            } catch (e) {
                // Ignore
            }
        }
    }
}

searchTranscript();
