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
      try {
        const obj = JSON.parse(line);
        // Let's traverse the object to find any string containing `product-extra-information`
        // We will do a recursive search
        function searchObj(val) {
          if (typeof val === 'string') {
            if (val.includes('product-extra-information') && val.includes('Core Properties') && val.includes('FAQS')) {
              let idx = val.indexOf('id="product-extra-information"');
              if (idx !== -1) {
                // Find the opening tag: `<div id="product-extra-information"`
                let divStart = val.lastIndexOf('<div', idx);
                if (divStart !== -1) {
                  // Find the end: we want it to end after the FAQS accordion's closing tags
                  let faqIdx = val.indexOf('FAQS', divStart);
                  if (faqIdx !== -1) {
                    let nextClose = val.indexOf('</accordion-disclosure>', faqIdx);
                    if (nextClose !== -1) {
                      let divClose = val.indexOf('</div>', nextClose);
                      if (divClose !== -1) {
                        let candidate = val.substring(divStart, divClose + 6);
                        if (candidate.length > maxLen && candidate.length < 30000) {
                          maxLen = candidate.length;
                          bestCandidate = candidate;
                        }
                      }
                    }
                  }
                }
              }
            }
          } else if (typeof val === 'object' && val !== null) {
            for (let key in val) {
              searchObj(val[key]);
            }
          }
        }
        searchObj(obj);
      } catch (e) {
        // Ignore JSON parse errors for incomplete lines
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
