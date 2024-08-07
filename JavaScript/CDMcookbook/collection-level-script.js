(function() {
  'use strict';

  // set to true for global scripts or false for collection-constrained scripts
  let globalScope = false;

  // list all collection aliases that should trigger this script
  let collectionScope = [
    'oclcsample',
    'otheralias1',
    'otheralias2'
  ];

  // execute functions when item page DOM has loaded
  document.addEventListener('cdm-item-page:ready', function(e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      let message1 = 'hello, world!';
      let message2 = 'this collection is ' + collection;
      let message3 = 'this is the "ready" event'
      console.log(message1, message2, message3);
    }
  });

  // execute functions if item page updates (e.g. next result)
  document.addEventListener('cdm-item-page:update', function(e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      let message1 = 'hello, world!';
      let message2 = 'this collection is ' + collection;
      let message3 = 'this is the "update" event'
      console.log(message1, message2, message3);
    }
  });

  // executes when user leaves the item page to clean up DOM changes
  document.addEventListener('cdm-item-page:leave', function(e) {
    let collection = e.detail.collectionId;
    if (globalScope || collectionScope.includes(collection)) {
      let message1 = 'hello, world!';
      let message2 = 'this collection is ' + collection;
      let message3 = 'this is the "leave" event'
      console.log(message1, message2, message3);
    }
  });

})();

/* version history

1.1 - 2019 Aug 14 - add global/collection toggle; add event class messages
1.0 - 2018 October - initial implementation

*/
