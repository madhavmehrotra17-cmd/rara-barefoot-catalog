const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\2df1258d-29f9-43cb-aa78-7283eed9d815\\.system_generated\\logs\\transcript.jsonl';

async function search() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let candidates = [];
  let lineNum = 0;

  for await (const line of rl) {
    lineNum++;
    if (line.includes('product-extra-information') && line.includes('RARA Barefoot')) {
      try {
        const obj = JSON.parse(line);
        function searchObj(val) {
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
                        candidates.push(val.substring(divStart, divClose + 6));
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
      } catch (e) {}
    }
  }

  console.log(`Found ${candidates.length} candidates in past logs:`);
  candidates.forEach((cand, i) => {
    console.log(`Candidate ${i}: Length ${cand.length}, hasTruncation: ${cand.includes('...')}`);
    if (!cand.includes('...')) {
      fs.writeFileSync(path.join(__dirname, `past_cand_${i}.html`), cand, 'utf8');
      console.log(`  Saved to past_cand_${i}.html`);
    }
  });
}

search();
