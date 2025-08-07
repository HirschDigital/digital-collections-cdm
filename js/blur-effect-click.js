(function () {
    'use strict';

    function clickToUnblur(){

const targetOclcNumbers = ["1427518089", "1234567890"]; // Add more as needed

function getOclcNumber() {
  const row = document.querySelector("tr.field-dmoclcno");
  const span = row?.querySelector("td.field-value span");
  return span?.textContent.trim();
}

// Function to blur images and add message
function blurFullPageImagesByOclc() {
  const oclc = getOclcNumber();
  if (!oclc || !targetOclcNumbers.includes(oclc)) return;

  document.querySelectorAll("div.ItemPDF-itemImage").forEach(container => {
    const img = container.querySelector("img");
    if (!img || img.dataset.blurApplied) return;

    // Apply blur styling
    img.style.filter = "blur(8px)";
    img.style.transition = "filter 0.3s ease";
    img.style.cursor = "pointer";
    img.dataset.blurApplied = "true";
    img.dataset.blurred = "true";

    // Create overlay message
    const overlay = document.createElement("div");
    overlay.textContent = "Click to unblur";
    overlay.className = "blur-overlay";
    overlay.style.position = "absolute";
    overlay.style.top = "50%";
    overlay.style.left = "50%";
    overlay.style.transform = "translate(-50%, -50%)";
    overlay.style.background = "rgba(0, 0, 0, 0.6)";
    overlay.style.color = "white";
    overlay.style.padding = "8px 12px";
    overlay.style.borderRadius = "6px";
    overlay.style.fontSize = "14px";
    overlay.style.pointerEvents = "none";
    overlay.style.transition = "opacity 0.3s ease";
    overlay.style.zIndex = "10";

    // Ensure container is positioned
    container.style.position = "relative";

    container.appendChild(overlay);

    // Toggle blur and overlay on click
    img.addEventListener("click", () => {
      const isBlurred = img.dataset.blurred === "true";

      img.style.filter = isBlurred ? "none" : "blur(8px)";
      img.dataset.blurred = isBlurred ? "false" : "true";
      overlay.style.opacity = isBlurred ? "0" : "1";
    });
  });
}

// 👁️ MutationObserver to catch dynamic image loads
const observer = new MutationObserver(blurFullPageImagesByOclc);
observer.observe(document.body, { childList: true, subtree: true });

// 🔁 Initial run
blurFullPageImagesByOclc();
    };



    document.addEventListener('cdm-item-page:ready', clickToUnblur);
    document.addEventListener('cdm-item-page:update', clickToUnblur);
})();