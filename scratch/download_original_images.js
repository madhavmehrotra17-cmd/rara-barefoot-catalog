const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
    {
        url: 'https://www.rarabarefoot.in/cdn/shop/files/below_catalogue_1.1_292ce086-a26d-4dff-a2e7-bb0379436e9d.jpg?v=1765166736&width=800',
        name: 'original_white_1.jpg'
    },
    {
        url: 'https://www.rarabarefoot.in/cdn/shop/files/below_catalogue_1.2_a511d0dc-a744-48b3-aaf8-6665d9ee2c9d.jpg?v=1765166736&width=800',
        name: 'original_white_2.jpg'
    },
    {
        url: 'https://www.rarabarefoot.in/cdn/shop/files/below_catalogue_1.3_97dc1c97-af8e-42c0-9eb1-42235fa019f1.jpg?v=1765166736&width=800',
        name: 'original_white_3.jpg'
    }
];

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: Status code ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', err => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function run() {
    console.log('Downloading original white shoe images...');
    for (const item of urls) {
        const dest = path.join('C:\\Users\\Madhav Mehrotra\\.gemini\\antigravity\\scratch\\rara-true-clone', item.name);
        try {
            await download(item.url, dest);
            console.log(`Successfully downloaded: ${item.name}`);
        } catch (e) {
            console.error(`Error downloading ${item.name}:`, e.message);
        }
    }
    console.log('Downloads finished.');
}

run();
