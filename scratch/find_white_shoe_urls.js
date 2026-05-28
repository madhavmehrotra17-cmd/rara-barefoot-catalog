const fs = require('fs');
const readline = require('readline');

async function findUrls() {
    const fileStream = fs.createReadStream('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\brain\\7e79a66a-32c9-440f-8de0-fa2866b0a68b\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    console.log('Searching for below_catalogue URLs in transcript...');
    const urls = new Set();
    for await (const line of rl) {
        if (line.includes('below_catalogue')) {
            const matches = line.match(/https?:\/\/[^\s"']+/g);
            if (matches) {
                matches.forEach(m => {
                    if (m.includes('below_catalogue')) {
                        // clean up URL
                        const url = m.split(/[\\"]/)[0].replace(/&amp;/g, '&');
                        urls.add(url);
                    }
                });
            }
        }
    }
    
    console.log('Found URLs:');
    urls.forEach(u => console.log(u));
}

findUrls();
