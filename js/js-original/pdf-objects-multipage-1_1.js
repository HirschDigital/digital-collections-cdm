(function() {
  'use strict';

  function getFullPDFLink(collection, item) {
    /**
     * Get the full PDF URL if there is one.
     * @param  {string} collection Alias of current collection.
     * @param  {string} item ID # of current item.
     * @return {object}         url: full PDF URL; page: current PDF page
     */

    return fetch('/digital/api/collections/' + collection + '/items/' + item + '/false')
    .then(function(response) {
      // return API info about item as JSON
      return response.json();
    })
    .then(function(json) {
      let detailsFullPDF = {};
      console.log('has full pdf: ' + json.hasPrintPDF);
      if (json.hasPrintPDF == true) {
      // if full PDF exists, get the URL
        detailsFullPDF.url = json.downloadParentUri;
        if (item === json.parentId) {
          //the current item is the parent item
          detailsFullPDF.page = 0;
        } else {
          const itemNumber = Number(item);
          //convert string to number for downstream equivalence
          let pagePosition = json.parent.children.map(el => el.id).indexOf(itemNumber);
          pagePosition++;
          //add one to align value to pdf.js #page= parameter
          detailsFullPDF.page = pagePosition;
        }
        return detailsFullPDF;
        //return is an object
      } else {
        return false;
      }
    })
    .catch(function(error) {
      console.log('No full PDF link found: ' + error);
    })
  }

  function lightboxCleanup() {
    let lightbox = document.getElementById('full-pdf-viewer');
    lightbox.parentNode.removeChild(lightbox);
  }

  function buildLightbox(link,page) {
    /**
     * Get the full PDF URL if there is one.
     * @param  {string} link The URL of the full PDF.
     * @param  {string} page The specific page of the PDF currently viewed.
     */

    const previousLightbox = document.getElementById('full-pdf-viewer');
    if (previousLightbox) {
      //cleanup any previous instances of lightbox
      previousLightbox.parentNode.removeChild(previousLightbox);
    }
    const newLightbox = document.createElement('div');
      newLightbox.className = 'Lightbox-lightbox';
      newLightbox.id = 'full-pdf-viewer';
    const itemContainer = document.createElement('div');
      itemContainer.id = 'full-pdf-container';
      itemContainer.className = 'ItemModalViewer-container';
    const pdfContainer = document.createElement('div');
      pdfContainer.className = 'PDFViewer-pdfFrame';
    const iframePDF = document.createElement('iframe');
      let fullPDFLink = link;
      let currentPage = Number(page);
      if (currentPage === 0) {
      //if parent is being viewed, render page 1 in pdf.js
        fullPDFLink += '#page=1';
      } else if (currentPage > 0) {
        fullPDFLink += '#page=' + page;
      }
      iframePDF.src = '/digital/pdf.js/web/viewer.html?file=' + fullPDFLink;
    const closeButtonContainer = document.createElement('div');
      closeButtonContainer.className = 'btn-group';
    const closeButton = document.createElement('button');
    const closeIcon = document.createElement('i');
      closeIcon.classList.add('fa','fa-times-circle');
    closeButton.appendChild(closeIcon);
    closeButton.addEventListener('click', function(){lightboxCleanup();});
    closeButtonContainer.appendChild(closeButton);

    pdfContainer.appendChild(iframePDF);
    itemContainer.appendChild(pdfContainer);
    itemContainer.appendChild(closeButtonContainer);
    newLightbox.appendChild(itemContainer);

    document.querySelector('[data-id="itemViewPageFound"]').prepend(newLightbox);
  }

  function changeButtonBehavior(detailsPDF)  {
    let button = document.querySelector('button.ItemPDF-expandButton');
    button.addEventListener('click', function(e){
      e.stopPropagation();
      buildLightbox(detailsPDF.url,detailsPDF.page);
    });
  }

  function replaceLightbox(collection, item) {
  //helper function to sequence fetch promises
    getFullPDFLink(collection, item)
    .then(function(response) {
      if (response) {
        changeButtonBehavior(response);
      }
    });
  }

  let globalScope = true;
  let collectionScope = [
    ''
  ];

  document.addEventListener('cdm-item-page:ready', function(e) {
    const collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      replaceLightbox(collection, e.detail.itemId);
    }
  });

  document.addEventListener('cdm-item-page:update', function(e) {
    const collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      replaceLightbox(collection, e.detail.itemId);
    }
  });

  document.addEventListener('cdm-item-page:leave', function(e) {
    const collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      //nothing to clean up at page exit
    }
  });

})();

/* version history

1.1 - 2020 Sep 29 - a few bug fixes; added code comments
1.0 - 2020 Sep 28 - initial implementation

*/
