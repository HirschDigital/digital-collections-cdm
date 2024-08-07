// JavaScript Document(function () {
    'use strict';
    function reconfigureLayoutSequentially() {
        moveDescriptionToSideColumn();
        movePrimaryActionsToTitleRow();
        moveShareBoxToMainColumn();
        addUserFeedbackFormToMainColumn();

        let mql = window.matchMedia('(min-width: 768px)');
        mql.addEventListener("change", function (e) {
            moveDescriptionToSideColumn(e);
            movePrimaryActionsToTitleRow(e);
        });
    }

    function reconfigureLayoutOnNextPrevLinks() {
        resetShareBoxFromMainColumn();
        resetUserFeedbackFromMainColumn();
        moveDescriptionToSideColumn();
        movePrimaryActionsToTitleRow();
    }

    document.addEventListener('cdm-item-page:ready', reconfigureLayoutSequentially);

    document.addEventListener('cdm-item-page:update', reconfigureLayoutOnNextPrevLinks);

})();



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

const SELECTOR_SIDE_COLUMN_GENERIC = '.ItemView-sideColumn';
const SELECTOR_SIDE_COLUMN_CONTENT = '.row.foo ' + SELECTOR_SIDE_COLUMN_GENERIC;
const SELECTOR_SIDE_COLUMN_TITLE = '.row.bar ' + SELECTOR_SIDE_COLUMN_GENERIC;
const ITEM_VIEW_PAGER = 'ItemView-itemViewPager';


function movePrimaryActionsToTitleRow(e) {
    const printOptionsContainer = document.querySelector(SELECTOR_SIDE_COLUMN_GENERIC + ' .ItemOptions-itemOptions');
    const searchContainer = document.querySelector(SELECTOR_SIDE_COLUMN_GENERIC + ' .ItemView-itemSearchContainer.ItemSearch-itemSearchPrint');
    /* Kura 2 - wider screens*/
    if ((e && e.matches) || window.matchMedia('(min-width: 768px)').matches) {
        const titleParentContainer = document.querySelector(SELECTOR_SIDE_COLUMN_TITLE);
        if (titleParentContainer) {
            doubleCheckingOnItemViewPager(titleParentContainer);
            titleParentContainer.appendChild(printOptionsContainer);
            titleParentContainer.appendChild(searchContainer);
            return true;
        }
    }
    /* ContentDM default, Kura 2 smaller screens */
    const sideColumnContentRow = document.querySelector(SELECTOR_SIDE_COLUMN_CONTENT);
    if (sideColumnContentRow) {
        const compoundViewer = document.querySelector(SELECTOR_SIDE_COLUMN_CONTENT + ' .ItemView-compoundItemViewerContainer');
        sideColumnContentRow.insertBefore(searchContainer, compoundViewer);
    }
    const buttonContainer = document.querySelector(SELECTOR_SIDE_COLUMN_CONTENT + ' .ItemView-options.ItemOptions-itemPrintOptions');
    if (buttonContainer) {
        buttonContainer.appendChild(printOptionsContainer);
    }
}

function doubleCheckingOnItemViewPager(titleParentContainer) {
    const itemPager = document.querySelector(SELECTOR_SIDE_COLUMN_TITLE + ' .' + ITEM_VIEW_PAGER);
    if (!itemPager) {
        const dummyContainer = document.createElement('div');
        dummyContainer.setAttribute('class', ITEM_VIEW_PAGER);
        titleParentContainer.appendChild(dummyContainer);
    }
}
