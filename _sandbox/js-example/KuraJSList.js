/*advancedSearchInputPlaceholder.js*/

(function() {
    'use strict';

    /**
     * ContentDM Search box, available from the header, came with an unset
     * placeholder attribute.  Kura 2 was required to put in a placeholder similar
     * to Auckland Libraries or Kura 1.  After review, the business decided to use
     * "Search Kura" as placeholder.
     */
    function addPlaceholderToAdvanceSearchInput() {
        const searchKuraText = 'Search Kura';      
        const advanceSearchInput = document.querySelector('#search-input');

        advanceSearchInput.placeholder = searchKuraText;
        advanceSearchInput.title = searchKuraText;
    }

    document.addEventListener('cdm-home-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-about-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-advanced-search-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-collection-landing-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-collection-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-item-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-search-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-saved-items-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-custom-page:ready', addPlaceholderToAdvanceSearchInput);
    document.addEventListener('cdm-collection-search-page:ready', addPlaceholderToAdvanceSearchInput);

})();

/*advancedSearchPageRelocateCollectionsTitle.js*/

(function () {
    'use strict';

    /**
     * ContentDM out of the box Advance Search Page came with the 
     * "Collections" frame title outside a border surrounding related section elements.  
     * Kura 2 was required to reflect "Collections" frame title within the 
     * border surrounding its elements.
     */
    function moveCollectionsTitleInBorder() {
        const collectionsTitle = document.querySelector('.AdvancedSearch-content h1:last-of-type');
        let collectionsCheckbox = document.querySelector('.SearchCollectionFilter-container');

        collectionsCheckbox.insertBefore(collectionsTitle, collectionsCheckbox.childNodes[0]);
    }

    document.addEventListener('cdm-advanced-search-page:ready', moveCollectionsTitleInBorder);

})();

/*canonical-redirect-1_3.js*/

(function() {
    'use strict';
    
      function urlRedirector() {
        const targetPath = window.location.pathname;
        const baseUrl = window.location.origin
          ? window.location.origin + '/'
          : window.location.protocol + '//' + window.location.host + '/';
        if (baseUrl == badUrl) {
          window.location = goodUrl + targetPath;
        }
      }
    
      const badUrl = 'https://cdm20062.contentdm.oclc.org/';
      const goodUrl = 'https://kura.aucklandlibraries.govt.nz';
    
      document.addEventListener('cdm-app:ready', function() {
        // executes the first time a user arrives at the site
        urlRedirector();
      });
    
      ['cdm-home-page:enter', 'cdm-home-page:update',
      'cdm-search-page:enter','cdm-search-page:update',
      'cdm-collection-page:enter','cdm-collection-page:update',
      'cdm-custom-page:enter','cdm-custom-page:update',
      'cdm-item-page:enter','cdm-item-page:update',
      'cdm-about-page:enter','cdm-about-page:update'
      ].forEach(function(e) {
          document.addEventListener(e,urlRedirector);
      });
    
    })();
    
    /* version history
    
    2.0 - 2020 April - forked from ContentDM domain redirect recipe.  Only URLs were updated.
    1.3 - 2020 March 1 - add listeners for many more page classes
    1.2 - 2020 February 14 - added full path preservation in redirect target
    1.1 - 2019 August 9 - variable-ized the redirect URLs
    1.0 - 2018 June - initial implementation
    
    */

/*collectionLandingPageRelocateBrowse.js*/

(function () {
	'use strict';

	/**
	 * ContentDM out of the box came with Browse buttons reflected just after 
	 * most of the content was rendered on the Collection Landing page.  Part of
	 * Kura 2 requirement was to move Browse button on identified taglines.
	 * 
	 * The business provided an *emphasized marker within the content:
	 * "[The following should appear below the Browse button]" to help indicate
	 * where, and if, they think it was necessary to move Browse button.
	 * 
	 * In Kura 2, regardless of the tag-line used, system checked for where
	 * *emphasis <em> tag was used and replaced it with required Browse button.
	 */
	function moveBrowseButtonToMarker() {
		const browseButton = document.querySelector('.CollectionLanding-maincontentLanding .text-center a');
		const positionRef = document.querySelector('em');

		if (positionRef) positionRef.parentNode.replaceChild(browseButton, positionRef);
	}

	document.addEventListener('cdm-collection-landing-page:ready', moveBrowseButtonToMarker);

})();

