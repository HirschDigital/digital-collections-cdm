(function() {
  'use strict';

function accordionCollapse() {
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  })
}};

document.addEventListener('cdm-collection-page:ready', accordionCollapse);
document.addEventListener('cdm-collection-landing-page:ready', accordionCollapse);
document.addEventListener('cdm-collection-page:update', accordionCollapse);
document.addEventListener('cdm-collection-landing-page:update', accordionCollapse);
document.addEventListener('cdm-custom-page:ready', accordionCollapse);
document.addEventListener('cdm-custom-page:update', accordionCollapse);
})();
