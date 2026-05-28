const https = require('https');
const fs = require('fs');
const path = require('path');

const productHandle = 'uruk-blue-barefoot-shoes-men';
const liveUrl = `https://www.rarabarefoot.in/products/${productHandle}`;

console.log(`Fetching live product detail page from: ${liveUrl}`);

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
  }
};

https.get(liveUrl, options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Error: Received status code ${res.statusCode}`);
    process.exit(1);
  }

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`Successfully fetched live HTML of length: ${data.length}`);
    
    // Save to product.html
    const targetPath = path.join(__dirname, '..', 'product.html');
    fs.writeFileSync(targetPath, data, 'utf8');
    console.log(`Saved product detail page template to: ${targetPath}`);
  });
}).on('error', (err) => {
  console.error('Network Error: ', err.message);
  process.exit(1);
});
