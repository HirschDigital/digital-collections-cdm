(function () {
    'use strict';

     /**
     * Modifications to the browse / search pages:
     * 1. Expand the Collections facet if any collection below the fold is selected [desktop view]
     * 2. Sort the Recently Added facet in reverse chronological order [desktop and mobile view]
     * 3. Rename the cross-collection Coverage facet title & sort label to Decade [desktop and mobile view]
     */
     
     // 1. Expand the Collections facet if any collection below the fold is selected (unless 'Select All Collections' is selected)
    function expandCollectionsFacet() {   
        var CollectionCheckboxContainer = document.querySelector('div[label="close Collections Filter details"]');
        if (CollectionCheckboxContainer) {
            // see how many checked boxes are visible above the fold
            var checkChecked = document.querySelectorAll('div[label="close Collections Filter details"] input:checked').length;
            // count the number of arguments separated by exclamation points in the collections segment of the URL
            var thisURL = location.href;
            var thisURLSegment = thisURL.match(/collection\/[^\/]+/g);
            if (thisURLSegment) {
                var theseExclamations = thisURLSegment[0].split('!').length;
            }
            else theseExclamations = 1;
            // expand the facet if the comparison indicates that there are any selections below the fold
            if (checkChecked < theseExclamations) {
                document.querySelector('div[label="close Collections Filter details"] button.btn-see-more-less').click();
                // prevent focus being applied to the first input in Collections facet
                var blurMe = document.activeElement;
                if (blurMe) {
                    blurMe.blur();
                }
            }
        }
    }    
    
    // 2. Sort the Recently Added facet by date descending, instead of the default sort by number of records
    // NOTE: currently does not sort facet values added by the 'Show More' button, as we always have <10
    function sortDateFacet() {
        // find all instances of the facet (on mobile a second instance is created in the Refine modal)
        var facetLinksContainer = document.querySelectorAll('div[label="close Date Facet details"] .ShowMoreLess-container div');
        if (facetLinksContainer) {
            facetLinksContainer.forEach(el => {
                var facetLinks = Array.from(el.childNodes);
                var reSort = facetLinks.sort((a, b) => ('' + b.innerText).localeCompare(a.innerText));
                el.innerHTML = '';
                reSort.forEach(ele => {
                    el.appendChild(ele);
                });
            });
        }   
    }
    
  
    
    // combine modification functions and add to appropriate cdm events
    function comboModifications() {
        expandCollectionsFacet();
        sortRecentlyAddedFacet();
        renameCoverageFacet();
        renameCoverageSortLabel();
        mobileRefineListener();
        mobileSortListener();
    }

    document.addEventListener('cdm-collection-search-page:ready', comboModifications);
    document.addEventListener('cdm-search-page:ready', comboModifications);
    document.addEventListener('cdm-collection-search-page:update', comboModifications);
    document.addEventListener('cdm-search-page:update', comboModifications);
    document.addEventListener('cdm-collection-search-page:update', searchFilterListener);
    document.addEventListener('cdm-search-page:update', searchFilterListener);

})();