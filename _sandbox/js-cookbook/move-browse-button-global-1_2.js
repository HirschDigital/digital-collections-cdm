(function() {
  'use strict';

  let globalScope = true;
  let collectionScope = [
  ];

  ['cdm-collection-landing-page:ready','cdm-collection-landing-page:update'].forEach(function(e) {
    document.addEventListener(e, function(e){
      if (globalScope || collectionScope.includes(e.detail.collectionId)) {
        const pageContainer = document.getElementsByClassName('CollectionLanding-maincontentLanding')[0];
        const browseButton = document.getElementsByClassName('text-center')[0];
        const pageTitle = document.getElementsByClassName('CollectionLanding-aboutCollection')[0];

        pageContainer.insertBefore(browseButton,pageTitle.nextSibling);
      }
    });
  });

})();

/* version history

1.2 - 2020 Oct 20 - add :update event and correct syntax of collectionScope array
1.1 - 2019 August 9 - added global/collection toggle
1.0 - 2018 June - initial implementation

*/
