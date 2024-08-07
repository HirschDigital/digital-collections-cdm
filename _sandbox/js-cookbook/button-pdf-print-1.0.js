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
