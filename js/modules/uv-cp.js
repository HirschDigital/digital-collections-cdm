export { uv_cp };
function uv_cp () {
'use strict';

  function loadResource(type,src) {
    // helper function to load css or js and insert into DOM
    // @param {string} type - specify 'link' or 'script'
    // @param {string} src - path or url to file
    // @returns Promise
    return new Promise(function(resolve, reject) {
      if (type === 'link') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      } else if (type === 'script') {
        const script = document.createElement('script');
        //script.type = 'application/javascript';
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  }

  let initializeViewer = function(viewer) {
    // first grab manifest parameter if it exists
    const query = {};
    location.search.split(/\&|\?/g).forEach(function(kvp) {
      if (kvp) {
        var parts = kvp.split('=');
        var key = parts[0];
        var value = parts[1];
        query[key] = value;
      }
    });
    const manifestParameter = false || query['manifest'];

    if (viewer === 'uv') {
      loadResource('link',currentViewer.css)
      .then(function(){
        loadResource('script',currentViewer.js)
        .then(function(){
          let uv = UV.init('uv', {
            manifestUri: manifestParameter,
            embedded: true
          });
          document.querySelector('.centered').remove();
        })
      });
    } else if (viewer === 'mirador') {

    }

  }

  const currentUrl = window.location.origin
    ? window.location.origin + '/'
    : window.location.protocol + '//' + window.location.host + '/';

  // helper function to determine parent record ID of current item
	function getParent(item, collection) {
    return fetch(`/digital/bl/dmwebservices/index.php?q=GetParent/${collection}/${item}/json`)
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
      return fetch(`/iiif/info/${collection}/${parent}/manifest.json`)
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

  var viewerButton = {
    getUrl: function(item, collection, path) {
      const manifestUrl = `${currentUrl}/iiif/info/${collection}/${item}/manifest.json`;
      return `/digital/custom/${path}?manifest=${manifestUrl}`;
    },
    add: function(item, collection, viewerOptions) {
      var div = document.createElement('div')
      div.className = `btn-group btn-group-default ${viewerOptions.id}-button`;

      var buttonAnchor = document.createElement('a');
      buttonAnchor.title = `View this item in ${viewerOptions.name}`;
      buttonAnchor.className = 'cdm-btn btn btn-primary';
      buttonAnchor.href = viewerButton.getUrl(item, collection, viewerOptions.path);
      buttonAnchor.style.paddingTop = '3px';
      buttonAnchor.style.paddingBottom = '3px';
      buttonAnchor.target = '_blank';
      buttonAnchor.innerHTML = viewerOptions.buttonHTML;

      div.appendChild(buttonAnchor);

      Array.from(document.querySelectorAll('.ItemOptions-itemOptions>.btn-toolbar'))
        .forEach(el => {
          el.appendChild(div.cloneNode(true));
        });
    },
    remove: function() {
      Array.from(document.querySelectorAll(`.${currentViewer.id}-button`))
        .forEach(el => {
          if (el && el.parentElement) {
            el.parentElement.removeChild(el);
          }
        });
    }
  }

  const allViewerOptions = {
    uv: {
      id: 'uv',
      name: 'Universal Viewer',
      path: 'uv',
      buttonHTML: ' <span style="font-family:Inter,sans-serif;font-weight:700;font-size:1.6em;">UV</span> ',
      css: 'https://cdn.jsdelivr.net/npm/universalviewer@4.0.17/dist/uv.css',
      js: 'https://cdn.jsdelivr.net/npm/universalviewer@4.0.0-pre.62/dist/umd/UV.js'
    },
    mirador: {
      id: 'mirador',
      name: 'Mirador',
      path: 'mirador3',
      buttonHTML: ' <svg xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 60 55" style="fill: currentColor;"><rect width="18" height="55" /><rect width="18" height="55" transform="translate(42)" /><rect width="18" height="34" transform="translate(21)" /></svg> ',
      js: ''
    }
  }

  let globalScope = true;
  let collectionScope = [
    'p9006img' // 'example_alias'
  ];

  var currentViewer = allViewerOptions.uv;

  ['cdm-item-page:ready','cdm-item-page:update','cdm-item-page:leave'].forEach(function(e){
    document.addEventListener(e, function(e) {
      const item = e.detail.itemId;
  		const collection = e.detail.collectionId;
      if (globalScope || collectionScope.includes(collection)) {
        if (e.type === 'cdm-item-page:leave') {
          viewerButton.remove();
        } else {
          getParent(item, collection).then(function(response) {
        		if (response === false) {
              return;
            } else {
              viewerButton.remove();
              viewerButton.add(response, collection, currentViewer);
            }
          });
        }
      }
    });
  })

  function waitForNode(params) {
    new MutationObserver(function(mutations){
      const el = document.getElementById(params.id);
      console.log({el});
      if (el) {
        this.disconnect();
        params.done(el);
        initializeViewer(params.id);
      }
    }).observe(params.parent || document, {
      subtree: !!params.recursive,
      childList: true,
    });
  }

  if (window.location.href.indexOf(`custom/${currentViewer.path}`) !== -1) {
    console.log('Viewer page is loading...')
    waitForNode({
      id: currentViewer.id,
      file: currentViewer.js,
      parent: document.querySelector('body'),
      recursive: true,
      done: function(el){console.log(el);}
    });
  }

};

/* version history

1.0 - 2023 Jan 23 - initial implementation

*/
