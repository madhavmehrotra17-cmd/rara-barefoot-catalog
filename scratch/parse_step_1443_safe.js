const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl', 'utf8');
const lines = content.split('\n');

for (const line of lines) {
    if (line.includes('"step_index":1443') || line.includes('"step_index": 1443')) {
        console.log("=== FOUND STEP 1443 LINE ===");
        
        // Find indices of "TargetContent" and "ReplacementContent"
        let lastIdx = 0;
        while (true) {
            let targetIdx = line.indexOf('"TargetContent"', lastIdx);
            if (targetIdx === -1) break;
            
            console.log("\n--- FOUND TARGET CONTENT SEGMENT ---");
            let nextColon = line.indexOf(':', targetIdx);
            let startQuote = line.indexOf('"', nextColon + 1);
            
            // Find ending quote of the string, being careful of escaped quotes \"
            let endQuote = startQuote + 1;
            while (endQuote < line.length) {
                if (line[endQuote] === '"' && line[endQuote - 1] !== '\\') {
                    break;
                }
                endQuote++;
            }
            
            let rawStr = line.substring(startQuote + 1, endQuote);
            // Unescape the string manually
            let unescapedStr = rawStr
                .replace(/\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/\\\\/g, '\\');
            console.log("UNESCAPED TARGET CONTENT:");
            console.log(unescapedStr);
            
            lastIdx = endQuote;
        }
        
        // Let's also look for "ReplacementContent" segments
        lastIdx = 0;
        while (true) {
            let repIdx = line.indexOf('"ReplacementContent"', lastIdx);
            if (repIdx === -1) break;
            
            console.log("\n--- FOUND REPLACEMENT CONTENT SEGMENT ---");
            let nextColon = line.indexOf(':', repIdx);
            let startQuote = line.indexOf('"', nextColon + 1);
            
            let endQuote = startQuote + 1;
            while (endQuote < line.length) {
                if (line[endQuote] === '"' && line[endQuote - 1] !== '\\') {
                    break;
                }
                endQuote++;
            }
            
            let rawStr = line.substring(startQuote + 1, endQuote);
            let unescapedStr = rawStr
                .replace(/\\"/g, '"')
                .replace(/\\n/g, '\n')
                .replace(/\\\\/g, '\\');
            console.log("UNESCAPED REPLACEMENT CONTENT (truncated):");
            console.log(unescapedStr.substring(0, 1000));
            
            lastIdx = endQuote;
        }
    }
}
