
// Script adapted from NYheritage

(function special_search () {
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
document.addEventListener('cdm-collection-page:ready', special_search);
document.addEventListener('cdm-collection-landing-page:ready', special_search);
document.addEventListener('cdm-collection-page:update', special_search);
document.addEventListener('cdm-collection-landing-page:update', special_search);
document.addEventListener('cdm-custom-page:ready', special_search);
document.addEventListener('cdm-custom-page:update', special_search);
  
  })();


  function goToPage() {
    var page = document.getElementById('SearchTerm').value
    NodeTitle = "Manuscripts and Albums";
    NodeTitle = NodeTitle.replace(/&#039;/g, "'");
    window.location = "https://cdm17480.contentdm.oclc.org/digital/collection/americanart/search/searchterm/" + NodeTitle + "!" + SearchTerm.value;
  }
  
  function searchKeyPress(e) {
    e = e || window;
    if (e.keyCode == 13) {
      document.getElementById('btnSearch').click();
      return false;
    }
    return true;
  }
  
  function goToPage() {
    var page = document.getElementById('SearchTerm').value
    window.location = "https://nyheritage.contentdm.oclc.org/cdm/search/searchterm/" + SearchTerm.value + "/field/all/mode/all/conn/and/cosuppress/";
  }
  function goToAdv() {
    window.location = "https://nyheritage.contentdm.oclc.org/digital/search/advanced/";
  }
  function searchKeyPress(e) {
  e = e || window;
  if (e.keyCode == 13)
  {
    document.getElementById('btnSearch').click();
    return false;
  }
  return true;
  }
  onkeypress="return searchKeyPress(event);
  onclick="goToPage()