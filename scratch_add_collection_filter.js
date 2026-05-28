const fs = require('fs');
const path = require('path');

const collectionFile = path.join(__dirname, 'collection.html');
if (!fs.existsSync(collectionFile)) {
    console.error('collection.html not found!');
    process.exit(1);
}

let content = fs.readFileSync(collectionFile, 'utf8');

// 1. Add filter bar below the "THE COLLECTION" title
const targetHeading = '<div class="prose text-center"><h1 class="h1" >THE COLLECTION</h1><div ><p><meta charset="utf-8">City commutes. Forest hikes. Park runs. School runs. Whatever the challenge, our barefoot shoes let your feet move with strength, stability and freedom</p></div></div>';
const newHeading = `<div class="prose text-center">
  <h1 class="h1" >THE COLLECTION</h1>
  <div ><p><meta charset="utf-8">City commutes. Forest hikes. Park runs. School runs. Whatever the challenge, our barefoot shoes let your feet move with strength, stability and freedom</p></div>
  
  <!-- Premium Dynamic Filter Tabs Bar -->
  <div class="filter-bar-container">
    <button class="filter-tab-button active" data-filter="all">All Collection</button>
    <button class="filter-tab-button" data-filter="training">Training / Gym / Exercise</button>
    <button class="filter-tab-button" data-filter="running">Walk / Jog / Play</button>
    <button class="filter-tab-button" data-filter="everyday">All Day / Everyday</button>
  </div>
</div>`;

if (content.includes(targetHeading)) {
    content = content.replace(targetHeading, newHeading);
    console.log('Heading filter bar successfully injected into collection.html.');
} else {
    console.error('Target heading section not found in collection.html!');
    process.exit(1);
}

// 2. Inject JS script before </body>
const scriptToInject = `
<script>
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".filter-tab-button");
  const cards = document.querySelectorAll("product-card");

  function applyFilter(filterValue, updateUrl = true) {
    buttons.forEach(btn => {
      if (btn.getAttribute("data-filter") === filterValue) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    cards.forEach(card => {
      const tagsEl = card.querySelector(".prooduct-tags");
      const tagsText = tagsEl ? tagsEl.textContent.toLowerCase() : "";
      
      let isVisible = false;
      if (filterValue === "all") {
        isVisible = true;
      } else if (filterValue === "training") {
        isVisible = tagsText.includes("training") || tagsText.includes("gym");
      } else if (filterValue === "running") {
        isVisible = tagsText.includes("walk") || tagsText.includes("jog") || tagsText.includes("run") || tagsText.includes("active");
      } else if (filterValue === "everyday") {
        isVisible = tagsText.includes("everyday") || tagsText.includes("casual") || tagsText.includes("lifestyle") || tagsText.includes("office");
      }

      if (isVisible) {
        card.style.display = "";
        // Tiny timeout to trigger transition
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        card.style.display = "none";
      }
    });

    if (updateUrl) {
      const newUrl = window.location.pathname + (filterValue === "all" ? "" : "?filter=" + filterValue);
      window.history.pushState({ filter: filterValue }, "", newUrl);
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", function() {
      const filter = this.getAttribute("data-filter");
      applyFilter(filter);
    });
  });

  // Check URL params on load
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get("filter");
  if (filterParam && ["training", "running", "everyday"].includes(filterParam)) {
    applyFilter(filterParam, false);
  } else {
    applyFilter("all", false);
  }

  // Handle history back/forward
  window.addEventListener("popstate", function(event) {
    const stateFilter = (event.state && event.state.filter) ? event.state.filter : "all";
    applyFilter(stateFilter, false);
  });
});
</script>
</body>`;

if (content.includes('</body>')) {
    content = content.replace('</body>', scriptToInject);
    console.log('Dynamic filtering script injected before </body>.');
} else {
    console.error('</body> tag not found in collection.html!');
    process.exit(1);
}

fs.writeFileSync(collectionFile, content, 'utf8');
console.log('collection.html updated successfully with dynamic filtering!');
