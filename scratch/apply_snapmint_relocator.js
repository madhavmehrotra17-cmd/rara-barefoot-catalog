const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Injecting dynamic Snapmint relocator script into product.html...');

const target = '})();\r\n\r\n</script>';
const replacement = `})();

// 3. Dynamic Snapmint EMI card relocation directly below Buy Now button
(function() {
  function relocate() {
    const buyButtons = document.querySelectorAll('.product-info [data-block-type="buy-buttons"]');
    buyButtons.forEach(btn => {
      // Find the Snapmint widget in the same product-info container
      const productInfo = btn.closest('.product-info');
      if (!productInfo) return;
      const widget = productInfo.querySelector('#sm-widget-btn');
      if (widget) {
        // Only move it if it's not already sitting directly below the buy buttons
        if (btn.nextElementSibling !== widget) {
          btn.after(widget);
        }
      }
    });
  }

  // Watch for changes to catch dynamic injection by Snapmint's JS script
  const observer = new MutationObserver(relocate);
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial and backup periodic checks to ensure robustness
  relocate();
  setInterval(relocate, 200);
})();

</script>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('[SUCCESS] Successfully injected dynamic Snapmint relocator script into product.html!');
} else {
  // Let's try with standard unix line endings just in case
  const unixTarget = '})();\n\n</script>';
  if (content.includes(unixTarget)) {
    content = content.replace(unixTarget, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('[SUCCESS] Successfully injected dynamic Snapmint relocator script into product.html (Unix endings)!');
  } else {
    console.error('[ERROR] Could not find the end of rara-ultimate-script in product.html!');
    process.exit(1);
  }
}
