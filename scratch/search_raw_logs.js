const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl';

async function restore() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let candidates = [];
  let lineNum = 0;

  for await (const line of rl) {
    lineNum++;
    if (line.includes('product-extra-information')) {
      try {
        const obj = JSON.parse(line);
        function search(val) {
          if (typeof val === 'string') {
            if (val.includes('product-extra-information')) {
              let idx = val.indexOf('id="product-extra-information"');
              if (idx !== -1) {
                candidates.push({
                  line: lineNum,
                  length: val.length,
                  preview: val.substring(idx, idx + 400),
                  content: val
                });
              }
            }
          } else if (typeof val === 'object' && val !== null) {
            for (let key in val) {
              search(val[key]);
            }
          }
        }
        search(obj);
      } catch (e) {}
    }
  }

  console.log(`Found ${candidates.length} candidates in logs:`);
  candidates.forEach((cand, i) => {
    console.log(`\nCandidate ${i} (Line: ${cand.line}, Length: ${cand.length}):`);
    console.log(`Preview: ${cand.preview}`);
    // Write each candidate to a separate file so we can inspect them
    fs.writeFileSync(path.join(__dirname, `cand_${cand.line}_${i}.html`), cand.content, 'utf8');
    console.log(`Saved to cand_${cand.line}_${i}.html`);
  });
}

restore();