/*headerLogoExternalTarget.js*/

(function () {
  'use strict';

  /**
   * ContentDM out-of-the-box redirected users to Kura home page when logo was clicked.
   * Kura 2 wanted users to be navigated to main Auckland Libraries website when logo was clicked.
   */
  function changeLogoLink() {
    const headerLogo = document.querySelector('div.Header-logoHolder>div>a');
    const newUrl = 'https://www.aucklandlibraries.govt.nz/';
    if (headerLogo) {
      headerLogo.href = newUrl;
      headerLogo.addEventListener('click', function (e) {
        this.href = newUrl;
        e.stopPropagation();
      });
    }
  }

  document.addEventListener('cdm-about-page:ready', changeLogoLink);
  document.addEventListener('cdm-advanced-search-page:ready', changeLogoLink);
  document.addEventListener('cdm-collection-landing-page:ready', changeLogoLink);
  document.addEventListener('cdm-collection-page:ready', changeLogoLink);
  document.addEventListener('cdm-home-page:ready', changeLogoLink);
  document.addEventListener('cdm-item-page:ready', changeLogoLink);
  document.addEventListener('cdm-login-page:ready', changeLogoLink);
  document.addEventListener('cdm-search-page:ready', changeLogoLink);
  document.addEventListener('cdm-saved-items-page:ready', changeLogoLink);
  document.addEventListener('cdm-custom-page:ready', changeLogoLink);
  document.addEventListener('cdm-collection-search-page:ready', changeLogoLink);

})();

/*helpPageAndFaqs.js*/

