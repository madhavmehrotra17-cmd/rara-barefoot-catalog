const fs = require('fs');
const path = require('path');

const filePath = 'index.html';
const backupPath = 'index.html.bak';

// 1. Back up the original file
fs.copyFileSync(filePath, backupPath);
console.log(`[BACKUP] Saved backup of index.html to ${backupPath}`);

let html = fs.readFileSync(filePath, 'utf8');

// 2. Modify Section 1: template--19195983200430__video_CEhjzi
// Replace the anchor tag inside the video__button div
const section1Before = `<div class="video__button" >
                    <a href="/collections/the-collection?filter=training" 
                       class="button button--primary"
                       style="background-color: #00000000; color: #ffffff; border-color:#ffffff; --hover-gradient: none; --initial-gradient: none;">SHOP THE COLLECTION</a>
                  </div>`;

const section1After = `<div class="video__button" >
                    <a href="/collections/the-collection?filter=training" 
                       class="button button--primary">Explore the collection</a>
                  </div>`;

if (html.includes(section1Before)) {
  html = html.replace(section1Before, section1After);
  console.log('[SUCCESS] Replaced Section 1 Video CTA');
} else {
  console.log('[WARNING] Section 1 precise pattern not found, trying fallback matching');
  // Fallback regex match for Section 1 button
  const section1Regex = /<a href="\/collections\/the-collection\?filter=training"[^>]*class="button button--primary"[^>]*style="[^"]*"[^>]*>SHOP THE COLLECTION<\/a>/i;
  if (section1Regex.test(html)) {
    html = html.replace(section1Regex, `<a href="/collections/the-collection?filter=training" class="button button--primary">Explore the collection</a>`);
    console.log('[SUCCESS] Replaced Section 1 Video CTA using fallback regex');
  } else {
    console.log('[ERROR] Could not find Section 1 Video CTA button pattern!');
  }
}

// 3. Modify Section 2: template--19195983200430__video_dC8hR9
const section2Before = `<div class="video__button" >
                    <a href="/collections/the-collection?filter=running" 
                       class="button button--primary"
                       style="background-color: #00000000; color: #ffffff; border-color:#ffffff; --hover-gradient: none; --initial-gradient: none;">SHOP THE COLLECTION</a>
                  </div>`;

const section2After = `<div class="video__button" >
                    <a href="/collections/the-collection?filter=running" 
                       class="button button--primary">Explore the collection</a>
                  </div>`;

if (html.includes(section2Before)) {
  html = html.replace(section2Before, section2After);
  console.log('[SUCCESS] Replaced Section 2 Video CTA');
} else {
  console.log('[WARNING] Section 2 precise pattern not found, trying fallback matching');
  const section2Regex = /<a href="\/collections\/the-collection\?filter=running"[^>]*class="button button--primary"[^>]*style="[^"]*"[^>]*>SHOP THE COLLECTION<\/a>/i;
  if (section2Regex.test(html)) {
    html = html.replace(section2Regex, `<a href="/collections/the-collection?filter=running" class="button button--primary">Explore the collection</a>`);
    console.log('[SUCCESS] Replaced Section 2 Video CTA using fallback regex');
  } else {
    console.log('[ERROR] Could not find Section 2 Video CTA button pattern!');
  }
}

// 4. Modify Section 3: template--19195983200430__video_QQD7EM
// HTML block:
const section3Before = `<div class="video__button" >
                    <a href="/collections/the-collection?filter=everyday" 
                       class="button button--primary"
                       style="background-color: #00000000; color: #ffffff; border-color:#ffffff; --hover-gradient: none; --initial-gradient: none;">SHOP THE COLLECTION</a>
                  </div>`;

const section3After = `<div class="video__button" >
                    <a href="/collections/the-collection?filter=everyday" 
                       class="button button--primary">Explore the collection</a>
                  </div>`;

if (html.includes(section3Before)) {
  html = html.replace(section3Before, section3After);
  console.log('[SUCCESS] Replaced Section 3 Video CTA HTML');
} else {
  console.log('[WARNING] Section 3 HTML precise pattern not found, trying fallback matching');
  const section3Regex = /<a href="\/collections\/the-collection\?filter=everyday"[^>]*class="button button--primary"[^>]*style="[^"]*"[^>]*>SHOP THE COLLECTION<\/a>/i;
  if (section3Regex.test(html)) {
    html = html.replace(section3Regex, `<a href="/collections/the-collection?filter=everyday" class="button button--primary">Explore the collection</a>`);
    console.log('[SUCCESS] Replaced Section 3 Video CTA HTML using fallback regex');
  } else {
    console.log('[ERROR] Could not find Section 3 Video CTA button pattern!');
  }
}

// Style block for Section 3: Remove black text / border-color override
const styleOverrideBefore = `#shopify-section-template--19195983200430__video_QQD7EM a.button.button--primary {max-width: none; min-width: 220px; color: black !important; border-color: black !important;}`;
const styleOverrideAfter = `#shopify-section-template--19195983200430__video_QQD7EM a.button.button--primary {max-width: none; min-width: 220px;}`;

if (html.includes(styleOverrideBefore)) {
  html = html.replace(styleOverrideBefore, styleOverrideAfter);
  console.log('[SUCCESS] Removed black button border/color overrides from Section 3 style tag');
} else {
  console.log('[WARNING] Section 3 style override exact text not found. Trying regex matching...');
  const styleRegex = /#shopify-section-template--19195983200430__video_QQD7EM\s+a\.button\.button--primary\s*\{([^}]+)\}/gi;
  if (styleRegex.test(html)) {
    html = html.replace(styleRegex, (match, p1) => {
      let cleaned = p1.replace(/color:\s*black\s*!important;?/gi, '')
                      .replace(/border-color:\s*black\s*!important;?/gi, '')
                      .trim();
      return `#shopify-section-template--19195983200430__video_QQD7EM a.button.button--primary { ${cleaned} }`;
    });
    console.log('[SUCCESS] Cleaned Section 3 button overrides using regex');
  } else {
    console.log('[ERROR] Could not find Section 3 style block overrides!');
  }
}

// Write the updated HTML back to index.html
fs.writeFileSync(filePath, html, 'utf8');
console.log('[SUCCESS] index.html successfully updated and saved!');
