'use strict';

// helper function to load js file and insert into DOM
// @param {string} src link to a js file
// @returns Promise

 const loadScript = (src) => {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script')
        //script.crossOrigin = 'anonymous'
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}

let json = {}

const instantiateBookReader = (selector, extraOptions) => {
    selector = selector || '#BookReader'
    extraOptions = extraOptions || {}

    //Crudely grab collection & id from url
    const manifestUrl = window.location.href.split('=')[1]
    const urlArray = window.location.href.split('/')
    const identifier  = urlArray[urlArray.length - 2]
    let collection
    let item
    if(identifier.includes(':')) {
        const splitId = identifier.split(':')
        item = splitId[1]
        collection = splitId[0]
    } else {
        item = identifier
        collection = urlArray[urlArray.length - 3]
    }

    let jsonData
    fetch(manifestUrl)
    .then(response => {
        return response.json()
    }).then(data => {
        jsonData = data
    }).then(() => {
        let canvases = jsonData.sequences[0].canvases
        let imagesList = []
        let tempArray = []

        for(let i=0; i<canvases.length; i++)  {
            let imageObj = {}
            //Fullscreen
            let maxHeight = window.outerHeight
            let canvasHeight = canvases[i].height || 1200
            let canvasWidth = canvases[i].width || 800
            //Scale large images
            if(maxHeight < canvasHeight) {
                let scaleRatio = maxHeight / canvasHeight
                canvasHeight = Math.floor(canvasHeight*scaleRatio)
                canvasWidth = Math.floor(canvasWidth*scaleRatio)
            }

            let uri
            if(!canvases[i].images) {
                uri = `${window.location.origin}/iiif/2/${collection}:${item}/full/,${canvasHeight}/0/default.jpg?page=${i+1}`
            } else {
                uri = canvases[i].images[0].resource['@id']
                uri = uri.replace('/full/full/', `/full/,${canvasHeight}/`)
            }
            imageObj.width = canvasWidth
            imageObj.height = canvasHeight
            imageObj.uri = uri
            //Create an array(A) of arrays(B) where B would be the images you see on the page
            if(i === 0 || ((canvases.length % 2 === 0) && (i == canvases.length - 1))) {
                tempArray.push(imageObj)
                imagesList.push(tempArray)
                tempArray = []
            } else {
                tempArray.push(imageObj)
                if(tempArray.length == 2) {
                    imagesList.push(tempArray)
                    tempArray = []
                }
            }

        }

        //Some options we can pass into bookreader
        let options = {
            data: imagesList,

            // Book title and the URL used for the book title link
            bookTitle: jsonData.label,
            bookUrl: `/digital/collection/${collection}/id/${item}`,
            bookUrlText: 'Back to item page',
            bookUrlTitle: jsonData.label,

            // thumbnail is optional, but it is used in the info dialog
            thumbnail: imagesList[0][0].uri,
            // Metadata is optional, but it is used in the info dialog
            metadata: jsonData.metadata,

            // Override the path used to find UI images
            imagesBaseURL: '/customizations/global/pages/BookReader/images/',

            ui: 'full', // embed, full (responsive)

            el: selector,
        }

        $.extend(options, extraOptions)
        let br = new BookReader(options)
        br.init()
    }).then(() => {
        //With mobile display under license, we will only allow fullscreen.
        if(document.getElementsByClassName('BRicon full')[0]) {
            document.getElementsByClassName('BRicon full')[0].click()
            document.getElementsByClassName('BRicon full')[0].style.display = 'none'
        }
        //temp-disable share
        if(document.getElementsByClassName('BRpill share')) {
            document.getElementsByClassName('BRpill share')[0].style.display = 'none'
        }
    })
}

//Helper function to add css links to the html head
const addCSS = (cssId, path) => {
    if (!document.getElementById(cssId)) {
        var link = document.createElement('link')
        link.id =  cssId
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = path
        link.media = 'all'
        document.head.appendChild(link)
    }
}

//Helper function to add meta tags to the html head
const placeBRMetaTags = () => {
    let metas = document.getElementsByTagName('meta')
    //Edit the viewport  meta tag already on the page
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === 'viewport') {
            metas[i].setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
        }
    }
    //Create another meta tag for apple mobile
    let meta = document.createElement('meta')
    meta.name = 'apple-mobile-web-app-capable'
    meta.content = 'yes'
    document.head.appendChild(meta)
}

