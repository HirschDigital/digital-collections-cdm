(function() {
  'use strict';

  // detects when the digital object is .html (e.g. converted EAD) and
  // displays it in an iframe instead of as a clickable download link

  function embedHtml() {
    const htmlLink = document.querySelector('[class*="itemFileLink"]>a');
    const wrapper = document.createElement('div');
    // if .html exists, create iframe containing .html
    if (htmlLink && htmlLink.href) {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '500px';
      iframe.scrolling = 'auto';
      iframe.frameBorder = '0';

      wrapper.style.width = '100%';
      wrapper.appendChild(iframe);

      // CONTENTdm includes polyfill for fetch() to support IE
      fetch(htmlLink.href).then(function(response) {
        return response.text();
      }).then(function(html) {
        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
      });
    }

    // find parent container to add the new iframe
    const container = document.querySelector('[class*="itemFile"]');
    if (container && container.parentElement) {
      container.parentElement.insertBefore(wrapper, container);
      hideFileLink(true);
    }

    // function for disposing of the iframe
    return function() {
      wrapper.parentElement && wrapper.parentElement.removeChild(wrapper);
      hideFileLink(false);
    };
  }

  // add full HTML option to Download button if one exists
  function fullHtmlDownload(item,collection) {
    // make GetParent API call and return as JSON
    return fetch('/digital/bl/dmwebservices/index.php?q=GetParent/' + collection + '/' + item + '/json')
    .then(function(response) {return response.json();})
    .then(function(json) {
      let parent = false;
      // parse JSON for 'parent' value; -1 indicates parent ID is the same as item ID
      if (json.parent === -1) {
        parent = item;
      } else {
        parent = json.parent;
      }
      return parent;})
    .then(function(parent) {
    // once parent is known, check if the record is an EAD Finding Aid
      return fetch('/digital/bl/dmwebservices/index.php?q=dmGetCompoundObjectInfo/' + collection + '/' + parent + '/json')
      .then(function(response) {return response.json();})
      .then(function(json) {
        if (json.type === 'Document-EAD') {
          const linkToHTML = '/utils/findingaidfull/collection/' + collection + '/id/' + parent;
          const dlLinkMobile = document.querySelector('#downloadsizemenu-side-bar>li>a');
          const dlLinkDesktop = document.querySelector('#downloadsizemenu-top-bar>li>a');
          dlLinkMobile.href = linkToHTML;
          dlLinkDesktop.href = linkToHTML;
          dlLinkMobile.innerHTML = 'Download full HTML';
          dlLinkDesktop.innerHTML = 'Download full HTML';
          dlLinkDesktop.target = '_blank';
          dlLinkMobile.target = '_blank';
        } else {
          parent = false;
          return parent;
        }
      })
    })
    .catch(function(error) {
      parent = false;
      console.log('Request failed: ' + error);
      return parent;
    })
  }

  // helper function to remove/restore default HTML file hyperlink
  function hideFileLink(state) {
    const fileLinkContainers = document.querySelectorAll('.ItemFile-itemFile');
    for (let i = 0; i < fileLinkContainers.length; ++i) {
      if (state) {
        fileLinkContainers[i].style.display = 'none';
      } else {
        fileLinkContainers[i].style.display = 'flex';
      }
    }
  }

  let dispose;

  let globalScope = true; // set to true for global scripts or false for collection-constrained scripts
  let collectionScope = [ // list all collection aliases that should trigger this script
    ''
  ];

  // execute functions when item page DOM has loaded
  document.addEventListener('cdm-item-page:ready', function(e) {
    if (globalScope || collectionScope.includes(e.detail.collectionId)) {
      dispose = embedHtml();
      fullHtmlDownload(e.detail.itemId, e.detail.collectionId);
    }
  });

  // execute again if user navigates to next item
  document.addEventListener('cdm-item-page:update', function(e) {
    if (globalScope || collectionScope.includes(e.detail.collectionId)) {
      dispose && dispose();
      dispose = embedHtml();
      fullHtmlDownload(e.detail.itemId, e.detail.collectionId);
    }
  });

  // executes when user leaves the item page to clean up DOM changes
  document.addEventListener('cdm-item-page:leave', function(e) {
    if (globalScope || collectionScope.includes(e.detail.collectionId)) {
      dispose && dispose();
    }
  });

})();

/* version history

1.2 - 2020 Oct 7 - improve how Finding Aid records are identified
1.1 - 2019 June - updated with global vs. collection toggle options
1.0 - 2018 October - initial implementation

*/
