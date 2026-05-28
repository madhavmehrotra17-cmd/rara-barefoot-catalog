const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'catalog.html'), 'utf8');

// Find all css rules in <style> block
const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
console.log("--- Specific Header Styles in catalog.html ---");
while ((match = regex.exec(content)) !== null) {
    const css = match[1];
    
    // We parse the CSS to extract only the rules we want
    // A simple regex to find CSS rules for header selectors
    const ruleRegex = /(?:[^{}]+)\{(?:[^{}]+)\}/g;
    let ruleMatch;
    while ((ruleMatch = ruleRegex.exec(css)) !== null) {
        const rule = ruleMatch[0];
        if (rule.includes('header') || rule.includes('logo') || rule.includes('nav') || rule.includes('action')) {
            // Filter to make sure it's about our header elements
            if (rule.trim().startsWith('header') || 
                rule.includes('.header-') || 
                rule.includes('logo') || 
                rule.includes('nav-') || 
                rule.includes('action-')) {
                console.log(rule.trim());
                console.log('--------------------------------------------------');
            }
        }
    }
}
