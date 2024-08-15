const SELECTOR_CONTENT_SIDE_COLUMN = '[data-id=itemViewPageFound] .row.foo .ItemView-sideColumn';
const SELECTOR_CONTENT_MAIN_COLUMN = '[data-id=itemViewPageFound] .row.foo .ItemView-mainColumn';

/**
 * ContentDM out of the box had item description on the left side, just 
 * below the item being viewed.  Kura 2 required provision for users on 
 * larger screens with horizontal file-to-description reference.  For 
 * smaller screens, description retains its place.
 */
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

/**
 * Unit Testing of Kura 2 was designed to be run locally and not within ContentDM.
 * Disable this section before uploading to ContentDM's Website Configuration Tool.
 */

// module.exports.moveDescriptionToSideColumn = moveDescriptionToSideColumn;// JavaScript Document