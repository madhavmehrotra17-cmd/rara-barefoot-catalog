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
    // Search for steps where we viewed product.html and specified line numbers around 6400
    if (line.includes('product.html') && line.includes('StartLine') && line.includes('640')) {
      console.log(`\n=== Found view_file on line ${lineCount} ===`);
      console.log(line.substring(0, 1000));
    }
    // Also search for any printed output containing "Brand Name: <br><b>RARA Barefoot</b>"
    if (line.includes('Brand Name: <br><b>RARA Barefoot</b>') && line.includes('Output:')) {
      console.log(`\n=== Found command output containing Brand Name on line ${lineCount} ===`);
      console.log(line.substring(0, 2000));
    }
  }
}

search();
