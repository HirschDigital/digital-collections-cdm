/*  =====================
   =====================

disable right click in viewer
22-Feb 2023

=====================
===================== */

(function() {
'use strict';

document.addEventListener('cdm-item-page:ready', function(e){


  document.getElementsByClassName("ItemPreview-container")[0] .setAttribute("oncontextmenu", "return false");

});

})();