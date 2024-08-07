(function () {
    'use strict';
const SELECTOR_CONTENT_SIDE_COLUMN = '[data-id=itemViewPageFound] .row.foo .ItemView-sideColumn';
const SELECTOR_CONTENT_MAIN_COLUMN = '[data-id=itemViewPageFound] .row.foo .ItemView-mainColumn';

function moveDescriptionToSideColumn(e) {
    const panelContainer = document.querySelector('.ItemView-panelContainer');
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
