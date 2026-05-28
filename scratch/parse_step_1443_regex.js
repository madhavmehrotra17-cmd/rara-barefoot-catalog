const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl', 'utf8');
const lines = content.split('\n');

for (const line of lines) {
    if (line.includes('"step_index":1443') || line.includes('"step_index": 1443')) {
        console.log("=== FOUND STEP 1443 LINE ===");
        try {
            const data = JSON.parse(line);
            const tc = data.tool_calls[0];
            const chunksStr = tc.args.ReplacementChunks;
            
            // Let's use regex to find all "TargetContent": "..." matches
            // We can match: "TargetContent"\s*:\s*"((?:[^"\\]|\\.)*)"
            const targetRegex = /"TargetContent"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
            const replacementRegex = /"ReplacementContent"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
            
            const targets = [];
            const replacements = [];
            
            let match;
            while ((match = targetRegex.exec(chunksStr)) !== null) {
                targets.push(match[1]);
            }
            
            while ((match = replacementRegex.exec(chunksStr)) !== null) {
                replacements.push(match[1]);
            }
            
            console.log(`Found ${targets.length} targets and ${replacements.length} replacements.`);
            
            targets.forEach((t, idx) => {
                console.log(`\n--- CHUNK ${idx + 1} ---`);
                console.log(`TARGET CONTENT:`);
                // Unescape backslashes and newlines
                const unescapedTarget = t
                    .replace(/\\"/g, '"')
                    .replace(/\\n/g, '\n')
                    .replace(/\\\\/g, '\\');
                console.log(unescapedTarget);
                
                if (replacements[idx]) {
                    console.log(`REPLACEMENT CONTENT:`);
                    const unescapedRep = replacements[idx]
                        .replace(/\\"/g, '"')
                        .replace(/\\n/g, '\n')
                        .replace(/\\\\/g, '\\');
                    console.log(unescapedRep);
                }
            });
        } catch (e) {
            console.error("Error parsing chunks via regex:", e);
        }
    }
}
