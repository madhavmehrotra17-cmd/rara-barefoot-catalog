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

  for await (const line of rl) {
    if (line.includes('product-extra-information') && line.includes('RARA Barefoot')) {
      try {
        const obj = JSON.parse(line);
        function search(val) {
          if (typeof val === 'string') {
            if (val.includes('product-extra-information') && val.includes('RARA Barefoot')) {
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
                        candidates.push({
                          length: candidate.length,
                          content: candidate,
                          hasTruncation: candidate.includes('...') || candidate.includes('..')
                        });
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
      } catch (e) {}
    }
  }

  console.log(`Found ${candidates.length} candidates in logs:`);
  candidates.forEach((cand, i) => {
    console.log(`Candidate ${i}: Length ${cand.length}, hasTruncation: ${cand.hasTruncation}`);
    if (!cand.hasTruncation) {
      console.log("Candidate content preview (first 500 chars):");
      console.log(cand.content.substring(0, 500));
      fs.writeFileSync(path.join(__dirname, `candidate_${i}.html`), cand.content, 'utf8');
      console.log(`Saved to candidate_${i}.html`);
    }
  });
}

restore();
