const { Jimp } = require('jimp');
const path = require('path');

const imagePath = path.join(__dirname, 'Uruk blue-3.JPG');

async function main() {
  try {
    const image = await Jimp.read(imagePath);
    console.log(`Image dimensions: ${image.width}x${image.height}`);
    
    // Check some coordinates in the background (far from the centered shoe)
    const coords = [
      { x: 10, y: 10 },
      { x: 50, y: 50 },
      { x: 100, y: 100 },
      { x: 200, y: 50 },
      { x: 50, y: 200 },
      { x: image.width - 50, y: 50 },
      { x: 50, y: image.height - 50 },
      { x: image.width - 50, y: image.height - 50 }
    ];
    
    console.log('Inspecting background pixels:');
    coords.forEach(pt => {
      const color = image.getPixelColor(pt.x, pt.y);
      const r = (color >> 24) & 0xff;
      const g = (color >> 16) & 0xff;
      const b = (color >> 8) & 0xff;
      const toHexStr = (c) => c.toString(16).padStart(2, '0').toUpperCase();
      const hexColor = `#${toHexStr(r)}${toHexStr(g)}${toHexStr(b)}`;
      console.log(`  Pixel at (${pt.x}, ${pt.y}): ${hexColor} (R:${r}, G:${g}, B:${b})`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
