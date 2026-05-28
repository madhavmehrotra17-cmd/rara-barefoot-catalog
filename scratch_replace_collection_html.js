const fs = require('fs');
const path = require('path');

const collectionFile = path.join(__dirname, 'collection.html');
if (!fs.existsSync(collectionFile)) {
    console.error('collection.html not found!');
    process.exit(1);
}

let content = fs.readFileSync(collectionFile, 'utf8');

// 1. Replace the heading / filter-bar block we added in the previous version
// Let's search for '<div class="prose text-center">\n  <h1 class="h1" >THE COLLECTION</h1>' or similar.
// To be perfectly robust, let's search from '<div class="prose text-center">' to '<!-- Premium Dynamic Filter Tabs Bar -->'
// Let's see: we can match exactly the new heading injected by scratch_add_collection_filter.js!
const oldHeadingSection = `<div class="prose text-center">
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

const newHeadingSection = `<div class="prose text-center">
  <h1 class="h1" >THE COLLECTION</h1>
  <div ><p><meta charset="utf-8">City commutes. Forest hikes. Park runs. School runs. Whatever the challenge, our barefoot shoes let your feet move with strength, stability and freedom</p></div>
  
  <!-- Premium Dynamic Split Gender Selection Screen -->
  <div class="gender-selection-container" id="gender-selection-screen">
    <div class="gender-selection-card" data-select-gender="men">
      <img src="male final.png" alt="Men's Collection" class="gender-selection-img">
      <div class="gender-selection-overlay"></div>
      <div class="gender-selection-content">
        <h2 class="gender-selection-title">MEN</h2>
        <button class="gender-selection-btn">EXPLORE MEN</button>
      </div>
    </div>
    <div class="gender-selection-card" data-select-gender="women">
      <img src="female final.png" alt="Women's Collection" class="gender-selection-img">
      <div class="gender-selection-overlay"></div>
      <div class="gender-selection-content">
        <h2 class="gender-selection-title">WOMEN</h2>
        <button class="gender-selection-btn">EXPLORE WOMEN</button>
      </div>
    </div>
  </div>

  <!-- Premium Gender Switcher Tabs -->
  <div class="gender-toggle-bar is-hidden" id="gender-toggle-bar">
    <button class="gender-toggle-tab" data-gender="men" id="tab-men">Men's Collection</button>
    <button class="gender-toggle-tab" data-gender="women" id="tab-women">Women's Collection</button>
  </div>
  
  <!-- Premium Dynamic Filter Tabs Bar -->
  <div class="filter-bar-container" style="display: none;">
    <button class="filter-tab-button active" data-filter="all">All Collection</button>
    <button class="filter-tab-button" data-filter="training">Training / Gym / Exercise</button>
    <button class="filter-tab-button" data-filter="running">Walk / Jog / Play</button>
    <button class="filter-tab-button" data-filter="everyday">All Day / Everyday</button>
  </div>
</div>`;

if (content.includes(oldHeadingSection)) {
    content = content.replace(oldHeadingSection, newHeadingSection);
    console.log("Successfully replaced heading block with premium split selector.");
} else {
    // Try simplified replacement
    console.error("Exact old heading section match not found. Attempting fuzzy match...");
    const fuzzySearch = '<div class="prose text-center">\n  <h1 class="h1" >THE COLLECTION</h1>';
    const fuzzyIdx = content.indexOf(fuzzySearch);
    if (fuzzyIdx !== -1) {
        const fuzzyEnd = content.indexOf('</div>', content.indexOf('filter-bar-container', fuzzyIdx));
        if (fuzzyEnd !== -1) {
            content = content.substring(0, fuzzyIdx) + newHeadingSection + content.substring(fuzzyEnd + 6);
            console.log("Fuzzy heading section replacement successful.");
        } else {
            console.error("Could not find end of fuzzy heading block.");
            process.exit(1);
        }
    } else {
        console.error("Could not locate heading block at all!");
        process.exit(1);
    }
}

// 2. Replace the old dynamic filtering script block before </body>
const oldScriptStart = '<script>\ndocument.addEventListener("DOMContentLoaded", function() {\n  const buttons = document.querySelectorAll(".filter-tab-button");\n  const cards = document.querySelectorAll("product-card");';
const oldScriptEnd = '  routeFromUrl(false);\n});\n</script>\n</body>'; // Wait, let's look at the script currently in collection.html.
// To be perfectly robust, let's just find '<script>' to '</body>' near the end of the file.
// Or we can find the exact match of our old script.
const oldScriptTarget = `<script>
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