(function () {
    'use strict';

    function supportAndFaqs() {
        var acc = document.getElementsByClassName("faq-sectionHeading");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("faq-active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }

    document.addEventListener('cdm-custom-page:ready', supportAndFaqs);
    document.addEventListener('cdm-custom-page:update', supportAndFaqs);

})();

/*itemPageAddThisShareBox.js*/

const ITEM_PAGE_CONTENT_MAIN_COLUMN = '[data-id=itemViewPageFound] .row.foo .ItemView-mainColumn';
const ITEM_PAGE_CONTENT_SIDE_COLUMN = '[data-id=itemViewPageFound] .row.foo .ItemView-sideColumn';
const COMPONENT_ADD_THIS_SHARE_BOX = 'ItemOptions-itemShareRow';


/**
 * ContentDM by default reflects the AddThis Sharebox on the right side of the item page.
 * Kura 2 provides an item feedback section where the AddThis section could benefit being placed near to.
 */
function moveShareBoxToMainColumn() {
    const mainColContainer = document.querySelector(ITEM_PAGE_CONTENT_MAIN_COLUMN);
    const addThisComponent = document.querySelector(ITEM_PAGE_CONTENT_SIDE_COLUMN + ' .' + COMPONENT_ADD_THIS_SHARE_BOX);
    if (mainColContainer && addThisComponent) {
        mainColContainer.appendChild(addThisComponent);
    }
}

/**
 * ContentDM does not need to be aware that add this was moved to the main column.
 */
function returnShareBoxToSideColumn() {
    const addThisComponent = document.querySelector(ITEM_PAGE_CONTENT_MAIN_COLUMN + ' .' + COMPONENT_ADD_THIS_SHARE_BOX);
    const addThisSideColumnContainer = document.querySelector(ITEM_PAGE_CONTENT_SIDE_COLUMN + ' .ItemView-options.ItemOptions-itemPrintOptions > div');
    if (addThisSideColumnContainer && addThisComponent) {
        addThisSideColumnContainer.appendChild(addThisComponent);
    }
}

/**
 * The add this share box component being placed on the side column as 
 * ContentDM default, had to be instructed by Kura 2 to always display just before 
 * Kura 2's custom feedback form.
 */
function resetShareBoxFromMainColumn() {
    returnShareBoxToSideColumn();
    moveShareBoxToMainColumn();
}


/**
 * Unit Testing of Kura 2 was designed to be run locally and not within ContentDM.
 * Disable this section before uploading to ContentDM's Website Configuration Tool.
 */

// module.exports.moveShareBoxToMainColumn = moveShareBoxToMainColumn;

/*itemPageContactForm.js*/

/**
 * "Comments" heading
 */
function addCommentsLabel(feedbackDiv) {
    const commentsLabel = document.createElement('h4');
    commentsLabel.setAttribute('class', 'ContactForm-commentsLabel');
    commentsLabel.textContent = "Comments";
    feedbackDiv.appendChild(commentsLabel);
}

/**
 * "Tell us about this record" sub heading
 */
function addCommentsSubLabel(feedbackDiv) {
    const commentsSubLabel = document.createElement('h5');
    commentsSubLabel.setAttribute('class', 'ContactForm-commentsSubLabel');
    commentsSubLabel.textContent = "Contact us about this record";
    feedbackDiv.appendChild(commentsSubLabel);
}

/**
 * Give users capability to reach out to libraries for metadata feedback / suggestion.
 * Disqus plugin was ruled-out:
 * (a) Libraries wanted one way intiated communication with no interest of active user engagement.  
 * (b) Libraries wanted to continue using their existing formstack account where order print was already built.  
 */
function pluginFormstackContactForm(feedbackDiv) {
    const itemTitle = document.querySelector('.ItemTitle-primaryTitle').textContent;
    feedbackDiv.innerHTML = feedbackDiv.innerHTML +
        '<iframe src="https://aucklandlibraries.formstack.com/forms/kuraitempagecomment?' +
        'item_uri=' + window.location.href + '&item_title=' + itemTitle + '"' +
        'title="Kura Item Comment"  class="ContactForm-commentsFrame" width="95%"  max-width="680px" height="445px" frameBorder="0">' +
        '</iframe>';
}

function createDivFeedback() {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.setAttribute('class', 'ContactForm');
    return feedbackDiv;
}

function createContactForm() {
    const feedbackDiv = createDivFeedback();
    addCommentsLabel(feedbackDiv);
    addCommentsSubLabel(feedbackDiv);
    pluginFormstackContactForm(feedbackDiv);
    return feedbackDiv;
}

/**
 * ContentDM does not have review item form by default.
 * Kura 2 integrates formstack as a back-end email service that
 * allowed citizens to contribute to the correctness of data.
 */
function addUserFeedbackFormToMainColumn() {
    let mainColContainer = document.querySelector('[data-id=itemViewPageFound] .row.foo .ItemView-mainColumn');
    let contactForm = createContactForm();
    mainColContainer.appendChild(contactForm);
}

/**
 * ContentDM does not need to be aware of the feedback email service.
 */
function removeUserFeedbackFormFromMainColumn() {
    let elements = document.querySelectorAll('.ItemView-mainColumn .ContactForm');
    for (let i = 0; i < elements.length; i++) {
        let el = elements[i];
        if (el && el.parentElement) {
            el.parentElement.removeChild(el);
        }
    }
    // Array.from(document.querySelectorAll('.ItemView-mainColumn .ContactForm'))
    //     .forEach(el => {
    //         if (el && el.parentElement) {
    //             el.parentElement.removeChild(el);
    //         }
    //     });
}

/**
 * The feedback form being a custom element, ContentDM had to 
 * be instructed that Kura 2 want the feedback form to always
 * appear as the last element on the left side of the item page.
 */
function resetUserFeedbackFromMainColumn() {
    removeUserFeedbackFormFromMainColumn();
    addUserFeedbackFormToMainColumn();
}

/**
 * Unit Testing of Kura 2 was designed to be run locally and not within ContentDM.
 * Disable this section before uploading to ContentDM's Website Configuration Tool.
 */

// module.exports.addUserFeedbackFormToMainColumn = addUserFeedbackFormToMainColumn;
// module.exports.removeUserFeedbackFormFromMainColumn = removeUserFeedbackFormFromMainColumn;

/*itemPageItemDescription.js*/

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

// module.exports.moveDescriptionToSideColumn = moveDescriptionToSideColumn;

/*itemPageRecordActions.js*/

const SELECTOR_SIDE_COLUMN_GENERIC = '.ItemView-sideColumn';
const SELECTOR_SIDE_COLUMN_CONTENT = '.row.foo ' + SELECTOR_SIDE_COLUMN_GENERIC;
const SELECTOR_SIDE_COLUMN_TITLE = '.row.bar ' + SELECTOR_SIDE_COLUMN_GENERIC;
const ITEM_VIEW_PAGER = 'ItemView-itemViewPager';

/**
 * ContentDM out of the box came with primary buttons and search on the right side, 
 * around the same line the item being viewed.  Kura 2 was required to push primary
 * buttons at same line as title to provide users with larger screens a same 
 * line horizontal file-to-transcript experience.  
 * For smaller screens, primary actions and search related record retain their place.
 */
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

/** 
 * ContentDM does not include browse results pager components i.e. Back to results and Result # of N when
 * user directly loaded a record from a shared link rather than going through the Browse/Adance Search page.  This 
 * unpredictability on record page display made Kura 2's inner search's circle-search icon trickier to manage.
 * Kura 2's inner search component depends on the itempager fixed height for proper layout.
 * */
function doubleCheckingOnItemViewPager(titleParentContainer) {
    const itemPager = document.querySelector(SELECTOR_SIDE_COLUMN_TITLE + ' .' + ITEM_VIEW_PAGER);
    if (!itemPager) {
        const dummyContainer = document.createElement('div');
        dummyContainer.setAttribute('class', ITEM_VIEW_PAGER);
        titleParentContainer.appendChild(dummyContainer);
    }
}

/*itemPageLayoutConfiguration.js*/
(function () {
    'use strict';

    /**
     * Kura 2 required item page to be reconfigured to 
     * implement almost similar layout to Kura 1.
     * 
     * Kura 1:
     * _________________________________________________
     * | Breadcrumbs    | <Result 1 of N >             |  <-- Row 1
     * | Title          | Back to results              |       
     * | Filename       | Save|Download|Print|Order    | 
     * |                | Search this record: _        |
     * |________________|______________________________|
     * _________________________________________________
     * | Main Item      |  Transcript                  |  <-- Row 2
     * |                |  Object Description          |
     * |  1 of X        |  Item Description            |
     * | 1 | 2 | 3      |                              |
     * |   < 1 >        |                              |
     * | (AddThis)      |                              |
     * | Feedback Form  |                              |
     * |________________|______________________________|
     * 
     */
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

    /**
     * ContentDM out of the box allowed browsing items from multiple collections sequentially
     * via the Browse page.  When user navigates between items from a different collection,
     * via next/prev, decription panel springs back to the main/left column.  To make sure,
     * we support Kura 2 for the requirement of allowing the users to see preview and 
     * description side-by-side we would be resetting them on the update listener.
     */
    function reconfigureLayoutOnNextPrevLinks() {
        resetShareBoxFromMainColumn();
        resetUserFeedbackFromMainColumn();
        moveDescriptionToSideColumn();
        movePrimaryActionsToTitleRow();
    }

    document.addEventListener('cdm-item-page:ready', reconfigureLayoutSequentially);

    document.addEventListener('cdm-item-page:update', reconfigureLayoutOnNextPrevLinks);

})();

/*itemPageSetPrintTooltip.js*/

(function() {
    'use strict';

    /**
     * Add a title attribute to the 'Print' icon
     */
    function addTooltipToPrintIcon() {
        const printTitleText = "Print";
        const printIconMobile = document.querySelector('div div.btn-group button[aria-label="Print"]');
        const printIconScreen = document.querySelector('.ItemView-sideColumn div div.btn-group button[aria-label="Print"]');

        printIconMobile.title = printTitleText;
        printIconScreen.title = printTitleText;
    }

    document.addEventListener('cdm-item-page:ready', addTooltipToPrintIcon);

})();

/*tabsDisplayedTitle.js*/
(function () {
    'use strict';

    /**
     * ContentDM Tab Title by design automatically appended Home page title setup from
     * website configuration tool.  Now when user was on kura home page, the title
     * setup doubles like this: "Kura - Kura".  Few weeks after going live, google search
     * started showing evidence of this doubling of home title. Business decided to
     * make it so that when users are on the home page home title doesn't double.
     */
    function resetDocumentTitle() {
        let titleArray = document.title.split("-")
        // ContentDM works well when current page displayed was not the home page.
        if (titleArray.length > 2)
            return;

        if (titleArray[0].trim() == titleArray[1].trim())
            document.title = "Kura Heritage Collections";
    }

    document.addEventListener('cdm-home-page:ready', resetDocumentTitle);
    document.addEventListener('cdm-about-page:ready', resetDocumentTitle);
    document.addEventListener('cdm-advanced-search-page:ready', resetDocumentTitle);
    document.addEventListener('cdm-collection-landing-page:ready', resetDocumentTitle);
    document.addEventListener('cdm-search-page:ready', resetDocumentTitle);
    document.addEventListener('cdm-saved-items-page:ready', resetDocumentTitle);
    document.addEventListener('cdm-custom-page:ready', resetDocumentTitle);

})();

/*homePageBannerKuraLogo.js*/
const SELECTOR_HOME_BANNER = '.ContentHeader-mainCopyHolder section.intro';
// file name and path of Kura logo
const kuraLogoFile = "/customizations/global/pages/images/hero/Kura-White.svg";

function createKuraHomeLogo() {
    let kuraWhiteLogo = document.createElement('img');
    if (kuraWhiteLogo) {
        kuraWhiteLogo.setAttribute('class', 'kura-logo');
        kuraWhiteLogo.src = kuraLogoFile;
    }
    return kuraWhiteLogo;
}

function createDivContainer() {
    let textContainer = document.createElement('div');
    textContainer.setAttribute('class', 'kura-text');
    return textContainer;
}

function updateGeneralAlertContainer() {
    let alertContainer = document.querySelector(SELECTOR_HOME_BANNER + ' .fade span');
    if (alertContainer) {
        alertContainer.removeAttribute('style');
        alertContainer.setAttribute('class', 'kura-banner-alert');
        alertContainer.setAttribute('font-size', '16px');
    }
    return alertContainer;
}

function insertKuraLogo(bannerContainer) {
    let textContainer = createDivContainer();
    let alertContainer = updateGeneralAlertContainer();
    let kuraHomeLogo = createKuraHomeLogo();

    textContainer.appendChild(kuraHomeLogo);
    textContainer.appendChild(document.createElement('br'));
    textContainer.appendChild(alertContainer);

    bannerContainer.appendChild(textContainer);
}

(function () {
    'use strict';

    /**
     * ContentDM out of the box came with an image only hero banner that
     * admins were able to control via Website Config Tool. Kura 2 required 
     * a custom hero banner with white KURA logo as in Kura 1.
     */
    function updateKuraBannerWithLogo() {
        const bannerContainer = document.querySelector(SELECTOR_HOME_BANNER);
        if (bannerContainer) insertKuraLogo(bannerContainer);
    }

    document.addEventListener('cdm-home-page:ready', updateKuraBannerWithLogo);

})();

/*homePageBannerCustomCurve.js*/

// file name and path of the custom curve
const bannerWhiteCurve = '/customizations/global/pages/images/hero/bottom-curve-white.svg';

function createBottomCurveElement() {
    let bottomCurve = document.createElement('img');
    bottomCurve.src = bannerWhiteCurve;
    bottomCurve.setAttribute('class', 'bottom-curve');
    return bottomCurve;
}

(function() {
  'use strict';

    /**
     * ContentDM out-of-the-box allowed some images to be added.  Kura 2 required a 
     * custom hero banner provided by Kura 1.  
     * TO DO:  Another way of achieving the custom banner with the required scoop or
     * curve is by using the website config tool.
     */
    function insertBottomCurveForBanner() {
        const bannerContainer = document.querySelector('.ContentHeader-mainCopyHolder section.intro');        
        if (bannerContainer) bannerContainer.append(createBottomCurveElement());        
    }

    document.addEventListener('cdm-home-page:ready', insertBottomCurveForBanner);

})();

/*itemPageOrderButton.js*/

'use strict';

(function () {

    // helper function to determine whether to give option to order copies by item
    // if contentType is metadata only (pre-defined as "application/meta" by contentDM) then 
    // order link is not needed
    function buildOrderCopiesLink(collection, item) {
        return fetch('/digital/api/collections/' + collection + '/items/' + item + '/false')
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                let itemTitle = document.querySelector('.ItemTitle-primaryTitle').textContent;
                if (json) {
                    return assembleOrderCopyLink(json, itemTitle);
                }
                return false;
            })
            .catch(function (error) {
                console.log('ContentType cannot be found.  Item cannot be ordered: ' + error);
            })
    }

    let orderDigitalButton = {
        insert: function (orderLink) {
            let button = document.createElement('div');
            button.className = 'btn-group btn-group-default order-copies-button';

            let buttonAnchor = document.createElement('a');
            buttonAnchor.title = "Order";
            buttonAnchor.href = orderLink;
            buttonAnchor.className = 'cdm-btn btn btn-primary';
            buttonAnchor.target = '_blank';

            let buttonIcon = document.createElement('span');
            buttonIcon.className = 'fa fa-shopping-cart fa-2x';

            buttonAnchor.appendChild(buttonIcon);
            button.appendChild(buttonAnchor);

            let elements = document.querySelectorAll('.ItemOptions-itemOptions>.btn-toolbar');
            for (let i = 0; i < elements.length; i++) {
                let el = elements[i];
                el.appendChild(button.cloneNode(true));
            }
        },
        remove: function () {
            let elements = document.querySelectorAll('.order-copies-button');
            for (let i = 0; i < elements.length; i++) {
                let el = elements[i];
                if (el && el.parentElement) {
                    el.parentElement.removeChild(el);
                }
            }
        }
    }

    //helper function to sequence fetch promises
    function insertOrderCopiesButton(collection, item) {
        buildOrderCopiesLink(collection, item)
            .then(function (response) {
                if (response) {
                    orderDigitalButton.insert(response);
                }
            });
    }

    let globalScope = true; // set to true for global scripts or false for collection-constrained scripts
    let collectionScope = [ // list all collection aliases that should trigger this script
    ];

    document.addEventListener('cdm-item-page:ready', function (e) {
        let collection = e.detail.collectionId;
        if (globalScope || collectionScope.includes(collection)) {
            insertOrderCopiesButton(collection, e.detail.itemId);
        }
    });

    document.addEventListener('cdm-item-page:update', function (e) {
        let collection = e.detail.collectionId;
        if (globalScope || collectionScope.includes(collection)) {
            orderDigitalButton.remove();
            insertOrderCopiesButton(collection, e.detail.itemId);
        }
    });

})();


