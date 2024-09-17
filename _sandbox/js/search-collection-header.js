
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

document.addEventListener('cdm-custom-page:ready', function () {

  function newsearch() {
    var searchTerm = document.getElementById('srchTerm').value;
    window.open('https://cdm17480.contentdm.oclc.org/digital/collection/photobooks/search/searchterm/' + encodeURIComponent(searchTerm), '_blank');
  }

  document.getElementById('search_collection').addEventListener('click', function () {
    newsearch();
  });

  document.getElementById('srchTerm').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      document.getElementById('search_collection').click();
    }
  });

});




/*nyheritage*/

document.addEventListener('cdm-custom-page:ready', function() {

  function newsearch() {
      var NodeTitle = "Alejandro Cartagena Photobook Maquettes";
      var searchTerm = document.getElementById('srchTerm').value;
      window.location = "https://cdm17480.contentdm.oclc.org/digital/collection/photobooks/search/searchterm/" + NodeTitle + "!" + searchTerm;
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