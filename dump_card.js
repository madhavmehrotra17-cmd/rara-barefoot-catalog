const fs = require('fs');
const html = fs.readFileSync('mens.html', 'utf8');
const regex = /<div class="card-wrapper[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/;
const match = html.match(regex);
if (match) {
    console.log(match[0]);
} else {
    console.log("No card found");
}