(function () {
    'use strict';

    function addParamsToOrderForm() {
        if (!window.location.search) {
            return;
        }
        let urlParamStr = window.location.search.substring(1); //get rid of "?" in querystring
        let params = getParamStrToUseAsDefaultInForm(urlParamStr);
        if (params) {
            let orderUrl = document.querySelector('#kuraOrderCopies');
            orderUrl.src = orderUrl.src + params;
        }
    }

    document.addEventListener('cdm-custom-page:ready', addParamsToOrderForm);

})();

/**
 * When there is an item description and there are files associated to 
 * user selected item, there give user option to order.
 * Add title and item id as parameters to the formstack order link.
 * 
 * @param {object} responseObj ContentDM response object
 * @param {string} title The title associated to the item in view
 */
function assembleOrderCopyLink(responseObj, title) {
    if (responseObj.contentType && responseObj.contentType !== "application/meta") {
        let orderLink = '/digital/custom/ordering?item_title=' + title;
        return updateOrderLinkWithParamItemNo(responseObj.fields, orderLink);
    }
    return false;
}

/**
 * ContentDM has pre-defined item identifier named as "identi", if 
 * this exists Kura 2 sends that to formstack as item_id_no which then
 * formstack uses to suggest as default item id to be used in the 
 * form to assist users when expressing their intent to place an order.
 * 
 * @param {array} jsonFields Contents from Item Description section
 * @param {string} orderLink Related custom order page URL with title parameter
 */
