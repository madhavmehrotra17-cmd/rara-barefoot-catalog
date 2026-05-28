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
  for await (const line of rl) {
    lineCount++;
    if (lineCount < 200) {
      if (line.includes('product.html') && line.includes('view_file')) {
        console.log(`\n=== Line ${lineCount} contains view_file product.html ===`);
        console.log(line.substring(0, 1000));
        // Save the full line to a file for parsing
        fs.writeFileSync(path.join(__dirname, `first_read_line_${lineCount}.json`), line, 'utf8');
      }
    } else {
      break;
    }
  }
}

search();
