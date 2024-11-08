export { browseSearchPage };

function browseSearchPage() {
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
    function sortRecentlyAddedFacet() {
        // find all instances of the facet (on mobile a second instance is created in the Refine modal)
        var facetLinksContainer = document.querySelectorAll('div[label="close Recently Added Facet details"] .ShowMoreLess-container div');
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
    
    // 3. Rename the Coverage facet title & sort label to Decade in cross-collection search/browse
    function renameCoverageFacet() {
         // find all instances of the facet (on mobile a second instance is created in the Refine modal)
        var coverageFacet = document.querySelectorAll('h2[title="Close Coverage Facet"] span.Panel-panelTitleExpanded');
        if (coverageFacet) {
            coverageFacet.forEach(el => {
                el.innerText = 'Decade';
            });
        }
    }

    function renameCoverageSortLabel() {
        // find the sort labels in both the desktop sort dropdown and the mobile sort modal
        var coverageLabel = document.querySelectorAll('#desktopSortBySelect option, .MobileSortModal-container .radio');
        if (coverageLabel) {
            coverageLabel.forEach(el => {
                el.innerHTML = el.innerHTML.replace("Coverage","Decade");
            });
        }
    }

    // add a click listener on the Refine button so the new facet instances in the modal also get modified
    function mobileRefineListener() {
        var refineButton = document.querySelector('.MobileSearchHeader-buttonGroup button[data-id="filterBtn"]');
        if (refineButton) {

            refineButton.addEventListener('click', function() {
                // the new facet instances are not immediately available so get our functions in the queue
                setTimeout(sortRecentlyAddedFacet,0);
                setTimeout(renameCoverageFacet,0);
            });
        }
    }

    // add a click listener on the Sort button so the new label instances in the modal also get modified
    function mobileSortListener() {
        var sortButton = document.querySelector('.MobileSearchHeader-buttonGroup button:nth-child(2)');
        if (sortButton) {
            sortButton.addEventListener('click', function() {
                // the new sort instances are not immediately available so get our function in the queue
                setTimeout(renameCoverageSortLabel,0);
            });
        }
    }

    // handle cases where the sort order/pagination is changed but no cdm events fire
    function searchFilterListener() {
        let targetNode = document.querySelector('.cdm-collection-search-page .Search-filterContent, .cdm-search-page .Search-filterContent');
        if (targetNode) {
            const observer = new MutationObserver(records => {
                for (const record of records) {
                    // check if any nodes have been added to the targetNode
                    let totalAddedNodes = 0;
                    if (record.type === "childList") {
                      totalAddedNodes = totalAddedNodes + record.addedNodes.length;
                      if (totalAddedNodes > 0) {
                        comboModifications();
                        setTimeout(searchFilterListener,0);
                        observer.disconnect();
                      }
                    }
                }
            });
            observer.observe(targetNode, { childList: true });
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

};