const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl';

async function printLine() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (lineCount === 4333) {
      console.log("=== Line 4333 ===");
      // Save it to a file directly
      fs.writeFileSync(path.join(__dirname, 'line_4333.json'), line, 'utf8');
      console.log("Saved line 4333 to scratch/line_4333.json");
      
      // Let's parse it and see
      try {
        const obj = JSON.parse(line);
        console.log("Keys in JSON:", Object.keys(obj));
        if (obj.content) {
          console.log("Content preview:", obj.content.substring(0, 1000));
        }
      } catch (e) {
        console.error("JSON parse error:", e);
      }
      break;
    }
  }
}

printLine();
