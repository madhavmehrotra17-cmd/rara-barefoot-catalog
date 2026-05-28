const fs = require('fs');
const transcriptPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl';
if (!fs.existsSync(transcriptPath)) {
    fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\last_steps_output.txt', 'Transcript not found at ' + transcriptPath);
    process.exit(0);
}

const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.trim().split('\n');
let output = `Total steps: ${lines.length}\n`;
const lastN = Math.min(12, lines.length);
for (let i = lines.length - lastN; i < lines.length; i++) {
    try {
        const step = JSON.parse(lines[i]);
        output += `\n--- Step ${step.step_index} (${step.source} - ${step.type}) ---\n`;
        if (step.content) {
            output += step.content.substring(0, 1500) + '\n';
        } else if (step.tool_calls) {
            output += 'Tool calls: ' + JSON.stringify(step.tool_calls, null, 2) + '\n';
        }
    } catch(e) {
        output += `Error parsing line ${i}: ${e.message}\n`;
    }
}
fs.writeFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone\\last_steps_output.txt', output, 'utf8');
console.log('Done');
