// activate extra search bar on custom pages
//Cartagena
document.addEventListener('cdm-custom-page:ready', function() {
    function newsearch() {
        var NodeTitle = 'Alejandro Cartagena Photobook Maquettes';
        var searchTerm = document.getElementById('srchTerm').value;
        window.open('/digital/collection/photobooks/search/searchterm/' + NodeTitle + "!" + searchTerm + "/field/relatig!all/mode/exact!all/conn/and!and/order/nosort/ad/asc");

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

  //maquettes
  document.addEventListener('cdm-custom-page:ready', function() {
    function newsearch() {
        var NodeTitle = 'maquettes';
        var searchTerm = document.getElementById('srchTerm1').value;
        window.open('/digital/collection/photobooks/search/searchterm/' + NodeTitle + "!" + searchTerm + "/field/format!all/mode/exact!all/conn/and!all");

    }
    document.getElementById('search_collection1').addEventListener('click', function() {
        newsearch();
    });
    document.getElementById('srchTerm1').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('search_collection1').click();
        }
    });
  });