const newScriptBlock = `<script>
document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll("product-card");
  const filterButtons = document.querySelectorAll(".filter-tab-button");
  const genderTabs = document.querySelectorAll(".gender-toggle-tab");
  
  const genderSelectionScreen = document.getElementById("gender-selection-screen");
  const genderToggleBar = document.getElementById("gender-toggle-bar");
  const filterBarContainer = document.querySelector(".filter-bar-container");
  const productList = document.querySelector("product-list");
  const facetsDrawer = document.querySelector("facets-drawer");

  // Tag cards by gender for easy filtering
  cards.forEach(card => {
    const handle = card.getAttribute("handle") || "";
    card.dataset.gender = handle.endsWith("-women") || handle.includes("-women") ? "women" : "men";
  });

  function updateDisplayState(selectedGender, activeCategory, updateUrl = true) {
    // 1. Manage visible blocks based on whether a gender is selected
    if (!selectedGender) {
      // Show gender selector screen
      genderSelectionScreen.style.display = "flex";
      setTimeout(() => genderSelectionScreen.classList.remove("is-hidden"), 10);
      
      // Hide other elements
      genderToggleBar.classList.add("is-hidden");
      genderToggleBar.style.display = "none";
      filterBarContainer.style.display = "none";
      if (productList) productList.style.display = "none";
      if (facetsDrawer) facetsDrawer.style.display = "none";
      
      cards.forEach(card => {
        card.style.display = "none";
        card.style.opacity = "0";
      });
      
      if (updateUrl) {
        window.history.pushState({ gender: null, filter: null }, "", window.location.pathname);
      }
      return;
    }

    // Gender IS selected: hide selector screen
    genderSelectionScreen.classList.add("is-hidden");
    genderSelectionScreen.style.display = "none";
    
    // Show switching and filtering controls
    genderToggleBar.classList.remove("is-hidden");
    genderToggleBar.style.display = "flex";
    filterBarContainer.style.display = "flex";
    if (productList) productList.style.display = "";
    if (facetsDrawer) facetsDrawer.style.display = "";

    // 2. Set active classes on tabs and buttons
    genderTabs.forEach(tab => {
      if (tab.getAttribute("data-gender") === selectedGender) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    filterButtons.forEach(btn => {
      if (btn.getAttribute("data-filter") === activeCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // 3. Filter cards by gender and then by category
    cards.forEach(card => {
      const cardGender = card.dataset.gender;
      const tagsEl = card.querySelector(".prooduct-tags");
      const tagsText = tagsEl ? tagsEl.textContent.toLowerCase() : "";
      
      let matchesGender = (cardGender === selectedGender);
      let matchesCategory = false;
      
      if (activeCategory === "all") {
        matchesCategory = true;
      } else if (activeCategory === "training") {
        matchesCategory = tagsText.includes("training") || tagsText.includes("gym");
      } else if (activeCategory === "running") {
        matchesCategory = tagsText.includes("walk") || tagsText.includes("jog") || tagsText.includes("run") || tagsText.includes("active");
      } else if (activeCategory === "everyday") {
        matchesCategory = tagsText.includes("everyday") || tagsText.includes("casual") || tagsText.includes("lifestyle") || tagsText.includes("office");
      }

      if (matchesGender && matchesCategory) {
        card.style.display = "";
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

    // 4. Update the URL state
    if (updateUrl) {
      let queryParts = [];
      if (selectedGender) queryParts.push("gender=" + selectedGender);
      if (activeCategory && activeCategory !== "all") queryParts.push("filter=" + activeCategory);
      
      const newQuery = queryParts.length > 0 ? "?" + queryParts.join("&") : "";
      window.history.pushState({ gender: selectedGender, filter: activeCategory }, "", window.location.pathname + newQuery);
    }
  }

  // Event Listeners for Split Selection Cards
  document.querySelectorAll(".gender-selection-card").forEach(card => {
    card.addEventListener("click", function() {
      const gender = this.getAttribute("data-select-gender");
      updateDisplayState(gender, "all", true);
    });
  });

  // Event Listeners for Gender Toggle Tabs
  genderTabs.forEach(tab => {
    tab.addEventListener("click", function() {
      const gender = this.getAttribute("data-gender");
      // Get current active filter
      const activeFilterBtn = document.querySelector(".filter-tab-button.active");
      const filter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
      updateDisplayState(gender, filter, true);
    });
  });

  // Event Listeners for Category Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const filter = this.getAttribute("data-filter");
      const activeGenderTab = document.querySelector(".gender-toggle-tab.active");
      const gender = activeGenderTab ? activeGenderTab.getAttribute("data-gender") : null;
      updateDisplayState(gender, filter, true);
    });
  });

  // Initial routing function based on URL parameters
  function routeFromUrl(updateUrl = false) {
    const urlParams = new URLSearchParams(window.location.search);
    const genderParam = urlParams.get("gender");
    const filterParam = urlParams.get("filter") || "all";
    
    const validGender = ["men", "women"].includes(genderParam) ? genderParam : null;
    const validFilter = ["training", "running", "everyday", "all"].includes(filterParam) ? filterParam : "all";
    
    updateDisplayState(validGender, validFilter, updateUrl);
  }

  // Handle history back/forward (popstate)
  window.addEventListener("popstate", function(event) {
    if (event.state) {
      const stateGender = event.state.gender || null;
      const stateFilter = event.state.filter || "all";
      updateDisplayState(stateGender, stateFilter, false);
    } else {
      routeFromUrl(false);
    }
  });

  // Initial load execution
  routeFromUrl(false);
});
</script>
</body>`;

if (content.includes(oldScriptTarget)) {
    content = content.replace(oldScriptTarget, newScriptBlock);
    console.log("Successfully replaced dynamic filter script at the bottom.");
} else {
    console.error("Exact old script target not found. Performing fuzzy replacement...");
    const scriptIdx = content.lastIndexOf('<script>');
    if (scriptIdx !== -1) {
        content = content.substring(0, scriptIdx) + newScriptBlock;
        console.log("Fuzzy script replacement successful.");
    } else {
        console.error("Could not locate script tag at the bottom of the file!");
        process.exit(1);
    }
}

fs.writeFileSync(collectionFile, content, 'utf8');
console.log("collection.html updated with split visual selector and gender switcher tabs!");
