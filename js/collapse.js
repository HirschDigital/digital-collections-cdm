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




function(t) {
  "A" === t.currentTarget.tagName && t.preventDefault();
  var n = st(this),
    e = Fn.getSelectorFromElement(this),
    i = [].slice.call(document.querySelectorAll(e));
  st(i).each(function() {
    var t = st(this),
      e = t.data(lt) ? "toggle" : n.data();
    Tt._jQueryInterface.call(t, e)
  })
}