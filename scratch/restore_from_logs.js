const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl';

async function searchLogs() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (line.includes('product-extra-information') && line.includes('accordion-disclosure')) {
      console.log(`Found candidate on line ${lineCount}`);
      // Let's print a part of it
      const startIdx = line.indexOf('product-extra-information');
      console.log(line.substring(startIdx - 100, startIdx + 2000));
      console.log("\n=====================================\n");
    }
  }
}

searchLogs();
