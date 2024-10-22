(function() {
  'use strict';
  //debug script to show all event triggers in dev console when navigating through CONTENTdm
  //this script needs to be in the main JS file to work reliably

  const pageClasses = [
  //array of every page class in the lifecycle
    'cdm-home-page','cdm-about-page',
    'cdm-login-page','cdm-notfound-page',
    'cdm-search-page','cdm-collection-search-page',
    'cdm-advanced-search-page','cdm-collection-landing-page',
    'cdm-item-page','cdm-custom-page',
    'cdm-saved-items-page','cdm-shared-items-page'
  ];

  const eventCategories = ['enter','ready','update','leave'];
  //the four event categories

  const allPageEvents = [];

  pageClasses.forEach(pageClass => {
  //combine every event category with every page class
    eventCategories.forEach(eventCat => {
      allPageEvents.push(pageClass + ':' + eventCat);
    })
  });


  const valueStyle = 'font-weight: bold; font-style: italic;';
  //custom styling to emphasize log messages in the console

  document.addEventListener('cdm-app:ready', function(e) {
  //cdm-app only has the :ready event so is handled separately
    console.log('event: %c cdm-app:ready', valueStyle);
  });

  allPageEvents.forEach(eventType => {
  //run through every event type
    document.addEventListener(eventType, function(e) {
    //attach listeners to the event for every event type
      if (e.detail.collectionId || e.detail.itemId || e.detail.filename) {
      //create log group if multiple event details exist
        console.groupCollapsed('event: %c' + eventType, valueStyle);
        if (e.detail.collectionId || e.detail.itemId) {
          console.log('alias: %c' + e.detail.collectionId, valueStyle);
          console.log('id: %c' + e.detail.itemId, valueStyle);
        }
        if (e.detail.filename) {
          console.log('page name: %c' + e.detail.filename, valueStyle);
        }
        console.groupEnd();
      } else {
      //only a single event detail; og without group
        console.log('event: %c' + eventType, valueStyle);
      }
    });
  });

})();

/*

1_5 - 2021 Sep 17 - corrected list of page event classes (removed cdm-collection-page)
1_4 - 2020 Sep 18 - enhanced display of log messages and added more comments
1_3 - 2020 Sep 03 - cleaned up code and added comments
1_2 - 2020 Aug 03 - looped array methods made more consistent
1_1 - 2020 Aug - fixed saved-items typo
1_0 - 2020 Aug - initial implementation

*/
