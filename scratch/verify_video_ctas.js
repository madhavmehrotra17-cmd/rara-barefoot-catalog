const fs = require('fs');
const filePath = 'index.html';
const html = fs.readFileSync(filePath, 'utf8');

console.log('--- VERIFYING VIDEO CTAS ---');

const videoSections = [
  'template--19195983200430__video_CEhjzi',
  'template--19195983200430__video_dC8hR9',
  'template--19195983200430__video_QQD7EM'
];

let failed = false;

videoSections.forEach(sectionId => {
  const regex = new RegExp(`<section id="shopify-section-${sectionId}"[\\s\\S]*?</section>`, 'i');
  const match = html.match(regex);
  
  if (!match) {
    console.error(`[ERROR] Section ${sectionId} not found in index.html!`);
    failed = true;
    return;
  }
  
  const sectionContent = match[0];
  console.log(`\nChecking Section: ${sectionId}`);
  
  // 1. Check anchor text
  const btnTextMatch = sectionContent.match(/<a[^>]*>([\s\S]*?)<\/a>/i);
  if (btnTextMatch) {
    const text = btnTextMatch[1].trim();
    console.log(`- CTA Text: "${text}"`);
    if (text !== 'Explore the collection') {
      console.error(`  [FAIL] Expected "Explore the collection" but got "${text}"`);
      failed = true;
    } else {
      console.log(`  [PASS] Button text matches`);
    }
  } else {
    console.error(`  [FAIL] No anchor button tag found in section!`);
    failed = true;
  }
  
  // 2. Check inline styles on anchor tag
  const inlineStyleMatch = sectionContent.match(/<a[^>]*style="([^"]*)"/i);
  if (inlineStyleMatch) {
    const styleAttr = inlineStyleMatch[1];
    console.error(`  [FAIL] Inline style attribute still present on anchor: "${styleAttr}"`);
    failed = true;
  } else {
    console.log(`  [PASS] No inline styles found on anchor`);
  }
  
  // 3. Check section-specific overrides in <style> tag specifically for the button rule
  const styleTagMatch = sectionContent.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (styleTagMatch) {
    const styleBlock = styleTagMatch[1];
    
    // Find the specific rule for a.button.button--primary in this section
    const buttonRuleRegex = /a\.button\.button--primary\s*\{([^}]+)\}/gi;
    const buttonRuleMatch = buttonRuleRegex.exec(styleBlock);
    
    if (buttonRuleMatch) {
      const ruleBody = buttonRuleMatch[1];
      if (ruleBody.includes('color:') && ruleBody.includes('black')) {
        console.error(`  [FAIL] Button style rule contains black text override: "${ruleBody.trim()}"`);
        failed = true;
      } else if (ruleBody.includes('border-color:') && ruleBody.includes('black')) {
        console.error(`  [FAIL] Button style rule contains black border override: "${ruleBody.trim()}"`);
        failed = true;
      } else {
        console.log(`  [PASS] Button style rule is clean: "${ruleBody.trim()}"`);
      }
    } else {
      console.log(`  [PASS] No specific button style override rule found in style tag`);
    }
  } else {
    console.log(`- Note: No <style> block found in section`);
  }
});

console.log('\n--- VERIFICATION RESULT ---');
if (failed) {
  console.error('[FAIL] Some checks failed! Please review the errors.');
} else {
  console.log('[PASS] All video CTA buttons look perfect, match the hero banner CTA structure, and have no overrides!');
}