function updateOrderLinkWithParamItemNo(jsonFields, orderLink) {
    if (jsonFields) {
        let file_identifier = jsonFields.find(fieldItem => {
            if (fieldItem.key === 'identi') {
                return fieldItem.value;
            }
        });
        if (!file_identifier) {
            file_identifier = jsonFields.find(fieldItem => {
                if (fieldItem.key === 'title') {
                    return fieldItem.value;
                }
            });
        }
        if (file_identifier) {
            return orderLink + '&item_id=' + file_identifier.value;
        }
    }
    return orderLink;
}

/**
 * Helper function to extract required field value from parameter string. 
 * 
 * @param {string} paramName  Valid paramName could be "item_title" or "item_id"
 * @param {string} urlParamStr  URL parameter string without the leading question mark (?)
 * @returns {string}
 */
function getParamValue(paramName, urlParamStr) {
    if (urlParamStr) {
        let qArray = urlParamStr.split('&'); //get key-value pairs
        for (let i = 0; i < qArray.length; i++) {
            let pArr = qArray[i].split('='); //split key and value
            if (pArr[0] == paramName) {
                return pArr[1]; //return value
            }
        }
    }
}

/**
 * Helper function to construct outgoing parameter string which
 * formstack could use as default to ordered item's title and item id no. 
 * 
 * @param {string} urlParamStr  URL parameter string without the leading question mark (?)
 * @returns {string}
 */
