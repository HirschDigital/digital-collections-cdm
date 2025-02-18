(function() {
    'use strict';

    /**
     * Modify placeholder text in header search box to indicate whether a search will be:
     * across L&A; within a single collection; or within multiple selected collections.
     */

     function addPlaceholderGeneral() {
        const thisSearchText = 'Search Digital Collections';
        const headerSearchInput = document.querySelector('#search-input');
        headerSearchInput.placeholder = thisSearchText;
        headerSearchInput.title = thisSearchText;
    }
    
    function addPlaceholderSingle() {
        const thisSearchText = 'Search within this collection';
        const headerSearchInput = document.querySelector('#search-input');
        headerSearchInput.placeholder = thisSearchText;
        headerSearchInput.title = thisSearchText;
    }
    
    function addPlaceholderMultiple() {
        // use multiple collections placeholder only if 'Select All Collections' is not checked
        let thisSearchText;
        var checkboxAll = document.querySelector('.SearchCollectionFilter-allCollectionsCheckbox input');
        if(checkboxAll.checked){
           thisSearchText = 'Search entire collection';
        }
        else {
            thisSearchText = 'Search within selected collections';
        }
        const headerSearchInput = document.querySelector('#search-input');
        headerSearchInput.placeholder = thisSearchText;
        headerSearchInput.title = thisSearchText;
    }

    // add the relevant placeholder function to the appropriate cdm event listeners
    document.addEventListener('cdm-home-page:ready', addPlaceholderGeneral);
    document.addEventListener('cdm-about-page:ready', addPlaceholderGeneral);
    document.addEventListener('cdm-advanced-search-page:ready', addPlaceholderGeneral);
    document.addEventListener('cdm-collection-landing-page:ready', addPlaceholderSingle);
    document.addEventListener('cdm-collection-page:ready', addPlaceholderSingle);
    document.addEventListener('cdm-item-page:ready', addPlaceholderSingle);
    document.addEventListener('cdm-search-page:ready', addPlaceholderMultiple);
    document.addEventListener('cdm-saved-items-page:ready', addPlaceholderGeneral);
    document.addEventListener('cdm-custom-page:ready', addPlaceholderGeneral);
    document.addEventListener('cdm-collection-search-page:ready', addPlaceholderSingle);
    document.addEventListener('cdm-search-page:update', addPlaceholderMultiple);

})();

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