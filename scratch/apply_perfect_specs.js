const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product.html');
let content = fs.readFileSync(filePath, 'utf8');

// Define the 100% complete, un-truncated product-extra-information HTML markup
const perfectAccordionsBlock = `<!-- Relocated Accordions Block inside product-info -->
<div id="product-extra-information" class="product-content-below-gallery empty:hidden scroll-margin-offset"><product-recommendations class="block" hidden product="8720428531886" limit="2" intent="complementary"></product-recommendations><accordion-disclosure
  class="accordion accordion--lg "
  
>
  <details
    class="accordion__disclosure group"
    
      aria-expanded="false"
    
  >
    <summary><span class="accordion__toggle h6"><span>Core Properties</span><span class="animated-plus group-expanded:rotate" aria-hidden="true"></span></span>
    </summary>

    <div class="accordion__content prose"><p><strong>OPTIMAL USE-CASE</strong><br/>Perfect stylish partner to all types of activities including walks, light runs and outings!<br/><br/><strong>UPPER MATERIAL<br/></strong>Soft fllyknit no-sew upper (100% recycled)</p><p>Super soft  flyknit surface, elastic stretch, lightweight build, steady ground traction.</p><p><br/><strong>HOW DOES THE SHOE FEEL </strong><br/>The flyknit based upper is breathable with an elastic feel that makes the shoe feel one with the feet. Its no-sew (with a single seam) built ensures the shoe has high endurance and is perfect for light runs and play. </p><p>The toe-counter and heel-grip provides additional reinforcement around the toes and heel. This further improves the viability of the shoe for wearing in all types of movement. </p><p><br/><strong>NATURAL FOOT SHAPE</strong><br/>Wide toe box ensures the feet have room to flex and be in their natural state. </p><p><br/><strong>GROUNDED OUTSOLE</strong><br/>Stand firm on multiple terrains with our zero drop (heel to toe) outsoles.</p></div>
  </details>
</accordion-disclosure>
<accordion-disclosure
  class="accordion accordion--lg "
  
>
  <details
    class="accordion__disclosure group"
    
      aria-expanded="false"
    
  >
    <summary><span class="accordion__toggle h6"><span>Product Specs</span><span class="animated-plus group-expanded:rotate" aria-hidden="true"></span></span>
    </summary>

    <div class="accordion__content prose"><div class="product-meta-details">
 
  <ul>
    <li>Brand Name: <br><b>RARA Barefoot</b></li>
    <li>Product Name: <br><b>URUK BLUE</b></li>
    <li>Gender: <br><b>Men</b></li>
    <li>Quantity: <br><b>1 pair</b></li>
    <li>Product Dimensions: <br><b>32.5 * 17.5 * 12 cm (L * B * H)</b></li>
    <li>Net Weight: <br><b>600 gms</b></li>

    <li>Heel to Toe Drop: <br><b>0%</b></li>
    <li>Outsole Stack Height: <br><b>5 mm</b></li>
    <li>Insole: <br><b>100% RPET, Turned insole backer (100% RPET)</b></li>
    <li>Outsole: <br><b>100% solid rubber</b></li>
    <li>Lining: <br><b>100% polyester</b></li>
    <li>Laces: <br><b>100% polyester</b></li>
    
  </ul>
<p>Upper: <br><b>Soft flyknit no-sew upper (100% recycled)</b></p>
</div>

<Style>
.product-meta-details ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0 0 10px;
    padding: 0;
    justify-content: space-between;
}
.product-meta-details li {
    width: 45%;
    border-bottom: 1px solid #eaeaec;
    margin: 0 0 12px;
    padding-bottom: 10px;
}
</style></div>
  </details>
</accordion-disclosure>
<accordion-disclosure
  class="accordion accordion--lg "
  
>
  <details
    class="accordion__disclosure group"
    
      aria-expanded="false"
    
  >
    <summary><span class="accordion__toggle h6"><span>Care</span><span class="animated-plus group-expanded:rotate" aria-hidden="true"></span></span>
    </summary>

    <div class="accordion__content prose"><ol><li>Brush off mud and clean with a damp cloth</li><li>Hand wash only, Line dry only</li></ol></div>
  </details>
</accordion-disclosure>
<accordion-disclosure
  class="accordion accordion--lg "
  
>
  <details
    class="accordion__disclosure group"
    
      aria-expanded="false"
    
  >
    <summary><span class="accordion__toggle h6"><span>Other Information</span><span class="animated-plus group-expanded:rotate" aria-hidden="true"></span></span>
    </summary>

    <div class="accordion__content prose"><p><strong>COUNTRY OF ORIGIN</strong></p><p>India</p></br><p><strong>DESIGNED & MARKETED BY</strong></p><p>AP2GP Private Limited</p><p>D3-404, Parshavnath Exotica, Golf Course Road, Sec 53, Gurugram, Haryana - 122011</p></br><p><strong>MANUFACTURED & PACKED BY</strong></p><p>N.M. ZACKRIAH LLP</p><p>No - 74,75 & 78, Gudiyattam Road, Thutipet, Ambur-TK, Tamil Nadu - 635811</p></br><p><strong>CUSTOMER CARE DETAILS</strong></p><p></p><p>Email: <a href="mailto:care@rarabarefoot.in" title="mailto:care@rarabarefoot.in">care@rarabarefoot.in</a></p></br><p><strong>SHIPPING</strong></p><ol><li>PAN India deliveries </li><li>Delivery timeline: 1-5 days</li><li>No shipping charges on prepaid orders</li></ol></br><p><strong>RETURNS & EXCHANGES </strong></p><p>No questions asked return and exchange policy. Please refer to details<a href="/pages/refund-and-return-policy" title="Refund and Return Policy"> here </a></p><p>Whatsapp: 81300 96761</p></div>
  </details>
</accordion-disclosure>
<accordion-disclosure
  class="accordion accordion--lg "
  
>
  <details
    class="accordion__disclosure group"
    
      aria-expanded="false"
    
  >
    <summary><span class="accordion__toggle h6"><span>FAQS</span><span class="animated-plus group-expanded:rotate" aria-hidden="true"></span></span>
    </summary>

    <div class="accordion__content prose"><p><strong>What makes RARA different from regular sneakers?<br/></strong>RARA shoes are built on barefoot science with zero drop soles, a wide toe box, and flexible design that let your feet move naturally while improving strength, balance, and comfort.</p><p><strong><br/>Are barefoot shoes safe for beginners?<br/></strong>Yes. They may feel different at first because more muscles get activated, just like your first workout at the gym, but that’s how your feet get stronger.</p><p><strong><br/>Do barefoot shoes need special insoles or socks?<br/></strong>No. They’re designed to work best without added support so your feet can move and feel naturally. Thin socks are fine if you prefer them.</p><p><strong><br/>How do I keep these shoes clean?</strong><br/>Wipe with a damp cloth for daily care. For deeper cleaning, remove the insoles and hand wash with mild soap, then air dry.</p></br><p>For more information, pls read our <a href="https://www.rarabarefoot.in/pages/blogs" title="https://www.rarabarefoot.in/pages/blogs">Blog</a></p></div>
  </details>
</accordion-disclosure>
</div>`;

