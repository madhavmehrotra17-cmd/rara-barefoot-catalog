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
  let bestLen = 0;
  let lineCount = 0;

  for await (const line of rl) {
    lineCount++;
    // We want to find a line that contains the raw product-extra-information accordion html
    if (line.includes('product-extra-information') && line.includes('RARA Barefoot') && line.includes('Heel to Toe Drop')) {
      // Let's parse this line as JSON
      try {
        const obj = JSON.parse(line);
        // Recursive search for a string that has no truncation "..." in the critical parts
        function search(val) {
          if (typeof val === 'string') {
            if (val.includes('product-extra-information') && val.includes('RARA Barefoot') && !val.includes('limit="2" intent="complementary"></product-recommendations><accord\n...')) {
              let idx = val.indexOf('id="product-extra-information"');
              if (idx !== -1) {
                let divStart = val.lastIndexOf('<div', idx);
                if (divStart !== -1) {
                  let faqIdx = val.indexOf('FAQS', divStart);
                  if (faqIdx !== -1) {
                    let nextClose = val.indexOf('</accordion-disclosure>', faqIdx);
                    if (nextClose !== -1) {
                      let divClose = val.indexOf('</div>', nextClose);
                      if (divClose !== -1) {
                        let candidate = val.substring(divStart, divClose + 6);
                        if (candidate.length > bestLen) {
                          bestLen = candidate.length;
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
              search(val[key]);
            }
          }
        }
        search(obj);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }

  if (bestCandidate) {
    console.log(`[SUCCESS] Found complete, un-truncated block in logs! Length: ${bestCandidate.length}`);
    console.log("Snippet:");
    console.log(bestCandidate.substring(0, 800));
    console.log("\n...\n");
    console.log(bestCandidate.substring(bestCandidate.length - 800));
    
    fs.writeFileSync(path.join(__dirname, 'restored_full_accordions.html'), bestCandidate, 'utf8');
    console.log("Saved restored block to scratch/restored_full_accordions.html");
  } else {
    console.log("[ERROR] Could not find un-truncated block in logs.");
  }
}

restore();
