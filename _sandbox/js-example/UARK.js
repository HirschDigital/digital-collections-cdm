document.addEventListener('cdm-collection-landing-page:ready', function(e) {
	console.log(e);
	var stamp = document.querySelector('.Header-logoHolder a');
	stamp.href = 'https://www.uark.edu/';
	var srch = document.querySelector('.Header-header .SimpleSearch-searchInputControl');
	srch.placeholder = 'Search all collections';
	var collectionID = e.detail.collectionId;
	document.querySelector('.CollectionLanding-pageTitle').innerHTML = '<span>' + document.querySelector('.CollectionLanding-pageTitle').innerHTML + '</span>';
	document.querySelector('.CollectionLanding-mainLandingImage').insertBefore( document.querySelector('.CollectionLanding-pageTitle'), document.querySelector('.CollectionLanding-mainLandingImage').firstChild);
	document.querySelector('.CollectionLanding-mainLandingImage').appendChild( document.querySelector('.CollectionLanding-landingBrowseButton').cloneNode(true) );
	document.querySelector('.Header-logoNameContainer').appendChild( document.querySelector('.SimpleSearch-searchBox') );

	if ( document.getElementById("samples") ) {
		var itemIDs = document.querySelector('#samples').className.split(' ');
		for (let i = itemIDs.length - 1; i > 0; i--) { //shuffle array
        const j = Math.floor(Math.random() * (i + 1));
        [itemIDs[i], itemIDs[j]] = [itemIDs[j], itemIDs[i]];
    	}
    	itemIDs = itemIDs.slice(0, 5); // limit to 5 items
			itemIDs.forEach(function(id) {
				getItemTitle(collectionID,id).then(function(item) {
  			var imageTitle = JSON.parse(item.response).imageinfo.title[0];
  			document.querySelector('#samples').insertAdjacentHTML( 'beforeend', '<li><a href="/digital/collection/' + collectionID + '/id/' + id + '/rec/1"><img src="//digitalcollections.uark.edu/utils/getthumbnail/collection/' + collectionID + '/id/' + id + '" alt =""></a><p><a href="/digital/collection/' + collectionID + '/id/' + id + '/rec/1">' + imageTitle + '</a></p></li>' );
  		});
		});
	}
	var headlineLength = document.querySelector('.CollectionLanding-pageTitle').innerHTML.length;
	if (headlineLength > 90) {
		document.querySelector('.CollectionLanding-pageTitle').style.fontSize = "2em";
	} else if (headlineLength > 60) {
		document.querySelector('.CollectionLanding-pageTitle').style.fontSize = "3em";
	} else {
		document.querySelector('.CollectionLanding-pageTitle').style.fontSize = "3.5em";
	}

});



document.addEventListener('cdm-item-page:ready', function(e) {
    if (e.detail.collectionId == 'OzarkFolkSong') {
		ozarkfolksongs('ready');
    }
});
document.addEventListener('cdm-item-page:update', function(e) {
    if (e.detail.collectionId == 'OzarkFolkSong') {
		ozarkfolksongs('update');
    }
});
function details(id) {
	return new Promise(function (resolve, reject) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState !== 4) return;
			if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
				resolve(xmlhttp);
			} else {
				reject({
					status: xmlhttp.status,
					statusText: xmlhttp.statusText
				});
			}
		};
		xmlhttp.open("GET", "//digitalcollections.uark.edu/digital/api/collections/" + id);
		xmlhttp.send();
	});
};
function ozarkfolksongs(event) {
	if(event == 'ready') {
		var identifier = document.querySelector('.ItemMetadata-metadatarow.field-identi .field-value').innerText;
    	var header = document.querySelector('.ItemView-itemTitle');
    	var player = document.createElement('div');
    	player.setAttribute('id', 'player');
    	player.innerHTML = '<audio controls><source src="//libraries.uark.edu/digitalcollections/OzarkFolkSong/Audio/' + identifier + '.mp3" type="audio/mpeg"></audio><p><a href="//libraries.uark.edu/digitalcollections/OzarkFolkSong/Audio/' + identifier + '.mp3">right click to download the audio</a></p>';
    	header.insertBefore(player, null);
    } else if (event == 'update') {
    	var player = document.querySelector('#player');
    	var identifier = document.querySelector('.ItemMetadata-metadatarow.field-identi .field-value').innerText;
    	player.innerHTML = '<audio controls><source src="//libraries.uark.edu/digitalcollections/OzarkFolkSong/Audio/' + identifier + '.mp3" type="audio/mpeg"></audio><p><a href="//libraries.uark.edu/digitalcollections/OzarkFolkSong/Audio/' + identifier + '.mp3">right click to download the audio</a></p>';
    }
}
function getItemTitle(coll,id) {
	return new Promise(function (resolve, reject) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState !== 4) return;
			if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
				resolve(xmlhttp);
			} else {
				reject({
					status: xmlhttp.status,
					statusText: xmlhttp.statusText
				});
			}
		};
		xmlhttp.open('GET', '//digitalcollections.uark.edu/utils/ajaxhelper/?CISOROOT=' + coll + '&CISOPTR=' + id);
		xmlhttp.send();
	});
};


