const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexFile)) {
    console.error("index.html not found!");
    process.exit(1);
}

let content = fs.readFileSync(indexFile, 'utf8');

// We want to replace the first banner link with ?gender=men
const targetMen = `<a href="/collections/the-collection" class="gender-banner-card">
        <img src="male final.png"`;

const newMen = `<a href="/collections/the-collection?gender=men" class="gender-banner-card">
        <img src="male final.png"`;

// We want to replace the second banner link with ?gender=women
const targetWomen = `<a href="/collections/the-collection" class="gender-banner-card">
        <img src="female final.png"`;

const newWomen = `<a href="/collections/the-collection?gender=women" class="gender-banner-card">
        <img src="female final.png"`;

if (content.includes(targetMen)) {
    content = content.replace(targetMen, newMen);
    console.log("Successfully replaced Men banner link on homepage.");
} else {
    console.error("Target Men banner link not found!");
}

if (content.includes(targetWomen)) {
    content = content.replace(targetWomen, newWomen);
    console.log("Successfully replaced Women banner link on homepage.");
} else {
    console.error("Target Women banner link not found!");
}

fs.writeFileSync(indexFile, content, 'utf8');
console.log("Homepage banner links updated successfully!");
