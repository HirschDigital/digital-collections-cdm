'use strict';

// path corresponding to directory where required files are uploaded
const PATH_JS_FILE_DIRECTORY = '/customizations/global/pages/js/';

// helper function to assemble full URL of each JS file
function jsFilePath(file) {
    return PATH_JS_FILE_DIRECTORY + file;
}

// helper function to load js file and insert into DOM
// @param {string} src link to a js file
// @returns Promise
function loadScript(src) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        /*    script.crossOrigin = 'anonymous'; */
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadScriptBasic(src) {
    const anotherScript = document.createElement('script');
    anotherScript.src = src;
    anotherScript.async = true;
    document.head.appendChild(anotherScript);
}

// array containing file names of each JS file
const regularScriptFilesToLoad = [
    'advancedSearchInputPlaceholder.js',
    'advancedSearchPageRelocateCollectionsTitle.js',
    'canonical-redirect-1_3.js',
    'collectionLandingPageRelocateBrowse.js',
    'headerLogoExternalTarget.js',
    'helpPageAndFaqs.js',
    'itemPageAddThisShareBox.js',
    'itemPageContactForm.js',
    'itemPageItemDescription.js',
    'itemPageRecordActions.js',
    'itemPageLayoutConfiguration.js',
    'itemPageSetPrintTooltip.js',
    'tabsDisplayedTitle.js',
];

// To Do: Make IE behavior comparable to 
// Chrome where it is functional at the moment.
const scriptFilesToLoad = [
    'homePageBannerKuraLogo.js',
    'homePageBannerCustomCurve.js',
    'itemPageOrderButton.js',
    'homePageCollectionCoverImages.js',
    'homePageCollectionCoverTitles.js',
];


(function () {
    // Compatible to most browsers
    let regularScripts = regularScriptFilesToLoad.map(jsFilePath);
    regularScripts.forEach(loadScriptBasic);

    // Not IE friendly scripts
    let allScripts = scriptFilesToLoad.map(jsFilePath);
    allScripts.forEach(loadScript);

    /**
     * Trying to find a way to reload without updating URL.
     * To Do:  For some reason, it seems like the scripts
     * were not being fully loaded after deploying release 1.5.
     * This problem was evident in release 1.0 as well and
     * was addressed by OCLC fixing some of their servers which
     * were not serving well.  The vendor was not able to
     * identify the cause of this issue.
     * Work around:  Get the users to refresh their screens, if
     * for some reason the site is not loading properly.
     * For the time being
     * we are going to monitor.
     */
    // if (window.localStorage) {
    //     if (!localStorage.getItem('firstLoad')) {
    //         localStorage['firstLoad'] = true;
    //         window.location.reload();
    //     } else
    //         localStorage.removeItem('firstLoad');
    // }
})();

/**
 * For existing bookmarks, and where the page no longer exists 
 * e.g. order-media (older filename for ordering) or has been renamed,
 * avoid displaying page not found.  Instead load homepage.
 * To Do:  This needs to be tested.
 */
// document.addEventListener('cdm-notfound-page:ready', function (e) {
//     location.replace("/digital/?p=404");
// });

/* version history

2.0 - 2020 Feb 26 - forked from contentdm recipe `loader_1.1.js` for Kura Phase 2 then updated `scriptFilesToLoad` section only
                  - requires js files to be loaded into website config's `working files` customization folder

*/