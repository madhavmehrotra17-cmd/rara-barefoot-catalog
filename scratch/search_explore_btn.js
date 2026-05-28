const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Strip style and script blocks
  const cleanHtml = content
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  if (cleanHtml.includes('EXPLORE MEN') || cleanHtml.includes('EXPLORE WOMEN') || cleanHtml.includes('gender-selection-btn')) {
    console.log('Markup match in:', file);
    const lines = cleanHtml.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('EXPLORE MEN') || line.includes('EXPLORE WOMEN') || line.includes('gender-selection-btn')) {
        console.log(`  Line ${idx + 1}: ${line.trim()}`);
      }
    });
  }
});
