'use strict';

// helper function to load js file and insert into DOM
// @param {string} src link to a js file
// @returns Promise

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script');
/*    script.crossOrigin = 'anonymous'; */
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// helper function to assemble full URL of each JS file
function filePath(file) {
  return fileDirectory + file;
}

// path corresponding to directory where JS scripts are uploaded
const fileDirectory = '/customizations/global/pages/js/';

// array containing file names of each JS file
const scriptFilesToLoad = [
  'mirador-custom-page.js',
  'proxy-redirect.js'
];

(function() {
  const allScripts = scriptFilesToLoad.map(filePath);
  allScripts.forEach(loadScript);

})();

(function() {
  'use strict';
  //debug script to show all event triggers in dev console when navigating through CONTENTdm
  //this script needs to be in the main JS file to work reliably

  const pageClasses = [
  //array of every page class in the lifecycle
    'cdm-home-page','cdm-about-page',
    'cdm-login-page','cdm-notfound-page',
    'cdm-search-page','cdm-collection-search-page',
    'cdm-advanced-search-page','cdm-collection-landing-page',
    'cdm-item-page','cdm-custom-page',
    'cdm-saved-items-page','cdm-shared-items-page'
  ];

  const eventCategories = ['enter','ready','update','leave'];
  //the four event categories

  const allPageEvents = [];

  pageClasses.forEach(pageClass => {
  //combine every event category with every page class
    eventCategories.forEach(eventCat => {
      allPageEvents.push(pageClass + ':' + eventCat);
    })
  });


  const valueStyle = 'font-weight: bold; font-style: italic;';
  //custom styling to emphasize log messages in the console

  document.addEventListener('cdm-app:ready', function(e) {
  //cdm-app only has the :ready event so is handled separately
    console.log('event: %c cdm-app:ready', valueStyle);
  });

  allPageEvents.forEach(eventType => {
  //run through every event type
    document.addEventListener(eventType, function(e) {
    //attach listeners to the event for every event type
      if (e.detail.collectionId || e.detail.itemId || e.detail.filename) {
      //create log group if multiple event details exist
        console.groupCollapsed('event: %c' + eventType, valueStyle);
        if (e.detail.collectionId || e.detail.itemId) {
          console.log('alias: %c' + e.detail.collectionId, valueStyle);
          console.log('id: %c' + e.detail.itemId, valueStyle);
        }
        if (e.detail.filename) {
          console.log('page name: %c' + e.detail.filename, valueStyle);
        }
        console.groupEnd();
      } else {
      //only a single event detail; og without group
        console.log('event: %c' + eventType, valueStyle);
      }
    });
  });

})();

/*

1_5 - 2021 Sep 17 - corrected list of page event classes (removed cdm-collection-page)
1_4 - 2020 Sep 18 - enhanced display of log messages and added more comments
1_3 - 2020 Sep 03 - cleaned up code and added comments
1_2 - 2020 Aug 03 - looped array methods made more consistent
1_1 - 2020 Aug - fixed saved-items typo
1_0 - 2020 Aug - initial implementation

*/


/* version history

2021-11-16 - replace old jQuery script with vanilla JS version

*/



/*PROXYJS*/
(function(){
'use strict';

	function replaceMessageText(){
		const requestUrl = new URL(window.location.href);
		const proxyUrl = `http://${requestUrl.hostname}.ezproxy.carleton.edu${requestUrl.pathname}${requestUrl.search}`;
		//add components of request URL to the EZproxy redirect URL
		const textToLink = 'log in to EZProxy'; //text for adding hyperlink
		let newLink = `<a href="${proxyUrl}">${textToLink}</a>`;
		//built as text rather than DOM element to support text replacement
		let oldMessageContainer = document.querySelector('.CollectionNotFound-maincontentCollectionNotFound > div.alert');
		if (oldMessageContainer) {
			let oldMessageText = oldMessageContainer.innerText;
			let newMessage = oldMessageText.replace(textToLink,newLink);
			let newMessageContainer = document.createElement('span');
			newMessageContainer.innerHTML = newMessage;
			oldMessageContainer.innerText = ''; //remove text-only string
			oldMessageContainer.appendChild(newMessageContainer); //add string with EZproxy hyperlink
		}
	}

	['cdm-collection-landing-page:ready','cdm-collection-landing-page:update',
	'cdm-collection-search-page:enter','cdm-collection-search-page:ready','cdm-collection-search-page:update',
	'cdm-search-page:enter','cdm-search-page:ready','cdm-search-page:update',
	'cdm-item-page:ready','cdm-item-page:update',
	'cdm-notfound-page:ready','cdm-notfound-page:update',
	'cdm-custom-page:ready','cdm-custom-page:update'].forEach(function(ev){
		document.addEventListener(ev, function(e){
			console.log('event is',ev);
			if (e.detail.collectionId === 'Zoobooks' && e.detail.itemId === '3569') {
				window.location.replace('https://login.ezproxy.carleton.edu/login?qurl=https://contentdm.carleton.edu/digital/collection/Zoobooks/id/3636');
				//this redirect is due to a published linked pointing to the wrong item
			} else {
				replaceMessageText();
			}
		})
	});

})();

