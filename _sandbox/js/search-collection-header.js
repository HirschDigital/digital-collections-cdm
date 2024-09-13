
// Script adapted from TEVA

function newsearch() {
  var searchTerm = document.getElementById('srchTerm').value;
  window.open('https://teva.contentdm.oclc.org/digital/search/searchterm/' + encodeURIComponent(searchTerm), '_blank');
}

function setupEventListeners() {
  document.getElementById('search_collection').addEventListener('click', function () {
    newsearch();
  });

  document.getElementById('srchTerm').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      document.getElementById('search_collection').click();
    }
  });
}

document.addEventListener('DOMContentLoaded', setupEventListeners);

/* or */

document.addEventListener('DOMContentLoaded', function() {

  function newsearch() {
      var searchTerm = document.getElementById('srchTerm').value;
      window.open('https://teva.contentdm.oclc.org/digital/search/searchterm/' + encodeURIComponent(searchTerm), '_blank');
  }

  document.getElementById('search_collection').addEventListener('click', function() {
      newsearch();
  });

  document.getElementById('srchTerm').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          document.getElementById('search_collection').click();
      }
  });

});

/* or */


function newsearch() {
  var searchTerm = document.getElementById('srchTerm').value;
  window.open('https://teva.contentdm.oclc.org/digital/search/searchterm/' + encodeURIComponent(searchTerm), '_blank');
}

function handleEvents(event) {
  if (event.type === 'click' || (event.type === 'keypress' && event.key === 'Enter')) {
      newsearch();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const searchCollectionButton = document.getElementById('search_collection');
  const searchTermInput = document.getElementById('srchTerm');

  searchCollectionButton.addEventListener('click', handleEvents);
  searchTermInput.addEventListener('keypress', handleEvents);
});


/*nyheritage*/

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
  