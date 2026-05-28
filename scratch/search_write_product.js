const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl';

async function search() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  let matches = [];

  for await (const line of rl) {
    lineCount++;
    if (line.includes('write_to_file') && line.includes('product.html') && line.includes('Brand Name')) {
      console.log(`Found candidate on line ${lineCount}`);
      matches.push({ line: lineCount, content: line });
    }
  }

  console.log(`\nFound ${matches.length} matching write_to_file operations:`);
  matches.forEach((m, idx) => {
    console.log(`Match ${idx} (Line ${m.line}):`);
    // Save to match JSON
    fs.writeFileSync(path.join(__dirname, `write_match_${m.line}.json`), m.content, 'utf8');
    console.log(`Saved to write_match_${m.line}.json`);
    
    // Parse and show preview
    try {
      const obj = JSON.parse(m.content);
      // Let's find tool calls
      if (obj.tool_calls) {
        obj.tool_calls.forEach(tc => {
          if (tc.name === 'write_to_file') {
            console.log("  TargetFile:", tc.args.TargetFile);
            console.log("  CodeContent Length:", tc.args.CodeContent.length);
          }
        });
      }
    } catch (e) {
      console.error("  Parse error:", e);
    }
  });
}

search();
