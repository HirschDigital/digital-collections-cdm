export { special_search };

function special_search () {
'use strict';

  function newsearch() {
    window.location.href = "https://cdm17480.contentdm.oclc.org/cdm/search/searchterm/"+('#srchTerm').val();
    window.open('https://cdm17480.contentdm.oclc.org/digital/collection/americanart/search/searchterm/' + ('#srchTerm').val(), '_blank');
  }
  ("#search_collection").click(function () {
    newsearch();
  });
  
  
  ('#srchTerm').keypress(function (event) {
    if (event.keyCode == 13) {
      ('#search_collection').click();
    }
  });
document.addEventListener('cdm-collection-page:ready', newsearch);
document.addEventListener('cdm-collection-landing-page:ready', newsearch);
document.addEventListener('cdm-collection-page:update', newsearch);
document.addEventListener('cdm-collection-landing-page:update', newsearch);
document.addEventListener('cdm-custom-page:ready', newsearch);
document.addEventListener('cdm-custom-page:update', newsearch);
  
  };