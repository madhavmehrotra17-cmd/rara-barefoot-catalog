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

  let lineNum = 0;
  let found = false;

  for await (const line of rl) {
    lineNum++;
    // Let's search for a string in the logs that has "Brand Name" and "Care" and "FAQS" and does NOT have "..." or any other truncation
    if (line.includes('product-extra-information') && line.includes('Brand Name') && line.includes('Care') && line.includes('FAQS')) {
      // Let's check if the line contains truncation "..."
      const hasTruncation = line.includes('...') || line.includes('..');
      console.log(`Line ${lineNum} matches: length ${line.length}, hasTruncation: ${hasTruncation}`);
      
      if (!hasTruncation) {
        found = true;
        // Parse and extract the full string
        try {
          const obj = JSON.parse(line);
          function extract(val) {
            if (typeof val === 'string' && val.includes('product-extra-information') && val.includes('Brand Name')) {
              let idx = val.indexOf('id="product-extra-information"');
              if (idx !== -1) {
                let divStart = val.lastIndexOf('<div', idx);
                let faqClose = val.indexOf('</accordion-disclosure>', val.indexOf('FAQS'));
                if (faqClose !== -1) {
                  let divClose = val.indexOf('</div>', faqClose);
                  if (divClose !== -1) {
                    const block = val.substring(divStart, divClose + 6);
                    console.log(`[SUCCESS] Extracted un-truncated block of length ${block.length}!`);
                    fs.writeFileSync(path.join(__dirname, 'perfect_restored_accordions.html'), block, 'utf8');
                    console.log("Saved to perfect_restored_accordions.html");
                  }
                }
              }
            } else if (typeof val === 'object' && val !== null) {
              for (let key in val) {
                extract(val[key]);
              }
            }
          }
          extract(obj);
        } catch (e) {
          console.error("JSON parse error:", e);
        }
      }
    }
  }
  
  if (!found) {
    console.log("Could not find any un-truncated candidate in logs.");
  }
}

search();
