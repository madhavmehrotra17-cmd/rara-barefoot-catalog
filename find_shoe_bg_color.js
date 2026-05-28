const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

const dir = __dirname;

async function checkImage(fileName) {
  const filePath = path.join(dir, fileName);
  try {
    const image = await Jimp.read(filePath);
    const color = image.getPixelColor(10, 10);
    const r = (color >> 24) & 0xff;
    const g = (color >> 16) & 0xff;
    const b = (color >> 8) & 0xff;
    const toHexStr = (c) => c.toString(16).padStart(2, '0').toUpperCase();
    const hexColor = `#${toHexStr(r)}${toHexStr(g)}${toHexStr(b)}`;
    return hexColor;
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function main() {
  const targets = [
    'Uruk blue-1.JPG',
    'Uruk blue-2.JPG',
    'Uruk blue-3.JPG',
    'Uruk blue-4.JPG'
  ];
  
  console.log('Checking background colors of Uruk Blue slides:');
  for (const target of targets) {
    if (fs.existsSync(path.join(dir, target))) {
      const color = await checkImage(target);
      console.log(`  ${target}: ${color}`);
    } else {
      console.log(`  ${target} does not exist.`);
    }
  }
}

main();
