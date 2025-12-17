(function () {
    'use strict';

     /**
     * Modifications to the browse / search pages:
     * 1. Expand the Collections facet if any collection below the fold is selected [desktop view]
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
    

    document.addEventListener('cdm-collection-search-page:ready', expandCollectionsFacet);
    document.addEventListener('cdm-search-page:ready', expandCollectionsFacet);
    document.addEventListener('cdm-collection-search-page:update', expandCollectionsFacet);
    document.addEventListener('cdm-search-page:update', expandCollectionsFacet);

})();