/* version history

2021-11-16 - initial implementation

*/



/*MIRADOR JS*/
'use strict';

// helper function to load js file and insert into DOM
// @param {string} src link to a js file
// @returns Promise

// Enable to allow script on all pages.
const globalScope = false;
/**
 * Array for the collections where this script will apply.
 */
const collectionScope = [
  'ACAT'
];

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script');
/*    script.crossOrigin = 'anonymous'; */
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

(function() {
  const currentUrl = window.location.origin
    ? window.location.origin + '/'
    : window.location.protocol + '//' + window.location.host + '/';

    // helper function to determine parent record ID of current item
  	function getParent(item, collection) {
      return fetch('/digital/bl/dmwebservices/index.php?q=GetParent/' + collection + '/' + item + '/json')
      .then(function(response) {
  		// make GetParent API call and return as JSON
        return response.json();
      })
      .then(function(json) {
        let parent = false;
        // parse JSON for 'parent' value; -1 indicates parent ID is the same as item ID
        if (json.parent === -1) {
          parent = item;
        } else {
          parent = json.parent;
        }
        return parent;
      })
      .then(function(parent) {
      // once parent is known, check if IIIF Pres manifest exists (image-based records)
        return fetch('/digital/iiif-info/' + collection + '/' + parent)
        .then(function(response) {
          if (response.status == 404) {
            console.log('No IIIF manifest exists for this record.');
            parent = false;
            // if no manifest exists, return is 'false' so that IIIF button is not inserted
            return parent;
          } else {
            return parent;
          }
        })
  		})
      .catch(function(error) {
        console.log('Request failed: ' + error);
        parent = false;
        return parent;
  		})
  	}

  var mirador_button = {
    getMiradorUrl: function(item, collection) {
      const manifestUrl = currentUrl + '/digital/iiif-info/' + collection + '/' + item + '/manifest.json';
      return '/digital/custom/mirador?manifest=' + manifestUrl;
    },
    add: function(item, collection) {
      var div = document.createElement('div')
      div.className = 'btn-group btn-group-default mirador-button';

      var buttonAnchor = document.createElement('a');
      buttonAnchor.title = "Book View";
      buttonAnchor.className = 'cdm-btn btn btn-primary';
      buttonAnchor.href = mirador_button.getMiradorUrl(item, collection);
      buttonAnchor.style.paddingTop = '5px';
      buttonAnchor.style.paddingBottom = '2px';
      buttonAnchor.target = '_blank';
      buttonAnchor.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 60 55" style="fill: currentColor;"><rect width="18" height="55" /><rect width="18" height="55" transform="translate(42)" /><rect width="18" height="34" transform="translate(21)" /></svg> ';

      div.appendChild(buttonAnchor);

      Array.from(document.querySelectorAll('.ItemOptions-itemOptions>.btn-toolbar'))
        .forEach(el => {
          el.appendChild(div.cloneNode(true));
        });
    },
    remove: function() {
      Array.from(document.querySelectorAll('.mirador-button'))
        .forEach(el => {
          if (el && el.parentElement) {
            el.parentElement.removeChild(el);
          }
        });
    }
  }

  document.addEventListener('cdm-item-page:ready', function(e) {
    let item = e.detail.itemId;
		let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
    	getParent(item, collection).then(function(response) {
    		if (response === false) { return; } else {
          mirador_button.add(response, collection);
        }
      });
    }
  });

  document.addEventListener('cdm-item-page:update', function(e) {
    let item = e.detail.itemId;
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      getParent(item, collection).then(function(response) {
        if (response === false) {
          mirador_button.remove();
          return;
        } else {
          mirador_button.remove();
          mirador_button.add(response, collection);
        }
      });
    }
  });

  document.addEventListener('cdm-item-page:leave', function(e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      mirador_button.remove();
    }
  });


  document.addEventListener('cdm-custom-page:enter', function(e) {
    if (e.detail.filename == 'mirador') {
      loadScript('/customizations/global/pages/js/mirador-cp.js')
      .then(function() {
        addMiradorCss();
      });
    }
  });

  document.addEventListener('cdm-custom-page:ready', function(e) {
    if (e.detail.filename == 'mirador') {
      loadScript('/customizations/global/pages/mirador/mirador.js')
      .then(function() {
        initMirador();
      });
    }
  });

})();