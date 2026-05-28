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

  let bestCandidate = null;
  let maxLen = 0;

  for await (const line of rl) {
    if (line.includes('product-extra-information') && line.includes('Core Properties') && line.includes('FAQS')) {
      // Find JSON strings or arguments that contain the entire HTML
      // Let's search for matches of this block
      // A typical line in JSONL is a full step JSON. Let's find the longest substring that starts with `<div id="product-extra-information"` and ends with `</accordion-disclosure>\n</div>`
      let startIdx = 0;
      while (true) {
        startIdx = line.indexOf('product-extra-information', startIdx);
        if (startIdx === -1) break;
        
        // Find the start of the div tag before it: `<div id="product-extra-information"`
        const divStart = line.lastIndexOf('<div', startIdx);
        if (divStart !== -1) {
          // Find the end: we want it to contain `FAQS` and end with `</accordion-disclosure>\n</div>` or similar
          // Let's find "FAQS" first
          const faqIdx = line.indexOf('FAQS', divStart);
          if (faqIdx !== -1) {
            const nextClose = line.indexOf('</accordion-disclosure>', faqIdx);
            if (nextClose !== -1) {
              const divClose = line.indexOf('</div>', nextClose);
              if (divClose !== -1) {
                const len = divClose + 6 - divStart;
                const candidate = line.substring(divStart, divClose + 6);
                if (candidate.includes('Core Properties') && candidate.includes('Product Specs') && len > maxLen && len < 25000) {
                  maxLen = len;
                  bestCandidate = candidate;
                }
              }
            }
          }
        }
        startIdx += 25;
      }
    }
  }

  if (bestCandidate) {
    console.log(`[SUCCESS] Found best candidate of length ${maxLen}!`);
    console.log("Snippet:");
    console.log(bestCandidate.substring(0, 500));
    console.log("...");
    console.log(bestCandidate.substring(bestCandidate.length - 500));
    
    // Save to scratch/restored_block.html
    fs.writeFileSync(path.join(__dirname, 'restored_block.html'), bestCandidate, 'utf8');
    console.log("Saved restored block to scratch/restored_block.html");
  } else {
    console.log("[ERROR] Could not find a full restore candidate in logs.");
  }
}

restore();