// Locate the broken/truncated `#product-extra-information` block inside the current product.html
const startMarker = '<!-- Relocated Accordions Block inside product-info -->';
const startIdx = content.indexOf(startMarker);

if (startIdx === -1) {
  console.error('[ERROR] Could not find `#product-extra-information` start marker in product.html!');
  process.exit(1);
}

// Find the first `</safe-sticky>` after startIdx
const stickyCloseIdx = content.indexOf('</safe-sticky>', startIdx);
if (stickyCloseIdx === -1) {
  console.error('[ERROR] Could not find closing sticky tag!');
  process.exit(1);
}

// Find the closing `</div>` tags right before `</safe-sticky>`
// We want to replace the accordions container itself, which starts with `<!-- Relocated Accordions Block...`
// and ends with `</div>` (which closes `#product-extra-information` container).
// Let's find the closing `</div>` of the accordions block.
// In the current file, it ends with:
// `</accordion-disclosure>\n</div>\n\n</div>\n</div>\n</div></safe-sticky>`
// So the first `</div>` after the FAQS `</accordion-disclosure>` is the one closing `#product-extra-information`.
// Let's find `FAQS` after `startIdx`
const faqIdx = content.indexOf('FAQS', startIdx);
if (faqIdx === -1) {
  console.error('[ERROR] Could not find FAQS block in product.html!');
  process.exit(1);
}
const faqClose = content.indexOf('</accordion-disclosure>', faqIdx);
if (faqClose === -1) {
  console.error('[ERROR] Could not find closing accordion tag for FAQS in product.html!');
  process.exit(1);
}

const blockCloseDivIdx = content.indexOf('</div>', faqClose);
if (blockCloseDivIdx === -1) {
  console.error('[ERROR] Could not find closing div tag in product.html!');
  process.exit(1);
}

const endIdx = blockCloseDivIdx + '</div>'.length;

console.log("Snippet to be replaced in product.html:");
console.log(content.substring(startIdx, endIdx));

// Replace it with the perfect, un-truncated block!
const newContent = content.substring(0, startIdx) + perfectAccordionsBlock + content.substring(endIdx);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('\n[SUCCESS] Successfully applied the 100% complete, un-truncated Product Specs and restored the two-column layout!');
