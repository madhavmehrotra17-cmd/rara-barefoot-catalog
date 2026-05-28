const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'community.html');
const content = fs.readFileSync(filePath, 'utf8');

const query = 'BAREFOOT MOVEMENT';
const index = content.toUpperCase().indexOf(query);

if (index !== -1) {
    console.log('Found query! Printing 1500 characters around it:');
    console.log(content.substring(Math.max(0, index - 200), Math.min(content.length, index + 1300)));
} else {
    console.log('Query not found.');
}
