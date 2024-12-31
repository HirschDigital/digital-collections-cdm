(function () {
    'use strict';

    function reconfigureLayoutSequentially() {
        moveDescriptionToSideColumn();


        let mql = window.matchMedia('(min-width: 768px)');
        mql.addEventListener("change", function (e) {
            moveDescriptionToSideColumn(e);
        });
    }

    function reconfigureLayoutOnNextPrevLinks() {
        moveDescriptionToSideColumn();

    }

const SELECTOR_CONTENT_SIDE_COLUMN = '[data-id=itemViewPageFound] .row.foo .ItemView-sideColumn';
const SELECTOR_CONTENT_MAIN_COLUMN = '[data-id=itemViewPageFound] .row.foo .ItemView-mainColumn';

function moveDescriptionToSideColumn(e) {
    const panelContainer = document.querySelector('.ItemMetadata-metadatarow .field-relate');
    if (panelContainer) {
        const sideColContainer = document.querySelector(SELECTOR_CONTENT_SIDE_COLUMN);
        /* Kura 2 - wider screens*/
        if (sideColContainer && ((e && e.matches) || window.matchMedia('(min-width: 768px)').matches)) {
            sideColContainer.appendChild(panelContainer);
            return true;
        }
        /* ContentDM default, Kura 2 smaller screens */
        const mainColContainer = document.querySelector(SELECTOR_CONTENT_MAIN_COLUMN);
        const compoundViewContainer = document.querySelector(SELECTOR_CONTENT_MAIN_COLUMN + ' .ItemView-compoundItemViewerContainer');
        if (mainColContainer && compoundViewContainer) {
            mainColContainer.insertBefore(panelContainer, compoundViewContainer);
        }
    }
}


document.addEventListener('cdm-item-page:ready', reconfigureLayoutSequentially);

document.addEventListener('cdm-item-page:update', reconfigureLayoutOnNextPrevLinks);
})();
// Check if the current URL contains a specific subdirectory
/**if (window.location.pathname.includes('digital/collection/p17480coll1/') ) {
    //Run the function only on pages within the subdirectories '/blog/' or '/shop/'
   const mediaQuery = window.matchMedia('(min-width: 768px)');
   mediaQuery.addEventListener('change', moveDescriptionToSideColumn);
   moveDescriptionToSideColumn(mediaQuery); // Initial call for page load
}**/

// || window.location.pathname.includes('/shop/') to add other subdirectories