const runFunction = () => {
    const currentUrl = window.location.origin
        ? window.location.origin + '/'
        : window.location.protocol + '//' + window.location.host + '/'

    //Helper function to determine parent record ID of current item
  	const getParent = (item, collection) => {
        return fetch(`/digital/bl/dmwebservices/index.php?q=GetParent/${collection}/${item}/json`)
        .then(response => {
  		    // make GetParent API call and return as JSON
            return response.json()
        }).then(json => {
            let parent = false
            // parse JSON for 'parent' value; -1 indicates parent ID is the same as item ID
            if (json.parent === -1) {
            parent = item
            } else {
            parent = json.parent
            }
            return parent
        }).then(parent => {
            // once parent is known, check if IIIF Pres manifest exists (image-based records)
            //TODO: Switch to new item manifest URL (after switched to Cantaloupe)
            return fetch(`/iiif/info/${collection}/${parent}/manifest.json`)
            .then(response => {
                if (response.status == 404) {
                    console.log('No IIIF manifest exists for this record.')
                    parent = false
                }
                return parent
            })
        }).catch(error => {
            console.log('Request failed: ' + error)
            parent = false
            return parent
        })
    }


    let bookreader_button = {
        getBookReaderUrl: (item, collection) => {
            const manifestUrl = currentUrl + `/digital/iiif-info/${collection}/${item}/manifest.json`
            return '/digital/custom/BookReader?manifest=' + manifestUrl
        },
        add: (item, collection) => {
            var div = document.createElement('div')
            div.className = 'btn-group btn-group-default bookreader-button'

            var buttonAnchor = document.createElement('a')
            buttonAnchor.title = "View this item in Bookreader"
            buttonAnchor.className = 'cdm-btn btn btn-primary'
            buttonAnchor.href = bookreader_button.getBookReaderUrl(item, collection)
            //Additional option to add IABookReader url manager plugin (unused)
            buttonAnchor.style.paddingTop = '5px'
            buttonAnchor.style.paddingBottom = '2px'
            buttonAnchor.target = '_blank'
            buttonAnchor.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.8em" height="1.8em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M21 8c-.202 0-4.85.029-9 2.008C7.85 8.029 3.202 8 3 8a1 1 0 0 0-1 1v9.883a1 1 0 0 0 .305.719c.195.188.48.305.729.28l.127-.001c.683 0 4.296.098 8.416 2.025c.016.008.034.005.05.011c.119.049.244.083.373.083s.254-.034.374-.083c.016-.006.034-.003.05-.011c4.12-1.928 7.733-2.025 8.416-2.025l.127.001c.238.025.533-.092.729-.28c.194-.189.304-.449.304-.719V9a1 1 0 0 0-1-1zM4 10.049c1.485.111 4.381.48 7 1.692v7.742c-3-1.175-5.59-1.494-7-1.576v-7.858zm16 7.858c-1.41.082-4 .401-7 1.576v-7.742c2.619-1.212 5.515-1.581 7-1.692v7.858z" fill="currentColor"/><circle cx="12" cy="5" r="3" fill="currentColor"/></svg> ';

            div.appendChild(buttonAnchor)

            Array.from(document.querySelectorAll('.ItemOptions-itemOptions>.btn-toolbar'))
            .forEach(el => {
                el.appendChild(div.cloneNode(true))
            })
        },
        remove: () => {
            Array.from(document.querySelectorAll('.bookreader-button'))
            .forEach(el => {
                if (el && el.parentElement) {
                    el.parentElement.removeChild(el)
                }
            })
        }
    }

    document.addEventListener('cdm-item-page:ready', function(e) {
        const item = e.detail.itemId
        const collection = e.detail.collectionId
        getParent(item, collection).then(response => {
            if (response === false) { return; } else {
                bookreader_button.add(response, collection)
            }
        })
    })

    document.addEventListener('cdm-item-page:update', function(e) {
        const item = e.detail.itemId
        const collection = e.detail.collectionId
        getParent(item, collection).then(response => {
            if (response === false) {
                bookreader_button.remove()
                return
            } else {
                bookreader_button.remove()
                bookreader_button.add(response, collection)
            }
        })
    })

    document.addEventListener('cdm-item-page:leave', function(e) {
        bookreader_button.remove()
    })

    //Remove unnecessary html
    document.addEventListener('cdm-custom-page:enter', function(e) {
        if (e.detail.filename == 'BookReader') {
            if(document.getElementById('root')) {
                let root = document.getElementById('root')
                root.remove()
                let BRDiv = document.createElement('div')
                BRDiv.id = 'BookReader'
                document.body.appendChild(BRDiv)
            }
        }
    })

    document.addEventListener('cdm-custom-page:ready', function(e) {
        if (e.detail.filename == 'BookReader') {
            function filePath(file) {
                return path + file
            }
            const path = '/customizations/global/pages/BookReader/'
            const dependencies = [
                'jquery-ui-1-12-0-min.js',
                'jquery-colorbox-min.js',
                'jquery-browser-min.js',
                'dragscrollable-br.js',
                'jquery-bt-min.js'
                //Mobile menu & navigation is restricted under licensing https://mmenujs.com/
                // 'mmenu/dist/js/jquery-mmenu-min.js',
                // 'mmenu/dist/addons/navbars/jquery-mmenu-navbars-min.js',
                //Mobile Nav Plugin
                // 'plugins/plugin-mobile_nav.js'
            ]

            const preloadScripts = dependencies.map(filePath)
            loadScript('/customizations/global/pages/BookReader/jquery-1-10-1.js')
            .then(() => {
                preloadScripts.forEach(loadScript)
            }).then(() => {
                addCSS('bookreader', '/customizations/global/pages/BookReader/BookReader.css')
                // addCSS('mmenu', '/customizations/global/pages/BookReader/mmenu/dist/css/jquery-mmenu.css')
                // addCSS('mmenuNav', '/customizations/global/pages/BookReader/mmenu/dist/addons/navbars/jquery-mmenu-navbars.css')
                placeBRMetaTags()
            }).then(() => {
                loadScript('/customizations/global/pages/BookReader/BookReader.js')
                .then(() => {
                    //Force it to start in two-page reader mode
                    instantiateBookReader('#BookReader', {defaults: 'mode/2up'})
                })
            }).catch(error => {
                console.log('Error loading BookReader scripts' + error)
            })
        }
    })
}
runFunction();

