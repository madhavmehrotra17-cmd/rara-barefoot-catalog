const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Search for Shop Men and Shop Women buttons/links
const regex = /[^<>\n]*(?:Shop Men|Shop Women)[^<>\n]*/gi;
let match;
console.log("--- Occurrences of Shop Men / Shop Women in index.html ---");
while ((match = regex.exec(html)) !== null) {
    console.log(match[0].trim());
    // Also print context around the match (150 chars before and after)
    const start = Math.max(0, match.index - 200);
    const end = Math.min(html.length, match.index + 200);
    console.log("Context:");
    console.log(html.substring(start, end).trim());
    console.log("-----------------------------------------");
}
