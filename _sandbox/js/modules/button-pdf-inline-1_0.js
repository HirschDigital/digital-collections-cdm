export { pdf_button };
function pdf_button () {
    'use strict';

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
            let inlineLink = `/digital/api/collection/${collection}/id/${item} /page/0/inline/${collection}_${item}_0`;
              return inlineLink;
          } else {
            let inlineLink = false;
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
        buttonAnchor.title = "View Full PDF";
        buttonAnchor.href = printLink;
        buttonAnchor.className = 'cdm-btn btn btn-primary';
        buttonAnchor.target = '_self';

        let buttonIcon = document.createElement('span');
        buttonIcon.className = 'fa fa-file-pdf-o fa-2x';

        buttonAnchor.appendChild(buttonIcon);
        button.appendChild(buttonAnchor);

        Array.from(document.querySelectorAll('.ItemOptions-itemOptions>.btn-toolbar'))
          .forEach(el => {
            el.appendChild(button.cloneNode(true)); // insert button far right
//            el.prepend(button.cloneNode(true)); // insert button far left
          });
      }
    }

  //helper function to sequence fetch promises
  function insertPDFDownload(collection, item) {
    // clean up any existing PDF Download buttons
    Array.from(document.querySelectorAll('.print-pdf-button'))
    .forEach(el => {
      if (el && el.parentElement) {
        el.parentElement.removeChild(el);
      }
    });

    // insert new button if a PDF exists for the item
    buildPDFDownloadLink(collection, item)
      .then(function(response) {
        if (response) {
          downloadPDFButton.insert(response);
          // remove stock PDF download link
          Array.from(document.querySelectorAll('li > a[data-metrics-event-label*="download:All"]'))
          .forEach(el => {
            if (el && el.parentNode) {
              el.parentNode.remove();
            }
          });
          }
      });
  }

  let globalScope = true;
  let collectionScope = [
      'oclcsample'
  ];

  ['cdm-item-page:ready','cdm-item-page:update'].forEach(function(e){
      document.addEventListener(e, function(e){
        let item = e.detail.itemId;
        let collection = e.detail.collectionId;
        if (globalScope || collectionScope.includes(collection)) {
          insertPDFDownload(e.detail.collectionId, e.detail.itemId);
        }
      })
  });

};

/* version history

1.0 - 2023 Jan 24 - first implementation; code contributed by Wayne State University Libraries

*/