function getParamStrToUseAsDefaultInForm(urlParamStr) {
    let params;
    let main_item_title = getParamValue('item_title', urlParamStr);
    if (main_item_title) {
        params = '?title=' + main_item_title;
        let item_identifier = getParamValue('item_id', urlParamStr);
        if (item_identifier) {
            params = params + '&item_id_number=' + item_identifier;
        }
    }
    return params;
}


/**
 * Unit Testing of Kura 2 was designed to be run locally and not within ContentDM.
 * Disable this secion before uploading to ContentDM's Website Configuration Tool.
 */

// module.exports.getParamValue = getParamValue;
// module.exports.getParamStrToUseAsDefaultInForm = getParamStrToUseAsDefaultInForm;
// module.exports.updateOrderLinkWithParamItemNo = updateOrderLinkWithParamItemNo;
// module.exports.assembleOrderCopyLink = assembleOrderCopyLink;


/* version history

2.0 - 2020 March - forked from ContentDM PDF button recipe with some mirador ContentDM recipe
                 - construct url for formstack's iframe
                 - defaulting title and item no whenever possible
1.0 - 2019 July - initial implementation

*/

/*homePageCollectionCoverImages.js*/

// path to where the cover images are uploaded
const PATH_COVERS_FILE_DIRECTORY = '/customizations/global/pages/images/covers/';
// replace thumbnails with better thumbnails
const coverImagesFilenames = [
    'Photographs.jpg', 'Maps.jpg', 'Manuscripts.jpg', // row 1 - top
    'Auckland-People-and-Events.jpg', 'Index-Cards.jpg', 'Rare-Books.jpg', // row 2
    'Passengers-and-Vessels.jpg', 'Cemetery-Records.jpg', 'Journals.jpg', // row 3
    'Iwidex.jpg', 'Local-History.jpg', 'Oral-History.jpg', // row 4 - bottom
    'Manukaus-Journey.jpg' // invisible row: Manukaus Journey and Ephemera-no image provided yet
];

