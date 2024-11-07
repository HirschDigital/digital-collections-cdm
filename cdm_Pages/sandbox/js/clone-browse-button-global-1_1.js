(function() {
  'use strict';

  let globalScope = true;
  // set to true to run this recipe for the entire site
  let collectionScope = [
    ''
  ];
  // list the collection aliases to which the recipe should apply

  ['cdm-collection-landing-page:ready','cdm-collection-landing-page:update'].forEach(function(e) {
    document.addEventListener(e, function(e){
      if (globalScope || collectionScope.includes(e.detail.collectionId)) {
        const previousDiv = document.getElementsByClassName('grayDividerLine')[0];
        const clonedBrowseButton = document.getElementsByClassName('CollectionLanding-landingBrowseButton')[0].parentNode.cloneNode(true);
        previousDiv.insertAdjacentElement('afterend',clonedBrowseButton);
      }
    });
  });

})();

/* version history

1_1 - 2020 Oct 19 - improved event timings and refactored node processing
1.0 - 2020 Sep 09 - initial implementation

*/