function loadScript(src) {
return new Promise(function (resolve, reject) {
var script = document.createElement('script');
script.crossOrigin = 'anonymous';
script.src = src;
script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

var ts = Math.floor(Date.now() / 1000);

//loadScript('https://www.googletagmanager.com/gtag/js?id=UA-3687364-2');
//loadScript('https://libraries.uark.edu/js/digitalcollections-gtag.js');

//loadScript('//libraries.uark.edu/js/cdm/ia-book-reader-embed-1.1.js?v=' + ts);



(function() {
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'libraries.uark.edu/js/digitalcollections-gtag.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();

(function() {
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.googletagmanager.com/gtag/js?id=UA-3687364-2';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();



//---------------------------//
//   archive.org embed      //


(function() {
  'use strict';
  let currentInstance = null;
  function IABookReader(url) {
    return new Promise(function(resolve) {
      if (!url) {
        return resolve(false);
      }
      // create iframe for ia book reader
      let html = '<div id="internetArchiveEmbed" style="width: 100%;"><iframe src="' + url + '?ui=embed#page/n1/mode/2up" width="100%" height="600px"></iframe></div>';
      resolve(html);
    });
  }

  var APIS = {
    'archive.org': IABookReader
  };

  function loadFrame(link) {
    return Promise.resolve(link).then(function(link) {
      const url = new URL(link);
      // find proper api from api list
      const loader = APIS[url.hostname];
      return loader && loader(link);
    }).catch(console.warn);
  }

  function CustomVideoView(container) {
    if (!container) {
      return false;
    }
    const anchor = container.querySelector('a');
    if (!anchor || !/archive.org/i.test(anchor.href)) {
      return false;
    }

    const links = [anchor.href];
    // create container for iFrames
    const frameContainer = document.createElement('div');

    const mount = function() {
      const reqs = links.map(function(link) {
        return loadFrame(link.replace('/details/', '/stream/'));
      });
      Promise.all(reqs).then(function(reps) {
        // hide original viewer
        container.className += ' hide';
        // add each frames to one root
        reps.forEach(function(embeddedHTML) {
          embeddedHTML && (frameContainer.innerHTML += embeddedHTML);
        });
        // insert it
        console.log( document.getElementsByClassName('ItemPreview-container')[0] );
        //document.getElementsByClassName('ItemPreview-container')[0].insertBefore(frameContainer, container);
        document.getElementsByClassName('ItemPreview-container')[0].innerHTML = frameContainer.innerHTML
      });
    };
    const unmount = function() {
      frameContainer.parentNode && frameContainer.parentNode.removeChild(frameContainer);
    };
    mount();
    return {unmount: unmount};
  }
  // set to true for global scripts or false for collection-constrained scripts
  let globalScope = true;
  // list all collection aliases that should trigger this script
  let collectionScope = [
    'Razorbacks'
  ];
  document.addEventListener('cdm-item-page:ready', function(e) {
    if (globalScope || collectionScope.includes(e.detail.collectionId)) {
      // unmount or remove current video player from DOM if it is exists
      currentInstance && currentInstance.unmount();
      // creates a new instance if it is url item and it is from vimeo.com
      currentInstance = CustomVideoView(document.querySelector('tr[class*=field-url]'));
    }
  });
  document.addEventListener('cdm-item-page:update', function(e) {
    if (globalScope || collectionScope.includes(e.detail.collectionId)) {
      currentInstance && currentInstance.unmount();
      // updates an instance if it is url item and it is from vimeo.com
      currentInstance = CustomVideoView(document.querySelector('div[class*=itemUrl]'));
    }
  });
  document.addEventListener('cdm-item-page:leave', function(e) {
    if (globalScope || collectionScope.includes(e.detail.collectionId)) {
      // unmount or remove current video player from DOM if it is exists
      currentInstance && currentInstance.unmount();
    }
  });
})();


/////////////////////////////////////////////
///////////////  AEON BUTTON ///////////////
///////////////////////////////////////////


// CONTENTdm Aeon request button javascript
// Version 2018.10.24

// CONFIGURE THE baseURL THAT POINTS TO YOUR AEON SERVER
//var baseUrl = 'http://localhost/aeon/aeon.dll';
var baseUrl = 'https://uark.aeon.atlas-sys.com/logon';


// CONFIGURE THE TEXT DISPLAYED ON THE AEON REQUEST BUTTON
var buttonText = 'Request Item';

// CONFIGURE THE TEXT DISPLAY ON THE BUTTON FOR REQUESTING FOR READING ROOM (LOAN) USE
var loanButtonText = 'Request for in Library Use';

// CONFIGURE THE TEXT DISPLAY ON THE BUTTON FOR REQUESTING FOR PHOTODUPLICATION (COPY) USE
var copyButtonText = 'Request High Resolution Download';

// CONFIGURE WHETHER TO USE DEFAULT OR GENERIC REQUEST FORMS FOR READING ROOM (LOAN) REQUESTS
var loanUseDefaultForms = false;
// IF loanUseDefaultForms IS false THEN CONFIGURE THE GENERIC REQUEST FORM TO USE FOR READING ROOM (LOAN) REQUESTS
// SEE https://prometheus.atlas-sys.com/display/Aeon/Customizing+and+Editing+Web+Pages#CustomizingandEditingWebPages-CreatingNewRequestForms FOR MORE INFORMATION
var loanGenericRequestForm = 'GenericRequestManuscriptDefault';

// CONFIGURE WHETHER TO USE DEFAULT OR GENERIC REQUEST FORMS FOR PHOTODUPLICATION (COPY) REQUESTS
var copyUseDefaultForms = false;
// IF copyUseDefaultForms IS false THEN CONFIGURE THE GENERIC REQUEST FORM TO USE FOR PHOTODUPLICATION (COPY) REQUESTS
// SEE https://prometheus.atlas-sys.com/display/Aeon/Customizing+and+Editing+Web+Pages#CustomizingandEditingWebPages-CreatingNewRequestForms FOR MORE INFORMATION
var copyGenericRequestForm = 'GenericRequestManuscriptDefaultPhotoduplication';


var applyToCollections = {'SC_Gallery':'','HistoryR':'','BADTimes':'copy-only','p17212coll3':'copy-only'};
//var applyToCollections = {'SC_Gallery':'copy-only','HistoryR':'use-only'};

var ourCollection = {};


// FIELD MAPPINGS
// Item Info fields corresponding to Aeon fields
// Format:
// Aeon field name: 'ContentDM identifier'
var fieldMappings = {
    ItemTitle: 'relati',
    ItemSubTitle: 'title',
    ItemDate: 'date',
    DocumentType: '',
    ItemAuthor: 'creato',
    ItemPlace: '',
    ItemPublisher: 'publis',
    ItemEdition: '',
    ItemVolume: 'identi',
    ItemIssue: 'identi',
    ItemPages: '',
    Location: 'linked',
    SubLocation: '',
    PageCount: '',
    PageCount: '',
    ItemISxN: '',
    ItemCitation: 'dmrecord',
    ItemNumber: '',
    EADNumber: '',
    ReferenceNumber: '',
    CallNumber: 'identi',
    Format: '',
    ServiceLevel: '',
    ShippingOption: '',
    ForPublication: '',
    ItemInfo1a: 'format',
		ItemInfo1b: 'typea',
		ItemInfo1c: 'extent',
    ItemInfo2: '',
    ItemInfo3: '',
    ItemInfo4a: 'contri',
		ItemInfo4b: 'dmrecord',
    ItemInfo5: ''
}

// OTHER SETTINGS - PLEASE DO NOT MODIFY
var aeonButtonOptionOpen = false;
var view = null;
var itemInfo = null;
var objectInfo = null;
var parent = null;
var parentItemInfo = null;
var childItemInfo = null;

document.addEventListener('cdm-item-page:ready', function (e) {

    if (document.getElementById('singleItemDescription')) {
        view = 'single item';
    } else if (document.getElementById('compoundItemDescription')) {
        view = 'compound object'
    }
    getItemInfo(e.detail.collectionId, e.detail.itemId).then(response => itemInfo = response);
    getObjectInfo(e.detail.collectionId, e.detail.itemId).then(response => objectInfo = response);
    getParent(e.detail.collectionId, e.detail.itemId).then(response => parent = response);
    getParentItemInfo(e.detail.collectionId, e.detail.itemId).then(response => parentItemInfo = response);
    getChildItemInfo(e.detail.collectionId, e.detail.itemId).then(response => parentItemInfo = response);
		ourCollection['set'] = e.detail.collectionId;


    if (view && ((view === 'single item') || (view === 'compound object'))) {
        if (document.getElementsByClassName('btn-toolbar')) {
            var btnToolbar = document.getElementsByClassName('btn-toolbar');

						//if ( applyToCollections.includes(e.detail.collectionId) ) {

						if ( e.detail.collectionId in applyToCollections ) {


							var buttonMobileHTML = '<button aria-label="Request Item" data-metrics-event-name="event" data-metrics-merge-pagedefaults="true" data-metrics-event-category="' + view + '" data-metrics-event-action="click" data-metrics-event-label="Aeon request menu" id="aeon-dropdown-mobile" role="button" aria-haspopup="true" aria-expanded="false" type="button" class="cdm-btn dropdown-toggle btn btn-primary" style="height: 36px;"><span id="aeon_button_text_mobile" class="menu_button_text" style="font-size: 15px;padding: 10px;">Request Item</span><span class="caret"></span></button><ul id="aeonrequestmenu-side-bar-mobile" role="menu" class="dropdown-menu" aria-labelledby="aeon-dropdown">'

							if ( applyToCollections[e.detail.collectionId] != 'copy-only') {
							  buttonMobileHTML += '<li role="presentation"><a id="aeon_button_option_loan_mobile" class="aeon_button_option spacePad5" iopt="Loan">Request for Reading Room</a></li>'
							}

              if ( applyToCollections[e.detail.collectionId] != 'use-only') {
								buttonMobileHTML += '<li role="presentation"><a id="aeon_button_option_copy_mobile" class="aeon_button_option spacePad5" iopt="Copy">Request Copy</a></li>'
							}

							buttonMobileHTML += '</ul>';

	            var aeonButtonMobile = document.createElement("div");
	            aeonButtonMobile.setAttribute("class", "ItemDownloadImage-itemDownloadDropdown dropdown btn-group");
	            aeonButtonMobile.setAttribute("id", "aeon_button_container_mobile");
	            aeonButtonMobile.innerHTML = buttonMobileHTML;
	            btnToolbar[0].appendChild(aeonButtonMobile);

	            var buttonHTML = '<button aria-label="Request Item" data-metrics-event-name="event" data-metrics-merge-pagedefaults="true" data-metrics-event-category="' + view + '" data-metrics-event-action="click" data-metrics-event-label="Aeon request menu" id="aeon-dropdown" role="button" aria-haspopup="true" aria-expanded="false" type="button" class="cdm-btn dropdown-toggle btn btn-primary" style="height: 36px;"><span id="aeon_button_text" class="menu_button_text" style="font-size: 15px;padding: 10px;">Request Item</span><span class="caret"></span></button><ul id="aeonrequestmenu-side-bar" role="menu" class="dropdown-menu" aria-labelledby="aeon-dropdown">'

							if ( applyToCollections[e.detail.collectionId] != 'copy-only') {
							  buttonHTML += '<li role="presentation"><a id="aeon_button_option_loan" class="aeon_button_option spacePad5" iopt="Loan">Request for Reading Room</a></li>'
							}

              if ( applyToCollections[e.detail.collectionId] != 'use-only') {
								buttonHTML += '<li role="presentation"><a id="aeon_button_option_copy" class="aeon_button_option spacePad5" iopt="Copy">Request Copy</a></li>'
							}

							buttonHTML += '</ul>';

	            var aeonButton = document.createElement("div");
	            aeonButton.setAttribute("class", "ItemDownloadImage-itemDownloadDropdown dropdown btn-group");
	            aeonButton.setAttribute("id", "aeon_button_container");
	            aeonButton.innerHTML = buttonHTML;
							btnToolbar[1].appendChild(aeonButton);


							if ( applyToCollections[e.detail.collectionId] == 'use-only') {
                //$('#aeon_button_option_copy').hide();
							} else if ( applyToCollections[e.detail.collectionId] == 'copy-only') {
                //$('#aeon_button_option_loan').hide();
							}

							aeonButtonInit();


						}
						//console.log(applyToCollections[e.detail.collectionId]);
        }
    } else {
        console.log("Cannot find view element");
    }

});

document.addEventListener('cdm-item-page:update', function (e) {
    getItemInfo(e.detail.collectionId, e.detail.itemId).then(response => itemInfo = response);
    getObjectInfo(e.detail.collectionId, e.detail.itemId).then(response => objectInfo = response);
    getParent(e.detail.collectionId, e.detail.itemId).then(response => parent = response);
    getParentItemInfo(e.detail.collectionId, e.detail.itemId).then(response => parentItemInfo = response);
    getChildItemInfo(e.detail.collectionId, e.detail.itemId).then(response => childItemInfo = response);
		ourCollection['set'] = e.detail.collectionId;
});

function getItemInfo(collection, item) {
    return fetch('/digital/bl/dmwebservices/index.php?q=dmGetItemInfo/' + collection + '/' + item + '/json')
    .then((response) => response.json())
    .then((responseData) => {
        console.log('Item Info');
        console.log(responseData);
        return responseData;
    })
    .catch(error => console.warn(error));
}

function getObjectInfo(collection, item) {
    return fetch('/digital/bl/dmwebservices/index.php?q=dmGetCompoundObjectInfo/' + collection + '/' + item + '/json')
    .then((response) => response.json())
    .then((responseData) => {
        console.log('Object Info');
        console.log(responseData);
        return responseData;
    })
    .catch(error => console.warn(error));
}

function getParent(collection, item) {
    return fetch('/digital/bl/dmwebservices/index.php?q=GetParent/' + collection + '/' + item + '/json')
    .then((response) => response.json())
    .then((responseData) => {
        return responseData;
    })
    .catch(error => console.warn(error));
}

function getParentItemInfo(collection, item) {
    return fetch('/digital/bl/dmwebservices/index.php?q=GetParent/' + collection + '/' + item + '/json')
    .then((response) => response.json())
    .then((responseData) => {
        return fetch('/digital/bl/dmwebservices/index.php?q=dmGetItemInfo/' + collection + '/' + responseData['parent'] + '/json')
        .then((response) => response.json())
        .then((responseData) => {
            console.log('Parent Item Info');
            console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
    })
    .catch(error => console.warn(error));
}

function getChildItemInfo(collection, item) {
    return fetch('/digital/bl/dmwebservices/index.php?q=dmGetCompoundObjectInfo/' + collection + '/' + item + '/json')
    .then((response) => response.json())
    .then((responseData) => {
        return fetch('/digital/bl/dmwebservices/index.php?q=dmGetItemInfo/' + collection + '/' + responseData['page'][0]['pageptr'] + '/json')
        .then((response) => response.json())
        .then((responseData) => {
            console.log('Child Item Info');
            console.log(responseData);
            return responseData;
        })
        .catch(error => console.warn(error));
    })
    .catch(error => console.warn(error));
}

window.addEventListener('click', function (e) {
    if (!(document.getElementById('aeon-dropdown').contains(e.target))) {
        document.getElementById("aeonrequestmenu-side-bar").classList.remove("show");
        document.getElementById("aeon_button_container").classList.remove("open");
        document.getElementById("aeon-dropdown").setAttribute("aria-expanded", "false");
    }
    if (!(document.getElementById('aeon-dropdown-mobile').contains(e.target))) {
        document.getElementById("aeonrequestmenu-side-bar-mobile").classList.remove("show");
        document.getElementById("aeon_button_container_mobile").classList.remove("open");
        document.getElementById("aeon-dropdown-mobile").setAttribute("aria-expanded", "false");
    }
});

// Constructs base Aeon request
function createRequest(requestType) {
    var request = {};

		//set values which are empty objects to N/A

		for (const item in itemInfo) {
			if( Object.keys(itemInfo[item]).length === 0 && itemInfo[item].constructor === Object ) {
			  itemInfo[item] = 'N/A';
			}
    }


    // Default mappings for Aeon Requests
    // Will copy Item Description Info for Single Items
    // Will copy Object Description Info for Compound Items
    request['ItemTitle'] = itemInfo[fieldMappings.ItemTitle];
    request['ItemSubTitle'] = itemInfo[fieldMappings.ItemSubTitle];
    request['ItemDate'] = itemInfo[fieldMappings.ItemDate];
    request['DocumentType'] = itemInfo[fieldMappings.DocumentType];
    request['ItemAuthor'] = itemInfo[fieldMappings.ItemAuthor];
    request['ItemPlace'] = itemInfo[fieldMappings.ItemPlace];
    request['ItemPublisher'] = itemInfo[fieldMappings.ItemPublisher];
    request['ItemEdition'] = itemInfo[fieldMappings.ItemEdition];
    request['ItemVolume'] = itemInfo[fieldMappings.ItemVolume];
    request['ItemIssue'] = itemInfo[fieldMappings.ItemIssue];
    request['ItemPages'] = itemInfo[fieldMappings.ItemPages];
    request['Location'] = itemInfo[fieldMappings.Location];
    request['SubLocation'] = itemInfo[fieldMappings.SubLocation];
    request['PageCount'] = itemInfo[fieldMappings.PageCount];
    request['ItemISxN'] = itemInfo[fieldMappings.ItemISxN];
    request['ItemCitation'] = 'https://digitalcollections.uark.edu/digital/collection/'+ ourCollection["set"] + '/id/' + itemInfo[fieldMappings.ItemCitation] + '/';
    request['ItemNumber'] = itemInfo[fieldMappings.ItemNumber];
    request['EADNumber'] = itemInfo[fieldMappings.EADNumber];
    request['ReferenceNumber'] = itemInfo[fieldMappings.ReferenceNumber];
    request['CallNumber'] = itemInfo[fieldMappings.CallNumber];
    request['Format'] = itemInfo[fieldMappings.Format];
    request['ServiceLevel'] = itemInfo[fieldMappings.ServiceLevel];
    request['ShippingOption'] = itemInfo[fieldMappings.ShippingOption];
    request['ForPublication'] = itemInfo[fieldMappings.ForPublication];
    request['ItemInfo1'] = itemInfo[fieldMappings.ItemInfo1a] + ' | ' + itemInfo[fieldMappings.ItemInfo1b] + ' | ' + itemInfo[fieldMappings.ItemInfo1c];
    request['ItemInfo2'] = itemInfo[fieldMappings.ItemInfo2];
    request['ItemInfo3'] = itemInfo[fieldMappings.ItemInfo3];
    request['ItemInfo4'] = itemInfo[fieldMappings.ItemInfo4a] + ': ' + itemInfo[fieldMappings.ItemInfo4b];
    request['ItemInfo5'] = itemInfo[fieldMappings.ItemInfo5];

    if (parent['parent'] == -1 && objectInfo['code'] != -2) {
        // Field Mappings for the "Main Page" of compound items
        // itemInfo contains the fields inside the "Object Description"
        // childItemInfo contains the fields inside the "Item Description" of the first page

        // By default, this will copy the Object's data, not the Item's
        // You only need to include any mappings in this block if you want the Item's data

        // For example, if you want the request to copy the Item's "ItemTitle" field
        // (mapped at the beginning of the file), you would have:
        // request['ItemTitle'] = childItemInfo[fieldMappings.ItemTitle];

        // NOTE: Any changes made here should be mirrored in the below section

    }
    else if (parent['parent'] != -1) {
        // Field Mappings for the individual pages of compound items
        // itemInfo contains the fields inside the "Item Description" of the current page
        // parentItemInfo contains the fields inside the "Object Description"

        // By default, this will copy the Object's data, not the Item's
        // If you want the Item's data, you can remove one of the mappings here

        // For example, if you want the request to copy the Item's "ItemTitle" field
        // (mapped at the beginning of the file), you would remove:
        // request['ItemTitle'] = parentItemInfo[fieldMappings.ItemTitle];

        // NOTE: Any changes made here should be mirrored in the above section

        request['ItemTitle'] = parentItemInfo[fieldMappings.ItemTitle];
        request['ItemSubTitle'] = parentItemInfo[fieldMappings.ItemSubTitle];
        request['ItemDate'] = parentItemInfo[fieldMappings.ItemDate];
        request['DocumentType'] = parentItemInfo[fieldMappings.DocumentType];
        request['ItemAuthor'] = parentItemInfo[fieldMappings.ItemAuthor];
        request['ItemPlace'] = parentItemInfo[fieldMappings.ItemPlace];
        request['ItemPublisher'] = parentItemInfo[fieldMappings.ItemPublisher];
        request['ItemEdition'] = parentItemInfo[fieldMappings.ItemEdition];
        request['ItemVolume'] = parentItemInfo[fieldMappings.ItemVolume];
        request['ItemIssue'] = parentItemInfo[fieldMappings.ItemIssue];
        request['ItemPages'] = parentItemInfo[fieldMappings.ItemPages];
        request['Location'] = parentItemInfo[fieldMappings.Location];
        request['SubLocation'] = parentItemInfo[fieldMappings.SubLocation];
        request['PageCount'] = parentItemInfo[fieldMappings.PageCount];
        request['ItemISxN'] = parentItemInfo[fieldMappings.ItemISxN];
				request['ItemCitation'] = 'https://digitalcollections.uark.edu/digital/collection/'+ ourCollection["set"] + '/id/' + itemInfo[fieldMappings.ItemCitation] + '/';
        request['ItemNumber'] = parentItemInfo[fieldMappings.ItemNumber];
        request['EADNumber'] = parentItemInfo[fieldMappings.EADNumber];
        request['ReferenceNumber'] = parentItemInfo[fieldMappings.ReferenceNumber];
        request['CallNumber'] = parentItemInfo[fieldMappings.CallNumber];
        request['Format'] = parentItemInfo[fieldMappings.Format];
        request['ServiceLevel'] = parentItemInfo[fieldMappings.ServiceLevel];
        request['ShippingOption'] = parentItemInfo[fieldMappings.ShippingOption];
        request['ForPublication'] = parentItemInfo[fieldMappings.ForPublication];
		    request['ItemInfo1'] = itemInfo[fieldMappings.ItemInfo1a] + ' | ' + itemInfo[fieldMappings.ItemInfo1b] + ' | ' + itemInfo[fieldMappings.ItemInfo1c];
		    request['ItemInfo2'] = itemInfo[fieldMappings.ItemInfo2];
		    request['ItemInfo3'] = itemInfo[fieldMappings.ItemInfo3];
		    request['ItemInfo4'] = itemInfo[fieldMappings.ItemInfo4a] + ': ' + itemInfo[fieldMappings.ItemInfo4b];
		    request['ItemInfo5'] = itemInfo[fieldMappings.ItemInfo5];
    }

    // Do Not Modify: Request Type is set by clicking the dropdown menu
    request['RequestType'] = requestType;

    console.log(request);
    return request;
}

// Constructs URL for Aeon request submission and opens in a new window
function sendToAeon(request) {
    var url = baseUrl;

    if (request['RequestType'] === 'Loan') {
        if (loanUseDefaultForms) {
            url = url + '?Action=10&Form=21'
        }
        else {
            url = url + '?Action=10&Form=20&Value=' + loanGenericRequestForm;
        }
    }
    else {
        if (copyUseDefaultForms) {

            url = url + '?Action=10&Form=20';
        }
        else {
            url = url + '?Action=10&Form=20&Value=' + copyGenericRequestForm;
        }
    }

  // Build query parameters from request

    var query = [];

    for (var i in request) {
        if (request[i] && (request[i] !== '')) {
            query.push(i + '=' + encodeURIComponent(request[i]));
        }
    }

  // Construct URL

    url = url + '&' + query.join('&');

    console.log('Aeon Request -> ' + url);
    window.open(url);
}

function aeonButtonInit() {

    var aeonButton = document.getElementById('aeon-dropdown');
    var aeonButtonText = document.getElementById('aeon_button_text');
    var aeonLoanButton = document.getElementById('aeon_button_option_loan');
    var aeonCopyButton = document.getElementById('aeon_button_option_copy');
    aeonButtonText.innerHTML = buttonText;
    aeonButton.onclick = function () { showDropdown(false) };

    if (aeonLoanButton !== null){
		  aeonLoanButton.innerHTML = loanButtonText;
      aeonLoanButton.onclick = function () { aeonButtonClick("Loan") };
		}
		if (aeonCopyButton !== null){
      aeonCopyButton.innerHTML = copyButtonText;
      aeonCopyButton.onclick = function () { aeonButtonClick("Copy") };
	  }

    var aeonButtonMobile = document.getElementById('aeon-dropdown-mobile');
    var aeonButtonMobileText = document.getElementById('aeon_button_text_mobile');
    var aeonLoanButtonMobile = document.getElementById('aeon_button_option_loan_mobile');
    var aeonCopyButtonMobile = document.getElementById('aeon_button_option_copy_mobile');
    aeonButtonMobileText.innerHTML = buttonText;
    aeonButtonMobile.onclick = function () { showDropdown(true) };

    if (aeonLoanButtonMobile !== null){
		  aeonLoanButtonMobile.innerHTML = loanButtonText;
      aeonLoanButtonMobile.onclick = function () { aeonButtonClick("Loan") };
		}
		if (aeonCopyButtonMobile !== null){
      aeonCopyButtonMobile.innerHTML = copyButtonText;
      aeonCopyButtonMobile.onclick = function () { aeonButtonClick("Copy") };
	  }
}

function aeonButtonClick(selectedOption) {
    var request = createRequest(selectedOption);
    sendToAeon(request);
}

function showDropdown(mobile) {
    if (mobile) {
        document.getElementById("aeonrequestmenu-side-bar-mobile").classList.toggle("show");
        document.getElementById("aeon_button_container_mobile").classList.toggle("open");
        document.getElementById("aeon-dropdown-mobile").setAttribute("aria-expanded", "true");
    } else {
        document.getElementById("aeonrequestmenu-side-bar").classList.toggle("show");
        document.getElementById("aeon_button_container").classList.toggle("open");
        document.getElementById("aeon-dropdown").setAttribute("aria-expanded", "true");
    }
}