// helper function to assemble full URL of each JS file
function coversFilePath(file) {
    return PATH_COVERS_FILE_DIRECTORY + file;
}

(function () {
    'use strict';

    /** 
     * ContentDM converts required images as smaller thumbnails. 
     * However, the converted versions appear to be too compressed.
     * This script allows Kura to display more visually appealing versions.
     */
    function updateCollectionCovers() {
        const allCoverImages = coverImagesFilenames.map(coversFilePath);
        let cardImages = document.querySelectorAll('.Card-cardImage');
        for (let i = 0; i < allCoverImages.length; i++) {
            cardImages[i].src = null;
            cardImages[i].src = allCoverImages[i];
        }
    }

	/*homePageCollectionCoverTitles.js*/
	
/**
 * Rewrite cover title as:
 *   English Title      (line 1)
 *   Maori Title        (line 2)
 */
function rewriteCoverTitle(card) {
    let coverFullTitle = card.textContent.split(' - ');
    let maoriTitle = coverFullTitle[1] ? coverFullTitle[1] : '';
    let englishTitle = coverFullTitle[0] ? coverFullTitle[0] : 'Untitled';
    card.innerHTML = maoriTitle ? `${englishTitle}<br/>${maoriTitle}` : `${englishTitle}`;
}

(function() {
    'use strict';
  
    /** 
     * Kura 2 had a new requirement which was to give both Maori and 
     * English titles similar visual hierarchy.  This requirement was 
     * not implemented in Kura 1 and ContentDM out of the box came with 
     * one-liner collection titles displayed on homepage.  
     * As a simpler solution, Kura 2 introduced two-liner collection titles on
     * the homepage via a static delimiter space-dash-space " - ".
     */
    function updateCoverTitles() {
        const cards = document.querySelectorAll('.CardWrapper-cardscontainer.row div.Card-cardcontainer .Card-cardTextHolder .titleDiv');
        cards.forEach(rewriteCoverTitle);
    }

    document.addEventListener('cdm-home-page:ready', updateCoverTitles);

})();
	
	
    document.addEventListener('cdm-home-page:ready', updateCollectionCovers);

})();