/* version history

1.1 - 2020 Oct 22 - added semicolon after final function to support combining with other recipes
1.0 - 2020 Oct - initial implementation

*/
(function() {
    'use strict';

    // helper function to extract archival download link of current item
    function buildPDFDownloadLink(collection, item) {
      return fetch('/digital/api/collections/' + collection + '/items/' + item + '/false')
        .then(function(response) {
          // return API info about item as JSON
          return response.json();
        })
        .then(function(json) {
          // if print PDF exists get download URL
          console.log('has print pdf: ' + json.hasPrintPDF);

          if (json.hasPrintPDF == true) {
            let printLink = json.downloadParentUri;
            console.log('parent uri: ' + json.downloadParentUri);
            return printLink;
          } else {
            let printLink = false;
            return printLink;
          }
        })
        .catch(function(error) {
          console.log('No print PDF link found: ' + error);
        })
    }

    let downloadPDFButton = {
      insert: function(printLink) {
        let button = document.createElement('div');
        button.className = 'btn-group btn-group-default print-pdf-button';

        let buttonAnchor = document.createElement('a');
        buttonAnchor.title = "Download Full PDF";
        buttonAnchor.href = printLink;
        buttonAnchor.className = 'cdm-btn btn btn-primary';
        buttonAnchor.target = '_self';

        let buttonIcon = document.createElement('span');
        buttonIcon.className = 'fa fa-file-pdf-o fa-2x';

        buttonAnchor.appendChild(buttonIcon);
        button.appendChild(buttonAnchor);

        Array.from(document.querySelectorAll('.ItemOptions-itemOptions>.btn-toolbar'))
          .forEach(el => {
//            el.appendChild(button.cloneNode(true)); // insert button far right
            el.prepend(button.cloneNode(true)); // insert button far left
          });
      },
      remove: function() {
        Array.from(document.querySelectorAll('.print-pdf-button'))
          .forEach(el => {
            if (el && el.parentElement) {
              el.parentElement.removeChild(el);
            }
          });
      }
    }

    // locates download link and replaces the target URL
    function removeExistingPDFDownload() {
      Array.from(document.querySelectorAll('li > a[data-metrics-event-label*="download:All"]'))
        .forEach(el => {
          if (el && el.parentNode) {
            el.parentNode.remove();
          }
        });
    }

  //helper function to sequence fetch promises
  function insertPrintPDFDownload(collection, item) {
    buildPDFDownloadLink(collection, item)
      .then(function(response) {
        if (response) {
          downloadPDFButton.insert(response);
          removeExistingPDFDownload();
        }
      });
  }

  let globalScope = true; // set to true for global scripts or false for collection-constrained scripts
  let collectionScope = [ // list all collection aliases that should trigger this script
  ];


  document.addEventListener('cdm-item-page:ready', function(e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      insertPrintPDFDownload(collection, e.detail.itemId);
    }
  });

  document.addEventListener('cdm-item-page:update', function(e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      downloadPDFButton.remove();
      insertPrintPDFDownload(collection, e.detail.itemId);
    }
  });

  document.addEventListener('cdm-item-page:leave', function(e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      downloadPDFButton.remove();
    }
  });

})();

/* version history

1.0 - 2019 July - initial implementation

*/
