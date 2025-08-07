(function () {
    'use strict';

    function contentblur(){


        
// ✅ List of OCLC numbers that should trigger blurring
const targetOclcNumbers = [
  "1427518089", "1234567890" // Add more OCLC numbers here
];

// 🧠 Function to extract OCLC and blur thumbnails
function blurThumbnailsIfOclcMatches() {
  const oclcRow = document.querySelector('tr.field-dmoclcno');
  if (!oclcRow) return;

  const oclcSpan = oclcRow.querySelector('td.field-value span');
  if (!oclcSpan) return;

  const oclc = oclcSpan.textContent.trim();

  if (targetOclcNumbers.includes(oclc)) {
    document.querySelectorAll('img.CompoundItemView-thumbnail').forEach(img => {
      if (!img.dataset.blurApplied) {
        img.style.filter = "blur(5px)";
        img.style.transition = "filter 0.3s ease";
        img.dataset.blurApplied = "true";
      }
    });
  }
}

// 👁️ Use MutationObserver to support dynamic content loading
const observer = new MutationObserver(blurThumbnailsIfOclcMatches);
observer.observe(document.body, { childList: true, subtree: true });

// 🔁 Run once on initial load
blurThumbnailsIfOclcMatches();
};



    document.addEventListener('cdm-item-page:ready', contentblur);
    document.addEventListener('cdm-item-page:update', contentblur);
})();
  